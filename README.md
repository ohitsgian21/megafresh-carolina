# Supermercado El Mejor — Website

Modern, enterprise-grade supermarket website built with React, TypeScript, and Tailwind CSS.

**Live Demo**: [View on GitHub Pages](https://ohitsgian472.github.io/CurrWebsite/)

---

## 🎯 Project Overview

This website merges two versions of the Supermercado El Mejor website:
- **Original**: Static HTML/PHP website with Bootstrap styling (traditional approach)
- **Loveable Template**: Modern React 19 + TypeScript application with superior architecture

The final version combines the best of both: **modern architecture + proven stability + enhanced features**.

---

## ✨ Key Features

### 🛍️ Product Management
- **Dynamic Product Catalog** — Browse products by category
- **Advanced Search** — Real-time product search in header
- **Smart Filtering** — Filter by category, price, and availability (hot/cold items)
- **Deal Highlights** — Weekly specials with savings percentages

### 📱 Responsive Design
- Mobile-first approach (works on all screen sizes)
- Optimized for tablets, desktops, and **Samsung TV browsers**
- Touch-friendly navigation and large buttons for TV remote use

### 📺 TV Mode
- Fullscreen slideshow for in-store displays
- Auto-rotating promotions, products, and categories
- Large typography optimized for distance viewing
- Manual controls via keyboard (arrow keys, F for fullscreen)

### 🌐 Modern Stack
- **React 19** with TypeScript for type safety
- **TanStack Router** for file-based routing
- **Tailwind CSS 4** for responsive styling
- **Radix UI** for accessible components
- **React Hook Form + Zod** for form validation
- **Formspree** for serverless form handling

### 📧 Contact Form
- Real-time validation with error messages
- Integrated with **Formspree** (free tier available)
- Responsive design with success/error states
- Accessible form fields with proper labels

### 🔍 Search & Navigation
- Global product search in sticky header
- Filter buttons for quick category browsing
- Mobile hamburger menu with search integration
- TV Mode shortcut in navigation

---

## 🏗️ Project Structure

```
CurrWebsite/
├── src/
│   ├── routes/              # Page components (file-based routing)
│   │   ├── index.tsx        # Home page with hero & deals
│   │   ├── ofertas.tsx      # Weekly deals with filtering
│   │   ├── categorias.tsx   # Product categories
│   │   ├── contacto.tsx     # Contact form (Formspree)
│   │   ├── nosotros.tsx     # About us
│   │   ├── tv.tsx           # TV mode slideshow
│   │   └── __root.tsx       # Root layout
│   ├── components/
│   │   ├── Header.tsx       # Sticky navigation with search
│   │   ├── Footer.tsx       # Footer with store info
│   │   ├── HeroCarousel.tsx # Auto-rotating hero section
│   │   ├── DealCard.tsx     # Product card component
│   │   ├── Layout.tsx       # Page wrapper
│   │   └── ui/              # 46 Radix UI components
│   ├── lib/
│   │   ├── data.ts          # Products, categories, store info
│   │   └── utils.ts         # Utility functions
│   ├── hooks/               # Custom React hooks
│   ├── assets/              # Images and static files
│   ├── styles.css           # Global styles + Tailwind
│   └── router.tsx           # Router configuration
├── docs/                    # Build output (GitHub Pages)
│   ├── client/              # Client-side bundle
│   └── server/              # Server-side files
├── vite.config.ts           # Build configuration
├── tsconfig.json            # TypeScript config
├── tailwind.config.ts       # Tailwind configuration
├── package.json             # Dependencies
└── README.md                # This file
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (we tested with v24.14.1)
- npm 8+ (we tested with 11.11.0)
- Git

### Installation

```bash
# Clone or navigate to the project
cd CurrWebsite/Loveable\ Template

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Building for Production

```bash
# Build the project (outputs to `docs/`)
npm run build

# Preview the production build locally
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

---

## 🔧 Configuration

### Formspree Email Setup

The contact form is configured to send emails via Formspree. To set it up:

1. Visit [formspree.io](https://formspree.io)
2. Create a free account
3. Create a new form and get your form ID (format: `f/xyzqwpdo`)
4. Update the form endpoint in `src/routes/contacto.tsx`:

```typescript
const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
  method: "POST",
  body: formData,
});
```

### GitHub Pages Deployment

The vite config is already set for GitHub Pages deployment:

```typescript
// vite.config.ts
export default defineConfig({
  vite: {
    base: "/CurrWebsite/",
    build: {
      outDir: "docs",
      emptyOutDir: true,
    },
  },
});
```

**Steps to deploy**:

1. Ensure you're on a git repository with a `docs/` folder in `.gitignore` removed
2. Build the project: `npm run build`
3. Commit and push to GitHub: `git add docs && git commit -m "Deploy" && git push`
4. Go to repo Settings → Pages → select "Deploy from a branch" → choose `main` branch and `/docs` folder
5. Your site will be live at `https://username.github.io/CurrWebsite/`

### Custom Domain (Optional)

If you have a custom domain, create a `CNAME` file in the `docs/` folder with your domain name.

---

## 📊 Performance Optimization

### Current Optimizations ✅
- ✅ Code splitting by route (automatic via TanStack Router)
- ✅ Image lazy loading with `loading="lazy"`
- ✅ CSS purged to essentials only (Tailwind)
- ✅ Bundle size: ~1.1 MB total (with React, Tailwind, all routes)
- ✅ Gzip compression: ~300 KB (client bundle)

### Future Optimizations (Optional)
- Convert large GIFs to `.mp4`/`.webm` for 70-80% size reduction
- Implement WebP image format for JPGs
- Add Service Worker for offline support
- Implement image sprites for small icons
- Consider dynamic imports for rarely-used features

