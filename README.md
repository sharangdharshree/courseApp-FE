# CourseWallah — Frontend

A full-featured online course marketplace built with React. Users can browse courses, enroll via Razorpay payments with coupon support, and access purchased course content.

> **Backend repo:** [courseWallahBE](https://github.com/sharangdharshree/courseApp-BE) — Node.js + Express + MongoDB

---

## Features

- **Authentication** — Register, login, logout with JWT stored in httpOnly cookies. Session persists across page refreshes via refresh token. Access tokens silently refresh on expiry — no manual re-login needed.
- **Course Catalog** — Browse all published courses with thumbnails, category, pricing, and syllabus preview.
- **Enrollment & Payments** — Razorpay checkout with coupon code support (fixed / percentage discounts). Handles free courses (₹0) too.
- **My Courses** — Dashboard of all purchased courses with direct access to course content.
- **Course Learning** — Section-based video player for enrolled courses.
- **My Account** — View account details.

---

## Tech Stack

| Layer                  | Library / Tool                                             |
| ---------------------- | ---------------------------------------------------------- |
| Framework              | React 19 + Vite 7                                          |
| Styling                | Tailwind CSS 4                                             |
| State management       | Redux Toolkit                                              |
| Server state / caching | TanStack React Query v5                                    |
| Routing                | React Router v7                                            |
| HTTP client            | Axios (with response interceptor for silent token refresh) |
| Forms                  | React Hook Form                                            |
| Notifications          | React Hot Toast                                            |
| Payments               | Razorpay Web SDK                                           |
| Rich text              | TinyMCE + html-react-parser + DOMPurify                    |

---

## Getting Started

### Prerequisites

- Node.js 18+
- Backend running locally (see [courseWallahBE](https://github.com/your-username/courseWallahBE))

### Installation

```bash
git clone <repo-url>
cd courseWallahFE
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:8080/api/v1
VITE_RAZORPAY_KEY_ID=your_razorpay_test_key
VITE_NODE_ENV=development
```

| Variable               | Description                            |
| ---------------------- | -------------------------------------- |
| `VITE_API_URL`         | Base URL of the backend API            |
| `VITE_RAZORPAY_KEY_ID` | Razorpay key ID (use test key for dev) |
| `VITE_NODE_ENV`        | `development` or `production`          |

### Run

```bash
npm run dev       # start dev server → http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview production build locally
npm run lint      # run ESLint
```

---

## Project Structure

```
src/
├── api/                   # Raw axios calls grouped by domain
│   ├── axiosInstance.js   # Axios instance + 401 interceptor (silent token refresh)
│   ├── user/
│   ├── admin/
│   ├── public.api.js
│   └── checkout.api.js
├── components/            # All UI components and page components
│   ├── header/
│   ├── footer/
│   ├── home/
│   ├── loader/
│   ├── Course.jsx         # Course detail + enrollment flow
│   ├── CourseLearn.jsx    # Enrolled course content viewer
│   ├── Courses.jsx        # Course catalog
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── MyCourses.jsx      # User's purchased courses
│   └── MyAccount.jsx      # User profile (read-only)
├── layouts/
│   └── AuthLayout.jsx     # Route guard — redirects based on auth state
├── redux/
│   ├── features/
│   │   ├── authSlice.js   # isAuthenticated, userData, authChecked
│   │   └── uiSlice.js
│   └── store/
├── services/              # Service layer wrapping API calls
├── utils/
│   ├── config.js          # Env var access
│   └── apiErrorHandler.js
└── main.jsx               # Router + providers setup
```

---

## Auth Flow

```
App mount
  → POST /user/refresh-token  (boot call — session restoration)
    → success: dispatch login(user) → show app
    → fail:    dispatch logout()    → show app (unauthenticated)

Mid-session (access token expires after 15 min)
  → Any API call → 401
  → Axios interceptor fires
    → POST /user/refresh-token silently
      → success: retry original request (user unaware)
      → fail:    dispatch logout() → redirect to /auth
```

---

## Todo

- [ ] Admin login and authentication
- [ ] Course creation and management (admin dashboard)

---

## Deployment

Deployed on **Vercel**. Pushes to `main` auto-deploy to production. Every PR gets a preview deployment URL automatically.

Set the same environment variables in Vercel → Project Settings → Environment Variables.

---
