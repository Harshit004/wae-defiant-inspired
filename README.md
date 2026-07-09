# 🌊 WAE Website (Water Air & Earth)

Welcome to the WAE website! This is where we show off all our cool water and environment products. 🚰🌍

## 👶 Super Simple Explanation

Imagine you have a toy box (this website) filled with different water toys (products). Each toy has its own special page where you can see pictures and learn all about it. That's what this website does, but for water and environment products!

## 🏗️ What's Inside

- **Homepage** - Like the cover of a storybook
- **Products** - Showcasing all our water products
- **About Us** - Who we are and what we do
- **Contact** - How to reach us

## 🚀 How to Run (For Grown-Ups)

1. Make sure you have Node.js installed
2. Open terminal and type:
   ```bash
   npm install
   npm run dev
   ```
3. Open your browser and go to: http://localhost:3000

## 🧩 Main Parts

- `/app` - All the website pages
- `/components` - Building blocks (like LEGO pieces)
- `/public` - Pictures and files
- `/data` - Information about products

## 🎨 Made With

- Next.js (Website magic)
- TypeScript (Makes code less confusing)
- Tailwind CSS (Makes things look pretty)
- Framer Motion (Adds cool animations)

## 🌳 Git & Deployment Workflow

We use **Vercel Preview Deployments** to test changes before they go live on the main website.

### 1. Create a branch and make changes
Never push directly to `main`. Create a new branch (like `staging`, `testing`, or a feature branch like `feat/new-header`):
```bash
git checkout -b <branch-name>
```

### 2. Push to get a Preview URL
Commit your changes and push your branch to GitHub:
```bash
git add .
git commit -m "Describe your changes"
git push -u origin <branch-name>
```
Vercel will automatically build a **Preview Deployment** and provide a unique URL to test your changes.

### 3. Merge to Main to Deploy Live
Once you are happy with the changes and have tested the preview URL, open a Pull Request (PR) on GitHub from your branch to `main`, merge it, and Vercel will deploy it to the live website.

## 📝 Need Help?

If something's not working, just ask! We're here to help. 😊

---

Made with ❤️ by the Harshit


