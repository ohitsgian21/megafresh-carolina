# Deployment Guide — Supermercado El Mejor Website

## 📋 Pre-Deployment Checklist

Before deploying your merged website to GitHub Pages, complete these critical steps:

### 1. ✅ Setup Formspree Contact Form

The contact form uses Formspree to send emails. **This requires action:**

1. Visit [formspree.io](https://formspree.io)
2. Sign up for a **free account**
3. Create a new form:
   - Click "New Form"
   - Select "I'll use your API" option
   - Fill in email address: `elmejorsupermercado1@gmail.com`
   - Click "Create"
4. Copy the form endpoint (looks like: `f/xyzqwpdo`)
5. **Update** `src/routes/contacto.tsx`:
   - Find the line: `const response = await fetch("https://formspree.io/f/xyzqwpdo", {`
   - Replace `xyzqwpdo` with YOUR form ID
6. Save the file

**Test the form**: After deployment, visit `/contacto` and send a test message to verify it works.

---

## 🚀 Step-by-Step Deployment

### Step 1: Build the Project

```bash
cd Loveable\ Template
npm install      # (if not done already)
npm run build    # Creates /docs folder with production build
```

✅ **Result**: A `docs/` folder with client and server builds is created.

---

### Step 2: Verify the Build

```bash
# Check that docs folder was created
ls -la docs/
# Should show: client/ and server/ folders
```

---

### Step 3: Configure Git & GitHub Pages

#### If this is a NEW repository:

```bash
# Initialize git (if not already done)
cd ..  # Go to CurrWebsite root
git init
git add .
git commit -m "Initial commit: Merged supermarket website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/CurrWebsite.git
git push -u origin main
```

#### If this is an EXISTING repository:

Simply make sure your changes are committed:

```bash
git add .
git commit -m "Merge and upgrade: Modern React website with search, filtering, and Formspree"
git push origin main
```

---

### Step 4: Configure GitHub Pages Settings

1. Go to your GitHub repository: `https://github.com/YOUR_USERNAME/CurrWebsite`
2. Click **Settings** → **Pages** (left sidebar)
3. Under "Build and deployment":
   - **Source**: Select "Deploy from a branch"
   - **Branch**: Select `main` and `/docs` folder
   - Click **Save**

4. ✅ Your site will be live at: `https://YOUR_USERNAME.github.io/CurrWebsite/`

---

### Step 5: Test the Live Site

Visit your live URL and test:

- [ ] Home page loads with hero carousel
- [ ] Search bar works (try searching "Pollo" or "Agua")
- [ ] Offers page filters work (try selecting categories)
- [ ] Contact form submits without errors
- [ ] TV mode displays correctly (`/tv`)
- [ ] Mobile menu works on mobile devices
- [ ] Links to social media (if configured)

---

## 🔄 Updating After Deployment

### Making Changes

1. **Edit code** in `Loveable\ Template/src/`
2. **Test locally**: `npm run dev`
3. **Build**: `npm run build`
4. **Commit & push**:

```bash
git add docs/
git commit -m "Update: [describe changes]"
git push origin main
```

GitHub Pages will auto-deploy in ~1-2 minutes.

---

### Automatic Deployment (Optional GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: cd Loveable\ Template && npm install && npm run build
      - uses: stefanzweifel/git-auto-commit-action@v4
        with:
          commit_message: 'Auto-deploy: build output'
          file_pattern: docs/
```

This automatically rebuilds and commits when you push changes.

---

## 📌 Custom Domain Setup (Optional)

If you have a custom domain (e.g., `www.superelmejor.com`):

1. **Create a CNAME file** in the `docs/` folder:

```bash
echo "www.superelmejor.com" > docs/CNAME
```

2. **Update DNS** at your domain registrar to point to GitHub Pages:
   - Add `A` records to GitHub's IP addresses, OR
   - Add `CNAME` record pointing to `YOUR_USERNAME.github.io`

3. **Commit & push**:

```bash
git add docs/CNAME
git commit -m "Add custom domain"
git push
```

4. GitHub will show domain status in Settings → Pages (wait 5-10 minutes for DNS propagation)

---

## 📊 Performance & Monitoring

### Check Build Performance

After deployment, test with Google Lighthouse:

1. Visit your live site
2. Press `F12` → Open DevTools
3. Click **Lighthouse** tab
4. Run audit

✅ **Target scores**:
- **Performance**: 90+
- **Accessibility**: 90+
- **Best Practices**: 90+
- **SEO**: 90+

---

### Form Submission Monitoring

Monitor contact form submissions:

1. Log into [Formspree.io](https://formspree.io)
2. View form submissions in your dashboard
3. Emails are sent to: `elmejorsupermercado1@gmail.com`

---

## 🔐 Security Checklist

- [ ] No hardcoded API keys in repository
- [ ] Formspree endpoint configured with YOUR form ID
- [ ] HTTPS enabled (GitHub Pages auto-enables)
- [ ] Dependencies are up-to-date: `npm audit`

---

## ❌ Troubleshooting

### Site Not Loading at URL

**Problem**: Getting 404 at `https://username.github.io/CurrWebsite/`

**Solutions**:
1. Verify `/docs` folder exists with `client/` and `server/` folders
2. Check `vite.config.ts` has `base: "/CurrWebsite/"`
3. Verify GitHub Pages is set to deploy from `/docs` folder
4. Wait 1-2 minutes for GitHub Pages to rebuild

---

### Contact Form Not Sending

**Problem**: Form submits but emails aren't received

**Solutions**:
1. Verify Formspree endpoint is correct in `contacto.tsx`
2. Check browser Console (F12 → Console) for errors
3. Verify email address in Formspree account settings
4. Test submission from [Formspree.io](https://formspree.io) dashboard

---

### Search Not Working

**Problem**: Search bar doesn't show results

**Solutions**:
1. Verify products exist in `src/lib/data.ts`
2. Check browser Console for JavaScript errors
3. Try searching for exact product names (case-insensitive)
4. Verify network requests in DevTools → Network tab

---

### TV Mode Not Working

**Problem**: TV mode page is blank or unresponsive

**Solutions**:
1. Verify route `/tv` exists in `src/routes/tv.tsx`
2. Check that categories and deals data is loaded
3. Try pressing `F` to toggle fullscreen
4. Check Console for any runtime errors

---

## 🎯 What's Been Done

This deployment includes:

✅ **Modern React 19 Application** — Fully typed with TypeScript
✅ **File-Based Routing** — TanStack Router for clean URLs
✅ **Global Search** — Real-time product search in header
✅ **Advanced Filtering** — Filter deals by category
✅ **Responsive Design** — Mobile, tablet, desktop, TV optimized
✅ **TV Mode** — Full-screen slideshow for in-store displays
✅ **Contact Form** — Serverless form submission via Formspree
✅ **Accessible Components** — 46 Radix UI components
✅ **Form Validation** — Zod schema validation
✅ **Modern Styling** — Tailwind CSS 4 with custom theme
✅ **Build Optimization** — Code splitting, lazy loading, tree-shaking
✅ **Security** — Input validation, XSS prevention, no secrets
✅ **Documentation** — Comprehensive README and guides

---

## 📞 Next Steps

1. **Complete Formspree setup** (required for contact form to work)
2. **Deploy to GitHub Pages** using steps above
3. **Test all features** on the live site
4. **Update store hours/contact info** if needed in `src/lib/data.ts`
5. **Monitor form submissions** via Formspree dashboard

---

## ✨ Future Improvements

**Optional enhancements** for later:

- [ ] Optimize GIFs for TV mode (convert to MP4)
- [ ] Add product images from database
- [ ] Implement shopping cart functionality
- [ ] Connect to Odoo for inventory management
- [ ] Add customer reviews/ratings
- [ ] Implement email newsletter signup
- [ ] Add online ordering system
- [ ] Multi-language support (English/Spanish)

---

**Your website is production-ready! 🚀**

Questions? Check the [README.md](./README.md) for more details.

Last updated: May 2026
