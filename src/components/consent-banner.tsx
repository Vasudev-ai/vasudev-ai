'use client';

import { useEffect, useState, createContext, useContext, ReactNode } from 'react';

interface ConsentState {
  analytics_storage: 'granted' | 'denied';
  ad_storage: 'granted' | 'denied';
  ad_user_data: 'granted' | 'denied';
  ad_personalization: 'granted' | 'denied';
}

interface ConsentContextType {
  consent: ConsentState | null;
  isConsentReady: boolean;
}

const ConsentContext = createContext<ConsentContextType>({
  consent: null,
  isConsentReady: false,
});

export function useConsent() {
  return useContext(ConsentContext);
}

declare global {
  interface Window {
    dataLayer: unknown[];
    googlefc: {
      callbackQueue: Array<Record<string, () => void> | (() => void)>;
      showRevocationMessage: () => void;
      getGoogleConsentModeValues: () => {
        adStoragePurposeConsentStatus: number;
        adUserDataPurposeConsentStatus: number;
        adPersonalizationPurposeConsentStatus: number;
        analyticsStoragePurposeConsentStatus: number;
      };
      ConsentModePurposeStatusEnum: {
        UNKNOWN: number;
        GRANTED: number;
        DENIED: number;
        NOT_APPLICABLE: number;
        NOT_CONFIGURED: number;
      };
    };
    gtag: (...args: unknown[]) => void;
  }
}

function mapConsentModeValues(values: number): 'granted' | 'denied' {
  if (values === window.googlefc?.ConsentModePurposeStatusEnum?.GRANTED) {
    return 'granted';
  }
  return 'denied';
}

function loadGoogleTags() {
  if (document.getElementById('google-gtag-script')) return;

  const script = document.createElement('script');
  script.id = 'google-gtag-script';
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-ZEJHFDQ372';
  document.head.appendChild(script);

  script.onload = () => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', 'G-ZEJHFDQ372', { send_page_view: true });
  };

  if (!document.getElementById('google-adsense-script')) {
    const adScript = document.createElement('script');
    adScript.id = 'google-adsense-script';
    adScript.async = true;
    adScript.crossOrigin = 'anonymous';
    adScript.src =
      'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7714504173248093';
    document.head.appendChild(adScript);
  }
}

function updateGtagConsent(consent: ConsentState) {
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', consent);
  }
}

function saveConsentToStorage(consent: ConsentState) {
  try {
    localStorage.setItem('vasudev_consent', JSON.stringify(consent));
    localStorage.setItem('vasudev_consent_timestamp', Date.now().toString());
  } catch {
    // localStorage unavailable
  }
}

function getStoredConsent(): ConsentState | null {
  try {
    const stored = localStorage.getItem('vasudev_consent');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // parse error
  }
  return null;
}

export default function ConsentBanner({ children }: { children?: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [isConsentReady, setIsConsentReady] = useState(false);
  const [showLink, setShowLink] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored) {
      setConsent(stored);
      setIsConsentReady(true);
      updateGtagConsent(stored);
      loadGoogleTags();
      return;
    }

    window.googlefc = window.googlefc || ({} as typeof window.googlefc);
    window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];

    window.googlefc.callbackQueue.push({
      CONSENT_MODE_DATA_READY: () => {
        try {
          const modeValues = window.googlefc.getGoogleConsentModeValues();
          const newConsent: ConsentState = {
            analytics_storage: mapConsentModeValues(
              modeValues.analyticsStoragePurposeConsentStatus
            ),
            ad_storage: mapConsentModeValues(modeValues.adStoragePurposeConsentStatus),
            ad_user_data: mapConsentModeValues(
              modeValues.adUserDataPurposeConsentStatus
            ),
            ad_personalization: mapConsentModeValues(
              modeValues.adPersonalizationPurposeConsentStatus
            ),
          };

          setConsent(newConsent);
          setIsConsentReady(true);
          saveConsentToStorage(newConsent);
          updateGtagConsent(newConsent);
          loadGoogleTags();
        } catch {
          const fallback: ConsentState = {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
          };
          setConsent(fallback);
          setIsConsentReady(true);
        }
      },
    });

    window.googlefc.callbackQueue.push({
      CONSENT_API_READY: () => {
        setShowLink(true);
      },
    });
  }, []);

  return (
    <ConsentContext.Provider value={{ consent, isConsentReady }}>
      {children}
      {showLink && (
        <button
          onClick={() => {
            window.googlefc?.showRevocationMessage?.();
          }}
          className="fixed bottom-4 left-4 z-50 text-xs text-muted-foreground hover:text-primary transition-colors underline underline-offset-2"
          aria-label="Privacy and cookie settings"
        >
          Privacy &amp; cookie settings
        </button>
      )}
    </ConsentContext.Provider>
  );
}
