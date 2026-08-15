# PermisGo Frontend

Next.js web application for the PermisGo driving-school platform. One application contains the public website plus separate student, teacher, and admin experiences.

> The repository directory is currently named `permisgo-fontend` (without the second `r`). Commands in this document use that existing name.

## Technology stack

- Next.js 16 App Router
- React 19
- Tailwind CSS 3 and Bootstrap 5
- Redux Toolkit and React Redux
- Axios for REST API access
- Socket.IO Client for real-time chat and presence
- Recharts for dashboard charts
- CKEditor 5 for rich content editing
- React Google Maps for locations
- Framer Motion, Swiper, React Icons, and Sonner

## Requirements

- Node.js 20 or later
- npm
- A running PermisGo backend

## Local setup

```bash
cd permisgo-fontend
npm install
copy .env.example .env
npm run dev
```

On macOS/Linux, replace the copy command with `cp .env.example .env`.

Open `http://localhost:3000`. For local development, set `NEXT_PUBLIC_API_URL=http://localhost:5000/api`; otherwise the Axios client falls back to the deployed backend.

## Environment variables

All browser-exposed variables use the `NEXT_PUBLIC_` prefix. Never put private keys or secrets in them.

| Variable | Purpose | Local example |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | Backend REST base URL, including `/api` | `http://localhost:5000/api` |
| `NEXT_PUBLIC_SOCKET_URL` | Backend Socket.IO origin | `http://localhost:5000` |
| `NEXT_PUBLIC_SITE_URL` | Canonical frontend URL for SEO | `http://localhost:3000` |
| `NEXT_PUBLIC_STUN_URL` | WebRTC STUN server | `stun:stun.l.google.com:19302` |
| `NEXT_PUBLIC_TURN_URL` | WebRTC TURN server URL | Optional |
| `NEXT_PUBLIC_TURN_USERNAME` | TURN username | Optional |
| `NEXT_PUBLIC_TURN_CREDENTIAL` | TURN credential | Optional; browser-visible |

## npm commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start Next.js in development mode |
| `npm run build` | Create the optimized production build |
| `npm start` | Serve an existing production build |

The dev and build scripts allocate up to 6 GB of Node.js heap because the application and rich-editor bundle are large.

## Application architecture

```text
Browser
  -> Next.js route/page
  -> shared component or feature UI
  -> src/features/API.js
  -> configured Axios instance
  -> PermisGo REST API

Browser
  -> PresenceConnection / RealtimeChat
  -> Socket.IO backend
```

`src/app/layout.jsx` is the root composition point. It loads global CSS, Redux, the role-aware `AppShell`, Tawk chat, toast notifications, and route-specific SEO metadata. `src/proxy.js` forwards the current pathname in a request header so the root layout can generate the correct metadata.

## Authentication and authorization

- Login/register pages call the backend through the centralized API module.
- The backend sets an HTTP-only cookie and also returns a token used by the current client flow.
- `axiosInstance.js` sends cookies and attaches the saved Bearer token when present.
- `userSlice.js` owns the current authentication/user state.
- `ProtectedRoute.jsx` and `PublicOnlyRoute.jsx` control client-visible access.
- `roleRoutes.js` and `authRedirects.js` keep role redirects consistent.
- Final authorization always remains the backend's responsibility.

## Route areas

### Public and authentication

- `(auth)`: login portals, student/teacher registration, verification, forgot/reset password
- `(pages)`: home-facing content such as about, services, offers, pricing, instructors, booking, blogs, FAQs, contact, legal and privacy pages

### Student portal

- Dashboard, profile, settings, documents, support, referrals, and offers
- Instructor discovery and lesson booking
- Driving planning, lessons, exam demand, e-learning video, rating, and booklet
- Code learning: quiz series, thematic series, crash/mock tests, challenge player, results, history, mistakes, road signs, ebooks, knowledge sheets, and live replays
- Chat and invoice/purchase views

### Teacher portal

- Dashboard, profile/account/settings
- Calendar, lessons, students, student booklet assessments, and exams
- Vehicles, locations, offers, earnings, withdrawal, documents, and chat

### Admin portal

- Dashboard, users, students, teachers, vehicles, appointments, bookings, lessons
- Quiz/road-sign/question/attempt/retake management
- Learning content, ebook course/topic/lesson management
- Blogs, FAQs, testimonials, offers, legal pages, settings, support, payments, invoices, and documents

## Project structure (A–Z)

