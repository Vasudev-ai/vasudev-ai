# ARENA.VASUDEVAI.IN - Build Specification (Technical)

> Ye file developer / AI coder ke liye hai. Isko padh ke seedha `pnpm create next-app` se arena banana shuru kar sakte ho.

---

## 1. Tech Stack (Lock)

```
Framework: Next.js 15 App Router (same as vasudev-ai)
Auth: Firebase Auth (Google + GitHub + Discord via OAuth) - reuse same Firebase project as vasudev-ai.in
DB: Firestore
Storage: Firebase Storage (for showcase images)
Hosting: Vercel (subdomain arena.vasudevai.in) + Firebase Hosting backup
Styling: Tailwind CSS + tailwindcss-animate + shadcn/ui (copy src/components/ui/*)
Animation: framer-motion ^11.2.12
Icons: lucide-react + react-icons
Image Opt: next/image with sharp (webp/avif already configured in next.config.ts:17)
State: Zustand or React Context (no Redux)
```

Reuse from current repo:
- `src/components/ui/button.tsx`, `card.tsx`, `badge.tsx`, `avatar.tsx` etc
- `tailwind.config.ts` theme, colors, fonts (Inter + Cinzel_Decorative)
- `src/hooks/use-toast.ts`

---

## 2. Information Architecture / Routes

```
arena.vasudevai.in/

/                           -> Landing (if not logged) / Dashboard (if logged) - middleware redirect
/login                      -> Discord + GitHub buttons only
/onboarding                 -> 4 step wizard (profile, github link, discord join, first quest)
/app                        -> Dashboard (protected)
/app/quests                 -> All quests (Daily, Weekly, Bounties) with tabs
/app/quests/[id]            -> Quest detail + submit
/app/bounties               -> Filtered bounties (alias to quests?type=bounty)
/app/leaderboard            -> Global + Weekly + Monthly tabs
/app/showcase               -> Project showcase (P1)
/app/showcase/new           -> Submit project
/u/[username]               -> Public profile
/settings                   -> Edit profile, linked accounts
/api/webhooks/github        -> GitHub webhook for PR merged -> auto XP
```

**Middleware:** `src/middleware.ts` - if no session cookie, redirect `/app/*` -> `/login` except `/u/*`.

---

## 3. Firestore Schema

### `users/{uid}`
```ts
{
  uid: string
  username: string // unique, from github handle or chosen, used for /u/[username]
  displayName: string
  photoURL: string // from GitHub/Discord, stored as webp 640w
  bio: string
  college?: string
  githubHandle?: string
  discordId?: string
  // gamification
  xp: number // 0
  level: number // 1
  streak: number // 0
  longestStreak: number
  lastLoginAt: Timestamp // for streak calc
  streakFreeze: number // items
  badges: string[] // ["first_pr", "streak_7"]
  questsCompleted: string[] // questIds
  bountiesCompleted: number
  showcaseUpvotes: number
  createdAt: Timestamp
}
```

### `quests/{questId}`
```ts
{
  id: string
  title: string // "Fix header overflow on mobile"
  description: string // markdown
  type: "daily" | "weekly" | "bounty"
  difficulty: "easy" | "medium" | "hard" // bounty only
  xp: number // 50 | 300 | 500-1500
  // bounty specific
  githubIssueUrl?: string // https://github.com/Vasudev-ai/...
  repo?: string
  labels?: string[]
  // lifecycle
  status: "open" | "closed" | "expired"
  createdBy: "system" | uid
  startsAt: Timestamp
  endsAt: Timestamp // daily = next midnight IST
  submissionsCount: number
}
```

### `submissions/{submissionId}`
```ts
{
  id: string
  questId: string
  userId: string
  username: string // denormalized for fast leaderboard
  photoURL: string
  type: "link" | "pr" // daily = link, bounty = PR url
  url: string // PR or deployed link
  note?: string
  status: "pending" | "approved" | "rejected"
  reviewedBy?: string // admin uid
  xpAwarded?: number
  createdAt: Timestamp
}
```

### `leaderboard` - No collection, computed query:
```js
query(users, orderBy("xp", "desc"), limit(100))
query(users, where("lastLoginAt", ">", weekAgo), orderBy("xp", "desc"))
```
Cache in memory / ISR 60s. Don't create separate collection MVP me.

---

## 4. Core Logic Snippets

### Streak Calc (on login)
```ts
// lib/streak.ts
export function updateStreak(user: User) {
  const today = startOfDay(new Date())
  const last = startOfDay(user.lastLoginAt.toDate())
  const diff = differenceInDays(today, last)
  if (diff === 0) return user.streak // already logged today
  if (diff === 1) return user.streak + 1
  if (user.streakFreeze > 0) return user.streak // consume freeze
  return 1 // reset but keep 1
}
```

