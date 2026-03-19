<div align="center">

# Lancer

### A modern freelancing platform built with React + Vite + Supabase

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com)
[![License](https://img.shields.io/badge/License-MIT-a78bfa?style=flat-square)](LICENSE)

<br/>

A full-featured freelancing marketplace where **clients** discover and hire skilled freelancers,  
and **service providers** list, manage, and grow their offerings — all in one place.

<br/>

[Features](#-features) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [Project Structure](#-project-structure) · [Routes](#-routes) · [Contributing](#-contributing)

---

</div>

<br/>

##  Features

| | Feature | Description |
|---|---|---|
| 🔐 | **Authentication** | Register, login, email activation, forgot & reset password via Supabase Auth |
| 🛍️ | **Service Listings** | Browse, search, filter and paginate services across categories |
| 📦 | **Order Management** | Place and track orders for any listed service |
| 💳 | **Payments** | Integrated payment flow with success confirmation |
| ⭐ | **Reviews** | Clients leave verified reviews visible across the platform |
| 🔔 | **Notifications** | Real-time notification list with hover previews and pagination |
| 👤 | **User Profile** | Manage personal account info and settings |
| 🛠️ | **Service Management** | Add and update services via a multi-step form with image uploads |
| 📊 | **Dashboard** | Activity overview for service providers |
| 🗂️ | **Categories** | Create and update service categories |

<br/>

##  Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18 |
| **Build Tool** | Vite |
| **Backend & Database** | Supabase — Auth, Database, Storage |
| **Routing** | React Router v6 |
| **State Management** | React Context API + Custom Hooks |
| **HTTP Client** | Axios |
| **Styling** | CSS (`App.css`, `index.css`) |
| **Deployment** | Vercel |

<br/>

##  Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** or yarn
- A [Supabase](https://supabase.com) project set up

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-username/lancer.git
cd lancer
```

**2. Install dependencies**

```bash
npm install
```

**3. Set up environment variables**

```bash
cp .env.example .env
```

Then fill in your values — see [Environment Variables](#-environment-variables) below.

**4. Start the development server**

```bash
npm run dev
```

The app will be live at `http://localhost:5173` 🎉

<br/>

##  Environment Variables

Create a `.env` file in the project root with the following keys:

```env
# Your backend REST API base URL
VITE_API_BASE_URL=https://your-api.example.com

# Supabase — find these under Settings → API in your Supabase dashboard
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> [!WARNING]
> Never commit your `.env` file. It is already included in `.gitignore`.

<br/>

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server with HMR |
| `npm run build` | Bundle the app for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the codebase |

<br/>

## Project Structure

```
lancer/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/                    # Fonts, images, videos, SVGs
│   │
│   ├── components/
│   │   ├── alerts/                # ErrorAlert, SuccessAlert
│   │   ├── categories/            # CategoryCard
│   │   ├── common/                # LoadingSpinner
│   │   ├── dashboard/
│   │   ├── home/                  # Hero, Milestones, MoneyBack,
│   │   │                          # PopularServices, ReviewCardHome
│   │   ├── infoPage/              # InfoItem
│   │   ├── notification/          # HoverNotificationList,
│   │   │                          # NotificationList, Pagination
│   │   ├── order/                 # OrderCard, OrderItem
│   │   ├── registration/          # ActivationAccount, ForgotPassword,
│   │   │                          # ForgotPasswordConfirm, ResendActivation
│   │   ├── reviews/
│   │   └── servicesComponents/
│   │       ├── addService/        # ServiceForm, ServiceImages
│   │       ├── serviceDetails/
│   │       ├── updateService/
│   │       │   └── formParts/     # CategoryPart, DescriptionPart,
│   │       │                      # NamePart, PricePart, TimePart, TitlePart
│   │       ├── FilteringSection.jsx
│   │       ├── Filters.jsx
│   │       ├── MyServiceCard.jsx
│   │       ├── MyServiceList.jsx
│   │       ├── ServiceCard.jsx
│   │       ├── ServiceList.jsx
│   │       └── ServicePagination.jsx
│   │
│   ├── context/                   # AuthContext, CategoriesContext,
│   │                              # NotificationContext, OrderContext,
│   │                              # OtherInfoContext, ServiceContext
│   │
│   ├── hooks/                     # useAuth, useAuthContext,
│   │                              # useCategories, useNotification,
│   │                              # useOrder, useService…
│   │
│   ├── layouts/                   # DashboardLayout, Footer,
│   │                              # MainLayout, Navbar
│   │
│   ├── pages/                     # About, AddCategory, AddServices,
│   │                              # Categories, Dashboard, Home,
│   │                              # Login, MyServices, Notifications,
│   │                              # Orders, Profile, Register,
│   │                              # ServiceDetail, Services…
│   │
│   ├── routes/                    # AppRoutes, PrivateRoute
│   ├── services/                  # api-client.js, auth-api-client.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
│
├── .env                           # Local env vars (not committed)
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── vercel.json
└── vite.config.js
```

<br/>

## Routes

| Path | Page | Access |
|---|---|:---:|
| `/` | Home | 🌐 Public |
| `/about` | About | 🌐 Public |
| `/services` | Services | 🌐 Public |
| `/services/:id` | Service Detail | 🌐 Public |
| `/categories` | Categories | 🌐 Public |
| `/contact` | Contact Us | 🌐 Public |
| `/info` | Info Page | 🌐 Public |
| `/login` | Login | 🌐 Public |
| `/register` | Register | 🌐 Public |
| `/dashboard` | Dashboard | 🔒 Private |
| `/profile` | Profile | 🔒 Private |
| `/my-services` | My Services | 🔒 Private |
| `/add-service` | Add Service | 🔒 Private |
| `/update-service/:id` | Update Service | 🔒 Private |
| `/orders` | Orders | 🔒 Private |
| `/notifications` | Notifications | 🔒 Private |
| `/payment-success` | Payment Success | 🔒 Private |
| `/add-category` | Add Category | 🔒 Private |
| `/update-category/:id` | Update Category | 🔒 Private |

> 🔒 Private routes are protected by `PrivateRoute` and require an authenticated session.

<br/>

##  Contributing

Contributions, issues, and feature requests are welcome!

```bash
# 1. Fork the repo and clone it
git clone https://github.com/your-username/lancer.git

# 2. Create your feature branch
git checkout -b feature/your-feature-name

# 3. Commit your changes (follow conventional commits)
git commit -m "feat: add your feature"

# 4. Push and open a Pull Request
git push origin feature/your-feature-name
```

Please make sure your code passes linting before submitting a PR:

```bash
npm run lint
```

## Author

**Md. Redwan Islam Siam**
Backend Developer — Django & Django REST Framework

[![GitHub](https://img.shields.io/badge/GitHub-mdredwanislamsiam-181717?style=flat&logo=github)](https://github.com/mdredwanislamsiam)


## License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.
