# GitHub Pages Deployment Guide

## Quick Setup Steps:

### 1. Repository Setup
```bash
# If you haven't already, initialize git in your project folder
git init
git add .
git commit -m "Initial portfolio commit"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

### 2. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select "Deploy from a branch"
5. Choose **main** branch and **/ (root)** folder
6. Click **Save**

### 3. Contact Form Setup (Important!)
The contact form currently uses a placeholder Formspree endpoint. To make it work:

1. Visit [formspree.io](https://formspree.io)
2. Sign up (free account works fine)
3. Create a new form
4. Copy your form endpoint (looks like: `https://formspree.io/f/xdkngyor`)
5. Replace the form action in `index.html`:
   ```html
   <form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

### 4. Update Your Information
- Replace `aneesahmad00423@gmail.com` with your email in the form
- Update the `_next` URL to point to your GitHub Pages URL
- Replace profile images in the `assets/` folder

### 5. Your Site Will Be Live At:
`https://YOUR_USERNAME.github.io/portfolio/`

## File Checklist:
- ✅ index.html (main page)
- ✅ styles.css (styling)
- ✅ script.js (functionality)  
- ✅ success.html (form success page)
- ✅ assets/profile_black.png (your photo)
- ✅ README.md (documentation)

## Troubleshooting:
- **Form not working?** → Set up Formspree endpoint
- **Images not loading?** → Check file paths in assets folder
- **Site not updating?** → Wait 5-10 minutes for GitHub Pages to rebuild
- **404 error?** → Make sure repository is public and Pages is enabled

## Custom Domain (Optional):
If you want to use your own domain:
1. Add a `CNAME` file with your domain name
2. Configure DNS settings with your domain provider
3. Update the form `_next` URL to your custom domain