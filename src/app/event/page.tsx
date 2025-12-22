import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Event | Vasudev AI',
    description: 'Join our 30-Hour Learn Build Sprint!',
};

export default function EventPage() {
    return (
        <div className="flex-1 w-full h-full bg-background select-none">
            <iframe
                src="https://30-hour-learn-build-sprint.vercel.app/"
                className="w-full h-full border-none"
                style={{ width: '100%', height: 'calc(100vh - 64px)' }}
                title="30 Hour Learn Build Sprint"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
}
