# GigaCode Payment Hub ✨

> My personalized, centralized payment processing hub for digital products and services. Built on the Nodus Payment Hub template, enhanced with custom offerings, branding, and animations.

---

## ✅ Core Features Retained

- 🔐 **Secure Stripe Checkout:** Handles Cards, Apple Pay, Google Pay.
- ₿ **Crypto-Friendly:** Coinbase Commerce integration for BTC/ETH payments.
- 🧾 **Custom Quotes:** Built-in quote request form storing submissions in Firebase Firestore.
- 👤 **Admin Dashboard:** Manage site settings, social links, and view quote submissions (requires Firebase Auth).
- 🎨 **Configurable Offerings:** Digital products and services defined in `src/config/offerings.ts`.
- 📧 **Email Confirmations:** Optional integration with Resend for payment/quote confirmations.
- 🧱 **Component-Based:** Built with shadcn/ui, Tailwind CSS, and reusable components.
- 📱 **Responsive Design:** Mobile-first layout with drawer navigation.
- 🌗 **Dark/Light Mode:** Theme support via `next-themes`.
- 🔗 **Dynamic Footer Links:** Manageable through the admin panel.
- ☁️ **Deploy-Ready:** Optimized for Vercel (frontend) and Firebase (backend/DB).

## 🌟 Key Enhancements & Personalizations

- ✨ **Branded Experience:** Added GigaCode logo and custom branding elements.
- 🚀 **Enhanced Animations:** Implemented smooth, dramatic, bi-directional scroll reveals, glowing buttons, floating elements, and refined hover effects.
- 🛍️ **Custom Offerings:** Configured specific products (Nodus Templates, QuickToken, Tauri Boilerplate) and services (Starter Website, Custom Support Plans) with varied licensing and pricing.
- 💅 **Premium Header:** Sticky header with adaptive blur, shadow, and padding on scroll.
- ⏳ **Improved Loading Screen:** Custom branded message and adjusted timing.

---

## 🛠 Tech Stack

| Layer         | Tool/Service         | Purpose                          |
| ------------- | -------------------- | -------------------------------- |
| Frontend      | Next.js (App Router) | Modern, scalable React framework |
| UI            | Tailwind CSS         | Utility-first CSS styling        |
| Components    | shadcn/ui            | Reusable UI components           |
| Hosting       | Vercel (Recommended) | CI/CD, Preview Deployments       |
| Payments      | Stripe               | Card, Wallet Payments            |
|               | Coinbase Commerce    | Cryptocurrency Payments          |
| Backend DB    | Firebase Firestore   | Quote Submissions, Admin Data    |
| Auth (Admin)  | Firebase Auth        | Secure Admin Panel Access        |
| Emails (Opt.) | Resend               | Transactional Emails             |
| Animations    | Custom Components    | Scroll reveals, typed text, etc. |

---

## 🚀 Getting Started (Local Development)

1. **Clone:**

   ```bash
   # Replace with your actual repository URL
   git clone https://github.com/your-github-username/your-repo-name.git 
   cd your-repo-name 
   ```
2. **Install Dependencies:**

   ```bash
   npm install
   # or yarn / pnpm
   ```
3. **Environment Variables:**

   - Copy `.env.example` to `.env.local`.
   - Fill in your required keys for Firebase, Stripe, and optionally Coinbase/Resend.

   ```bash
   cp .env.example .env.local
   # Now edit .env.local with your keys
   ```

   *(**Note:** `NEXT_PUBLIC_` variables are exposed client-side. Keep secret keys without the prefix.)*
4. **Run Development Server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) (or the specified port).

---

## 🧱 Architecture Overview

This build utilizes the Next.js App Router structure:

```plaintext
/ 
├── public/             # Static assets (logos, images)
├── src/
│   ├── app/            # App Router (pages, layouts, API routes)
│   ├── components/       # Reusable UI components 
│   │   ├── animations/   # Custom animation components
│   │   ├── ui/           # Base UI components (shadcn/ui)
│   │   ├── layout/       # Layout (Header, Footer, etc.)
│   │   └── forms/        # Form components
│   ├── config/           # Site config (metadata, offerings, navigation)
│   ├── lib/              # Utilities, hooks, service clients (Stripe, Firebase, etc.)
│   ├── styles/           # Global CSS
│   └── types/            # TypeScript definitions
├── functions/          # Firebase Cloud Functions (if used)
├── docs/               # End-user documentation (separate from this README)
│   └── guides/           # Usage guides including animation guides
├── scripts/            # Utility scripts (e.g., create-admin-user.js)
├── .env.example        # Environment variable template
├── next.config.mjs     # Next.js config
├── tailwind.config.js  # Tailwind config
├── firebase.json       # Firebase hosting/functions config
├── firestore.rules     # Firestore security rules
└── package.json        # Dependencies & scripts
```

---

## 🔧 Managing the Hub

- **Offerings:** Modify product/service details in `src/config/offerings.ts`.
- **Site Info:** Edit general site metadata in `src/config/site.ts`.
- **Styling:** Update Tailwind classes or theme variables in `tailwind.config.js` and global CSS (`src/app/globals.css`).
- **Admin Panel:** Access requires setting up Firebase Auth and creating an admin user (see `scripts/create-admin-user.js`). Use this to manage dynamic links and view quote submissions.
- **Background Images:** Replace `light-background.jpg` / `dark-background.jpg` in `/public` and adjust opacity in `src/app/layout.tsx`.
- **Animations:** Refer to `docs/guides/animation-usage.md` for animation details.

---

## ☁️ Deployment

- **Frontend:** Deploy seamlessly to [Vercel](https://vercel.com/) by connecting your GitHub repository.
- **Backend/DB:** Firebase services (Firestore, Auth) are used. Ensure Firestore rules (`firestore.rules`) are deployed.
- **Environment Variables:** Add your production environment variables to your Vercel project settings.
- **Webhooks:** Configure Stripe and Coinbase webhook endpoints in their respective dashboards to point to your deployed API routes (e.g., `https://yourdomain.com/api/stripe/webhook`, `https://yourdomain.com/api/coinbase/webhook`). Ensure webhook secrets are set in your production environment variables.

---

## 💡 Future Enhancements

- [ ] Implement a customer support chat terminal. In process
- [ ] *(Add other ideas specific to your build here)*

---

*(This is a personalized build based on the Nodus Payment Hub template.)*
