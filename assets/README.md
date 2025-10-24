# Anees Ahmad - Portfolio Website

A modern, terminal-inspired portfolio website showcasing software architecture and mobile development expertise.

## 🚀 Live Demo
Visit the live portfolio: [https://aneesahmad-dev.github.io/portfolio/](https://aneesahmad-dev.github.io/portfolio/)

## 📧 Contact Form Setup

The contact form uses Formspree for GitHub Pages compatibility. To set up your own:

1. Go to [Formspree.io](https://formspree.io)
2. Sign up with your GitHub account
3. Create a new form and get your form endpoint
4. Replace the form action in `index.html`:
   ```html
   <form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
5. Update the `_to` field with your email:
   ```html
   <input type="hidden" name="_to" value="your-email@gmail.com">
   ```

## 🛠 Deployment to GitHub Pages

1. Push all files to your GitHub repository
2. Go to repository Settings → Pages
3. Select source: Deploy from a branch
4. Choose branch: main (or master)
5. Select folder: / (root)
6. Save and wait for deployment

## 📁 File Structure

```
portfolio/
├── index.html          # Main portfolio page
├── styles.css          # All styling
├── script.js           # Interactive functionality
├── success.html        # Form success page
├── assets/
│   ├── profile.png     # Your profile photo
│   └── profile_black.png # B&W version
└── README.md           # This file
```

## ✨ Features

- **Responsive Design** - Works on all devices
- **Old Vibe Aesthetic** - Monochrome terminal-inspired theme
- **3D Elements** - Interactive cube animation
- **Real Client Testimonials** - Authentic feedback
- **Live App Links** - Direct links to published apps
- **Functional Contact Form** - Sends emails to your inbox
- **Fast Loading** - Optimized performance

## 🎨 Customization

To customize for your own use:

1. Replace profile images in `assets/` folder
2. Update personal information in `index.html`
3. Modify project details and links
4. Update social media links in footer
5. Change contact form email address

## 📱 Projects Featured

- **Unify Experiences** - Social platform (Live on stores)
- **SwipeDuel** - Social ranking app (Live on stores)  
- **FreshUp** - Lifestyle app (Live on App Store)
- **Trading Journal** - Financial analysis tool

## 🔧 Technologies Used

- HTML5 & CSS3
- Vanilla JavaScript
- Tailwind CSS (CDN)
- Formspree (Contact form)
- GitHub Pages (Hosting)

---

**Built with ❤️ by Anees Ahmad**  
*Flutter Developer & Software Architect*