```text
permisgo-fontend/
|-- .env.example                   # Safe public environment template
|-- public/
|   `-- image/                     # Static logos, banners, icons, and page imagery
|-- src/
|   |-- Apiutils/
|   |   `-- axiosInstance.js       # API base URL, credentials, Bearer interceptor
|   |-- app/                       # Next.js App Router
|   |   |-- (auth)/                # Authentication route group
|   |   |-- (pages)/               # Public website route group
|   |   |-- admin/                 # Admin portal routes
|   |   |   |-- code-ebooks/       # Ebook hierarchy/editor
|   |   |   |-- exam-questions/    # Exam-question CRUD
|   |   |   |-- learning-content/  # Learning-content CRUD
|   |   |   `-- quizzes/           # Quiz/question/attempt management
|   |   |-- student/               # Student portal routes
|   |   |   |-- academic-Info/     # Knowledge, road signs, live coding
|   |   |   |-- accounting/        # Invoices
|   |   |   |-- code/              # Code learning and quiz experience
|   |   |   |   |-- _components/   # Shared code-learning pages
|   |   |   |   |-- code-challenge/# Interactive timed quiz player
|   |   |   |   |-- code-ebook/    # Ebook courses and lessons
|   |   |   |   |-- results/       # Attempt results
|   |   |   |   `-- ...            # Series, tests, history, mistakes, resources
|   |   |   |-- driving-operation/ # Booking and driving journey
|   |   |   `-- profile/           # Student profile/booklet/purchases
|   |   |-- teacher/               # Teacher portal routes
|   |   |   |-- exams/             # Student exam records
|   |   |   |-- locations/         # Work-location management
|   |   |   |-- students/          # Student details and booklet
|   |   |   `-- vehicles/          # Teacher vehicles
|   |   |-- layout.jsx             # Global providers, shell, SEO, chat, toast
|   |   |-- not-found.jsx          # Global 404 page
|   |   `-- page.jsx               # Home page
|   |-- components/
|   |   |-- auth/                  # Guards and registration form
|   |   |-- blogs/                 # Blog editor
|   |   |-- chat/                  # Presence and real-time chat UI
|   |   |-- common/                # Reusable form/table/modal/loading primitives
|   |   |-- layout/                # App shell, topbar, and role sidebars
|   |   |-- lessons/               # Lesson-booking workspace
|   |   |-- maps/                  # Google Place autocomplete
|   |   |-- public/                # Reusable public guide page
|   |   |-- quiz/                  # Admin quiz/question forms
|   |   `-- referrals/             # Referral dashboard
|   |-- constants/
|   |   `-- bookletSkills.js       # Canonical driving-skill definitions
|   |-- features/
|   |   |-- API.js                 # Central REST API function catalogue
|   |   |-- userSlice.js           # Active Redux user state
|   |   |-- lessonHelpers.js       # Lesson UI/domain helpers
|   |   `-- *Slice.js              # Reserved/partially disabled domain slices
|   |-- hooks/                     # Language, offers, settings, debounce hooks
|   |-- lib/
|   |   `-- seo.js                 # Site and route metadata definitions
|   |-- provider/
|   |   `-- provider.js            # Redux provider
|   |-- utils/                     # Redirects, role routes, media URLs, toasts
|   |-- globals.css                # Global and Tailwind styles
|   |-- proxy.js                   # Pathname header forwarding for metadata
|   `-- store.js                   # Redux store configuration
|-- jsconfig.json                  # `@/*` -> `src/*` import alias
|-- next.config.mjs                # React compiler and image configuration
|-- postcss.config.js              # PostCSS configuration
|-- tailwind.config.js             # Tailwind content/theme configuration
|-- package.json                   # Dependencies and commands
`-- README.md                      # This guide
```

Dynamic folders such as `[id]`, `[userId]`, `[teacherId]`, `[courseId]`, and `[topicId]` are Next.js route parameters. Folders beginning with `_` contain colocated implementation components and do not create public routes. Generated/runtime directories such as `.next/` and `node_modules/` are intentionally omitted.

## Central API layer

`src/features/API.js` is the frontend's API catalogue. Keep endpoint calls there instead of creating ad-hoc Axios instances inside pages. It covers:

- Auth and profiles
- Admin dashboards and user management
- Students, teachers, vehicles, locations, and availability
- Offers, bookings, and lessons
- Documents, blogs, FAQs, testimonials, contact, and appointments
- Chat, reviews, and referrals
- Quizzes, questions, attempts, results, mistakes, retakes, and road signs
- Exams and learning/ebook content

`src/Apiutils/axiosInstance.js` controls the base URL, 20-second timeout, cookie credentials, and token header.

## Code challenge flow

The interactive player is `src/app/student/code/code-challenge/page.jsx`.

1. It reads `quizId` from the query string.
2. `startQuizAttempt` creates or resumes the attempt.
3. Returned resume state restores answered questions, selected answers, and remaining time.
4. The player supports single/multiple answers, dual prompts, images, video, fullscreen, and French text-to-speech.
5. `submitQuizAnswer` sends the selection and time spent to the backend.
6. Correct/wrong styling and explanation content come from the server response.
7. The timer or final question calls `finishQuizAttempt` and redirects to the results page.

Correct answers must never be embedded in frontend source or sent before validation.

## Styling and media

- Tailwind utility classes are the primary styling system.
- Bootstrap remains installed for existing components; avoid mixing both systems unnecessarily inside a new component.
- Local static media belongs in `public/image/` and is referenced from `/image/...`.
- Backend/Cloudinary media must pass through `mediaUrl`/`getMediaUrl` helpers so relative and absolute URLs behave consistently.
- Next.js image optimization is currently disabled in `next.config.mjs`.

## Adding a feature

1. Add or confirm the backend endpoint and response contract.
2. Add its client function to `src/features/API.js`.
3. Place the page in the correct role/public route tree.
4. Reuse components from `components/common` and the applicable domain folder.
5. Apply role protection and navigation entries where necessary.
6. Handle loading, empty, success, validation, and server-error states.
7. Test desktop and mobile layouts, especially fixed quiz/chat controls.
8. Run `npm run build` before handoff.

## Production checklist

- Set the production API, Socket.IO, and canonical site URLs.
- Ensure the backend CORS allow-list contains the exact frontend origin.
- Serve both applications over HTTPS so cross-site secure cookies work.
- Verify auth redirects independently for student, teacher, and admin accounts.
- Test image/video URLs, chat reconnection, WebRTC ICE configuration, and upload limits.
- Run `npm run build` and resolve every compile-time error.
- Keep secrets on the backend; every `NEXT_PUBLIC_*` value is visible to users.

## Naming and maintenance notes

- Preserve the existing `permisgo-fontend` directory name unless deployment and CI paths are updated together.
- Prefer the `@/` alias for imports from `src`.
- Remove obsolete commented implementations after confirming they are no longer needed; several files currently retain historical blocks.
- When a route, environment variable, or major module changes, update this README and `.env.example` in the same change.