### XP -> Level
```ts
// lib/level.ts
export const LEVELS = [0, 500, 2000, 5000, 10000, 20000]
export function getLevel(xp: number) {
  return LEVELS.filter(t => xp >= t).length // 1-indexed
}
```

### XP Grant (transaction)
```ts
// on submission approved
await runTransaction(db, async tx => {
  const u = await tx.get(userRef)
  const newXP = u.data().xp + quest.xp
  tx.update(userRef, {
    xp: newXP,
    level: getLevel(newXP),
    questsCompleted: arrayUnion(questId),
    badges: newBadges(newXP, streak) // helper
  })
})
```

---

## 5. UI Components to Build (Reuse shadcn)

- `XpBar` - progress to next level, animated `framer-motion` width
- `StreakCalendar` - 30 day grid, GitHub heatmap style, uses `date-fns`
- `QuestCard` - title, xp pill `bg-accent/10 border-accent/20`, difficulty dot, CTA
- `BountyCard` - extends QuestCard + GitHub issue link + labels
- `LeaderboardRow` - rank, avatar `next/image` 32x32 webp, xp, level badge
- `BadgeGrid` - locked/unlocked states, grayscale vs glow
- `SubmitDialog` - input URL + note, calls `createSubmission`

Copy styles from `src/app/community/page.tsx:323` teaser card - same border `border-white/[0.06] bg-card/40 backdrop-blur-xl`.

---

## 6. Auth Flow

Use Firebase Auth same project as `vasudev-ai.in`:
- Enable GitHub + Discord providers in Firebase Console
- Create `src/lib/firebase.ts` same as current repo
- After login, check `users/{uid}` exists else create with `xp:0, level:1`
- Username collision check: `where("username", "==", handle)` - if exists append random suffix
- Set cookie `__session` for middleware (firebase session cookie)

Cross-subdomain SSO: Firebase Auth persistence `local` works if same Firebase project. No extra work. Just ensure `authDomain` is same.

---

## 7. Admin Panel (Simple)

No separate admin app. Create `isAdmin` field in user doc (manual set for Surya/Aman). If `isAdmin` true, show:
- `/app/admin/quests` - create daily/weekly, close, set xp
- `/app/admin/submissions` - list pending, approve/reject -> triggers XP transaction
- Use `src/components/ui/table.tsx` + `dialog.tsx`

---

## 8. GitHub Bounty Auto-Sync (P1 but design now)

- GitHub Action or Cron (Vercel Cron) every 1hr: fetch `GET /repos/Vasudev-ai/* /issues?labels=bounty&state=open`
- For each issue not in `quests` where `githubIssueUrl == issue.html_url`, create quest with `xp = 500/1000/1500` based on label `easy/medium/hard`
- Webhook `POST /api/webhooks/github` on `pull_request closed & merged` -> find `submissions` where `url == pr.html_url` -> auto approve

---

## 9. Build Phases (2 Week Sprints)

**Week 1 - MVP:**
- Day 1-2: Init repo, copy tailwind/ui, Firebase setup, Auth + Onboarding
- Day 3-4: Firestore schema, Dashboard (XpBar, Streak, Daily Quest), Quest list/detail
- Day 5-6: Submissions flow + Admin approve + XP grant + Leaderboard
- Day 7: Bounty board + Public profile `/u/[username]`

**Week 2 - Polish:**
- Streak freeze, badges, level up animation, notifications, GitHub sync
- Deploy to `arena.vasudevai.in`, connect subdomain, test SSO
- Seed 10 quests + 5 bounties for launch

---

## 10. Deployment

- Vercel project `vasudev-arena`, env `NEXT_PUBLIC_FIREBASE_*` same as community
- Domain: Vercel -> Add Domain `arena.vasudevai.in` -> CNAME to `cname.vercel-dns.com` (DNS in Hostinger/wherever vasudevai.in is)
- Also add to Firebase Auth authorized domains

---

## 11. File to Copy from Current Repo

```
Copy these to arena repo:
- tailwind.config.ts (full)
- src/components/ui/* (button, card, badge, avatar, dialog, etc)
- src/lib/utils.ts (cn)
- src/hooks/use-toast.ts
- public/team/*.webp, public/vasudev-ai-hero.webp (for avatars)
- src/app/globals.css
```

---

## 12. Prompt for AI in New Repo

> "You are building arena.vasudevai.in - gamified community arena for Vasudev AI. Read ARENA_CONTEXT.md and ARENA_BUILD_SPEC.md in root. Stack: Next.js 15 + Firebase + Tailwind + shadcn. Follow Firestore schema exactly. Start with auth + onboarding."

---

*End of Build Spec. Keep this file updated as you build.*
