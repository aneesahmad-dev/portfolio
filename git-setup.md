# Git Setup & Push Commands

## 🚀 Push to GitHub Repository

### Step 1: Initialize Git (if not already done)
```bash
git init
```

### Step 2: Add Remote Repository
```bash
git remote add origin https://github.com/aneesahmad-dev/portfolio.git
```

### Step 3: Check Current Status
```bash
git status
```

### Step 4: Add All Files
```bash
git add .
```

### Step 5: Commit Changes
```bash
git commit -m "Complete portfolio redesign with old vibe theme

- Enhanced 3D cube animation with proper geometry
- Integrated real profile photo with seamless blending
- Added comprehensive education section with Stanford Code in Place
- Updated projects with live app store links
- Real client testimonials with interactive features
- Functional contact form with Formspree integration
- Monochrome old vibe aesthetic throughout
- Mobile responsive design
- Performance optimized for GitHub Pages"
```

### Step 6: Set Main Branch
```bash
git branch -M main
```

### Step 7: Push to GitHub
```bash
git push -u origin main
```

## 🔧 If Repository Already Exists

If you get an error about the repository already existing, use:

```bash
# Force push (be careful - this overwrites existing content)
git push -f origin main
```

OR

```bash
# Pull first, then push
git pull origin main --allow-unrelated-histories
git push origin main
```

## 📋 Files Being Pushed

✅ **Core Files:**
- index.html (main portfolio page)
- styles.css (all styling - 1000+ lines)
- script.js (interactive functionality)
- success.html (form success page)

✅ **Documentation:**
- README.md (comprehensive documentation)
- deploy.md (deployment guide)
- git-setup.md (this file)

✅ **Assets:**
- assets/profile.png (original photo)
- assets/profile_black.png (B&W version)

## 🌐 After Pushing

1. **Enable GitHub Pages:**
   - Go to repository Settings
   - Navigate to Pages section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Save settings

2. **Set up Formspree:**
   - Visit [formspree.io](https://formspree.io)
   - Create account and new form
   - Replace form endpoint in index.html
   - Test contact form functionality

3. **Your site will be live at:**
   `https://aneesahmad-dev.github.io/portfolio/`

## 🔍 Verify Push Success

After pushing, check:
- Repository shows all files on GitHub
- Commit message appears correctly
- File count matches local files
- README displays properly on GitHub

## 🚨 Troubleshooting

**Authentication Error?**
```bash
# Use personal access token instead of password
# Generate token at: GitHub Settings > Developer settings > Personal access tokens
```

**Permission Denied?**
```bash
# Check if you're the repository owner
# Ensure you have write access to the repository
```

**Files Missing?**
```bash
# Check .gitignore file
# Ensure no files are being ignored unintentionally
```

---

**Ready to push? Run the commands above in your terminal!** 🚀