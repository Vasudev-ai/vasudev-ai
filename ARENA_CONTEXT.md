# ARENA.VASUDEVAI.IN - Product Context & Vision

> Ye file naye `arena.vasudevai.in` project ke liye master context hai. Kisi bhi AI / Developer ko ye file de do - pura vision samajh jayega.

---

## 1. Brand Architecture

Vasudev AI ab 3 alag properties me split ho raha hai:

| Domain | Role | Vibe | Audience |
|---|---|---|---|
| `vasudevai.in` | **Corporate HQ** | Clean, Professional, Investor-ready | Colleges, Clients, Investors |
| `community.vasudevai.in` | **Culture / Showcase** | Storytelling, Vibe, Gallery | New joiners - kya hai samjhne ke liye |
| `arena.vasudevai.in` | **Gamified Arena (THIS PROJECT)** | Dark, Neon, Game-like, Addictive | Active builders - daily aane wale log |

**Tagline Arena ka:** `Build. Battle. Belong.`
**One-liner:** Arena is where Vasudev AI community actually *builds* - quests, bounties, XP, leaderboard. Not a website, a game.

---

## 2. Core Problem

Current community site (`community.vasudevai.in`) is a *showcase* - log dekh ke chale jaate hain. Wapas aane ka reason nahi hai.

Arena solves: **Retention + Contribution**. Har din login karne ka, kuch karne ka, aur dikhane ka reason.

---

## 3. Target User Personas

**A. The Explorer (18-20, Tier 2/3 College)** - Code aata hai thoda, guidance chahiye, fame chahiye. XP aur badges ke liye kuch bhi karega.
**B. The Builder (20-24, Already codes)** - Real projects/bounties chahiye resume ke liye. Leaderboard top pe aana hai.
**C. The Mentor (Core Team / Senior)** - Help karke XP/badges lena, community me izzat.

---

## 4. User Journey (The Game Loop)

```
vasudevai.in --"Join Community"--> community.vasudevai.in --"Enter Arena"--> arena.vasudevai.in

Arena pe:
Landing (non-logged) -> Discord/GitHub Login -> Onboarding Quest (4 steps) -> Dashboard
Dashboard pe har din:
  Daily Login (streak) -> Daily Quest -> Bounty/Weekly Challenge -> Submit -> XP -> Level Up -> Leaderboard
Loop repeats. Har 7 din streak pe bonus, har level pe naya badge unlock.
```

**Aha Moment:** Pehla quest complete karke 100 XP aur Leaderboard pe naam dekhna - 2 min me.

---

## 5. Gamification Design

### XP System
| Action | XP | Notes |
|---|---|---|
| Daily Login | 10 | Streak 7 days = 100 bonus |
| Profile Complete | 100 | One-time |
| Daily Quest | 50-100 | Resets 12 AM IST |
| Weekly Challenge Submit | 300 | Voted by community |
| Bounty Complete (GitHub PR merged) | 500-1500 | Based on difficulty |
| Help Someone (answer marked) | 50 | |
| Referral (friend joins + completes onboarding) | 200 | |
| Project Showcase Upvote Received | 20 per upvote | |

### Levels
```
L1 Explorer (0 XP) -> L2 Builder (500) -> L3 Warrior (2000) -> L4 Guardian (5000) -> L5 Sage (10000) -> L6 Architect (20000)
```
Har level pe: naya avatar frame, naya badge slot, arena me alag glow `hsl(var(--accent))` jaise.

### Badges (Profile pe dikhenge, `member-card.tsx` jaisa glow)
- `First Blood` - First PR merged
- `Streak 7 / 30 / 100`
- `Helping Hand` - 10 helps
- `Hackathon Winner`
- `Top 10 Leaderboard`
- `Learnivo Early Builder`

### Streaks
Calendar heatmap GitHub style. Break hua toh streak freeze item (weekly quest se milega).

---

## 6. Core Features (MVP)

**P0 - Must Have:**
1. **Auth:** Discord + GitHub OAuth (Firebase Auth `firebase: ^11.9.1` already in use). Single sign-on across subdomains.
2. **Dashboard:** XP bar, Level, Streak calendar, Daily Quest card, Active Bounties, Leaderboard top 5.
3. **Quests:** Daily / Weekly / Bounty list, accept -> submit link/PR -> review -> XP grant.
4. **Leaderboard:** All-time / Weekly / Monthly, filter by college/city later.
5. **Profile:** Public `arena.vasudevai.in/u/{username}` - avatar, level, badges, showcase, stats.
6. **Bounty Board:** Auto-fetch GitHub issues from `Vasudev-ai/*` repos with label `bounty`. Difficulty tag.

**P1 - Next:**
7. Project Showcase with voting (Product Hunt style)
8. Referral system
9. Notifications (in-app + Discord bot)
10. Certificate auto-generate on bounty complete (reuse `src/components/certificate.tsx:11`)

**Not in MVP:** Payments, DM, Video. Keep it simple.

---

## 7. Design Vibe

- **Theme:** Dark only. `#05070d` bg, `hsl(187 100% 50%)` cyan accent, `hsl(var(--primary))` glow. Same as current community site.
- **Inspiration:** Linear.app (clean) + Discord (dark) + GitHub Contributions (heatmap) + Duolingo (streak/XP addiction)
- **Mobile First:** 70% users mobile se aayenge. Bottom nav `src/components/bottom-nav.tsx`.
- **Animations:** `framer-motion` already used, keep subtle. Level-up confetti, XP +100 float animation.

---

## 8. Success Metrics

- D7 Retention > 20%
- Avg 3 logins/week per user
- 50+ bounty completions/month
- Leaderboard pe 100+ active users

---

## 9. What NOT to Build

- No corporate pages here. No About/Services. Only Game.
- No heavy 3D (perf). Keep HeroOrb type canvas only on landing, not dashboard.
- No custom backend if Firebase can do. Ship fast.

---

## 10. Handover Note for New Repo

Current repo: `E:\vasudev-ai` is Next.js 15 + Firebase + Genkit. Arena can be fresh `create-next-app` with same stack or copy `src/lib`, `src/components/ui` for speed. Reuse `tailwind.config.ts:18`, `next.config.ts` image optimization.

Share Firebase project: `vasudev-ai` so auth works cross-domain.

---

*End of Context File 1. See `ARENA_BUILD_SPEC.md` for technical spec.*