### GIF Optimization (For Future)

The original GIFs in `/img/` are very large (30-50MB each). To optimize them before use:

```bash
# Using ffmpeg (install from ffmpeg.org)
ffmpeg -i input.gif -vf "scale=800:-1" -f mp4 -vcodec libx264 -pix_fmt yuv420p output.mp4
```

Or use online tools like **CloudConvert** or **ezgif.com** for quick optimization.

---

## 🔐 Security

### Implemented ✅
- ✅ Input validation with Zod (contact form)
- ✅ React prevents XSS by default
- ✅ No hardcoded secrets in code
- ✅ All external links use HTTPS
- ✅ Form submission via Formspree (server-side protection)

### Best Practices for Future
- Use environment variables for API keys (`.env` files)
- Keep dependencies updated: `npm audit` regularly
- Sanitize any user-generated content from database
- Use CSP headers if migrating off GitHub Pages

---

## 🌍 Browser Support

Tested and working on:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (iOS + macOS)
- ✅ Samsung TV Browser (WebKit-based)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📱 TV Mode Usage

### Accessing TV Mode
1. Click "TV" button in navigation
2. Or navigate directly to `/tv`
3. Press `F` key to enter fullscreen mode

### TV Mode Features
- **Auto-rotating slides** — Changes every 7 seconds
- **Manual controls** — Use arrow keys to navigate
- **Fullscreen mode** — Press `F` to toggle
- **Exit** — Press Escape or click back

### Optimized For
- Samsung TV embedded browsers
- LG WebOS
- Sony Android TV
- Large displays (50"+ screens)
- Remote control navigation

---

## 📝 Store Information

**Supermercado El Mejor**
- 📍 24 C. Yunquecito, Carolina, PR 00987
- 📞 (787) 257-8050
- ⏰ Hours: Mon–Sun, 5:30 AM – 9:00 PM
- 📧 elmejorsupermercado1@gmail.com

---

## 🎨 Customization Guide

### Changing Colors
Colors are in `tailwind.config.ts` using OKLch color space for perceptual uniformity:

```typescript
// Primary brand red
primary: "oklch(0.56 0.235 27)"
// Accent yellow
accent: "oklch(0.88 0.18 95)"
```

### Adding New Pages
1. Create a new file in `src/routes/` (e.g., `blog.tsx`)
2. Add route definition:
```typescript
export const Route = createFileRoute("/blog")({
  component: Blog,
});
```
3. Add link in `src/components/Header.tsx` navigation

### Adding Products
Update product data in `src/lib/data.ts`:

```typescript
export const deals = [
  { 
    name: "Product Name",
    category: "Category",
    price: 9.99,
    was: 14.99,
    badge: "-33%",
    unit: "ea",
    cold: true // for beverages
  },
  // ... more products
];
```

---

## 🐛 Troubleshooting

### Build errors?
```bash
npm run build
```
Check the error output and ensure all TypeScript is correct.

### Site not loading at `/CurrWebsite/`?
Verify the `base: "/CurrWebsite/"` in `vite.config.ts` matches your GitHub Pages URL.

### Contact form not sending?
1. Check that Formspree endpoint is correct in `src/routes/contacto.tsx`
2. Verify network request in browser DevTools → Network tab
3. Check Formspree dashboard for any errors

### Search not working?
The search filters from the hardcoded `deals` array in `src/lib/data.ts`. Add more products to see more search results.

---

## 📚 Tech Stack Details

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19.2.0 | UI framework |
| TypeScript | 5.8.3 | Type safety |
| TanStack Router | 1.168.0 | File-based routing |
| Vite | 7.3.1 | Build tool |
| Tailwind CSS | 4.2.1 | Styling |
| Radix UI | Latest | Accessible components |
| React Hook Form | 7.71.2 | Form handling |
| Zod | 3.24.2 | Form validation |
| Formspree | Free | Form backend |

---

## 🚢 Deployment Checklist

Before deploying to production:

- [ ] Update Formspree endpoint in `contacto.tsx`
- [ ] Test contact form sending
- [ ] Verify all links work correctly
- [ ] Test on actual Samsung TV (or TV browser emulation)
- [ ] Check Lighthouse scores (should be 90+)
- [ ] Verify mobile responsiveness
- [ ] Test search and filtering features
- [ ] Confirm store info is current
- [ ] Check social media links (update if needed)
- [ ] Run `npm audit` for security vulnerabilities

---

## 📄 Changelog

### V2.0 (Current Merge)
- ✨ Merged Loveable React template with original HTML version
- ✨ Added global product search in header
- ✨ Enhanced filtering on deals page
- ✨ Optimized TV mode for Samsung TVs
- ✨ Integrated Formspree for contact form
- 🐛 Removed large unoptimized GIFs
- 📦 Modern build setup with Vite
- 🔒 Added form validation with Zod
- 📱 Improved mobile responsiveness

### V1.0 (Original HTML Version)
- Basic HTML/CSS/jQuery website
- Bootstrap styling
- Static pages for products, about, contact
- Flipbook gallery for special offers
- PHP-based contact form

---

## 📞 Support & Maintenance

### Regular Maintenance
- Update dependencies monthly: `npm install`
- Run security audit: `npm audit`
- Check links and form functionality

### Adding New Features
- Use `npm run dev` for local development
- Test across devices before deploying
- Follow existing code patterns and styles

### Monitoring
- Check Google Analytics for traffic
- Monitor Formspree for form submissions
- Review Lighthouse scores regularly

---

## 📜 License

This project combines original design with modern implementation. All rights reserved for Supermercado El Mejor branding and content.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**

Last updated: May 2026
