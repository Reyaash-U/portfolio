# React Portfolio - Modern, Premium Design

A beautifully crafted React portfolio with Tailwind CSS, featuring a cinematic dark/light theme, smooth animations, and fully responsive design.

## ✨ Features

- **Modern React Components** - Functional components using hooks
- **Tailwind CSS** - Utility-first styling, no inline CSS
- **Dark/Light Mode** - Seamless theme switching with localStorage persistence
- **Smooth Animations** - Scroll reveals, fade slides, and bounce effects
- **Fully Responsive** - Mobile-first design with Tailwind breakpoints
- **Premium Design** - Cinematic layout with amber accent colors
- **Performance Optimized** - Lightweight, fast-loading components
- **Clean Code** - Semantic JSX, proper indentation, reusable patterns

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation with theme toggle
│   │   ├── Hero.jsx             # Hero section with animations
│   │   ├── About.jsx            # About section with stats
│   │   ├── Skills.jsx           # Technical skills grid
│   │   ├── Projects.jsx         # Project showcase (bento layout)
│   │   ├── Experience.jsx       # Timeline experience
│   │   ├── Education.jsx        # Education cards
│   │   ├── Feats.jsx            # Achievements grid
│   │   └── Contact.jsx          # Contact section with social links
│   ├── App.jsx                  # Main app component
│   ├── App.css                  # Global styles & CSS variables
│   ├── index.css                # Tailwind directives
│   ├── main.jsx                 # Entry point
│   └── assets/                  # Images, fonts, etc.
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Install dependencies**
```bash
cd portfolio
npm install
```

2. **Start development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

3. **Build for production**
```bash
npm run build
```

## 🎨 Customization

### Colors & Theme

Edit `src/App.css` for theme variables:

```css
:root {
  --bg: #0a0a0a;           /* Background */
  --amber: #f5a623;        /* Accent color */
  --white: #f0ece4;        /* Text color */
  --muted: #888880;        /* Muted text */
  /* ... more variables */
}
```

For light mode, modify the `[data-theme="light"]` selector.

### Content

Update component props and data in each component:

- **Hero**: Role names in `roles` array (Hero.jsx)
- **About**: Bio text and avatar image (About.jsx)
- **Skills**: Skill categories and items (Skills.jsx)
- **Projects**: Project cards with links (Projects.jsx)
- **Experience**: Timeline items (Experience.jsx)
- **Education**: Education cards (Education.jsx)
- **Feats**: Achievements/certifications (Feats.jsx)
- **Contact**: Social links and email (Contact.jsx)

### Tailwind Configuration

The project uses Tailwind CSS. Customize `tailwind.config.js` for additional:
- Colors
- Fonts
- Breakpoints
- Animations
- Custom utilities

## 🎯 Key Components

### Navbar.jsx
- Fixed navigation with smooth scroll
- Theme toggle button
- Mobile hamburger menu
- Blur effect on scroll

### Hero.jsx
- Typewriter effect for role switching
- Animated SVG orbit visualization
- Smooth fade-in animations
- CTA button with hover effects

### About.jsx
- Avatar with spotlight glow
- Animated stat bars using IntersectionObserver
- Responsive grid layout

### Skills.jsx
- Categorized skill pills
- Hover effects with amber glow
- Reveal animations on scroll

### Projects.jsx
- Bento grid layout
- Project cards with hover effects
- Tech stack tags
- External links

### Experience.jsx
- Timeline layout with center line
- Date and badge information
- Bullet-point descriptions
- Tech tags

### Education.jsx
- Education cards with left accent bar
- Left-to-right hover animations

### Contact.jsx
- Availability badge with pulse animation
- Email copy-to-clipboard functionality
- Social media links with staggered animations
- Toast notification on copy

## 🎬 Animations

All animations use Tailwind utilities or CSS:

- **Reveal animations**: Scroll-triggered fade-in with translateY
- **Bounce effects**: Pulse and heartbeat animations
- **Smooth transitions**: 0.3s-0.7s ease animations
- **Hover states**: Scale, translate, and color changes

## 📱 Responsive Design

- **Mobile-first approach**: Designed for small screens first
- **Breakpoints**: `sm` (640px), `md` (768px), `lg` (1024px)
- **Tailwind breakpoints**: Used throughout components
- **Hamburger menu**: Hidden on desktop, visible on mobile

## 🌓 Dark/Light Mode

The app uses:
- **CSS Custom Properties** for theme colors
- **localStorage** to persist user preference
- **React state** for dynamic theme switching
- **Smooth transitions** between themes

Theme is applied via `data-theme` attribute on `<html>`:

```jsx
// Light mode
document.documentElement.setAttribute('data-theme', 'light');

// Dark mode (default)
document.documentElement.removeAttribute('data-theme');
```

## 📦 Dependencies

Core dependencies:
- `react` - UI library
- `react-dom` - React DOM rendering
- `tailwindcss` - Utility CSS framework
- `vite` - Fast build tool
- `postcss` - CSS processor

Development dependencies:
- `@vitejs/plugin-react` - Vite React plugin
- `autoprefixer` - CSS vendor prefixes
- `tailwindcss` - Tailwind CSS framework

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy the 'dist' folder
```

### GitHub Pages
Update `vite.config.js`:
```js
export default {
  base: '/your-repo-name/',
}
```

## 💡 Best Practices Used

✅ **Functional Components** - All components use hooks
✅ **Props-based customization** - isDark prop passed through
✅ **Semantic JSX** - Proper HTML structure
✅ **IntersectionObserver** - Efficient scroll animations
✅ **CSS Variables** - Easy theme management
✅ **Tailwind utilities** - No custom CSS needed
✅ **Mobile-first** - Responsive from the start
✅ **Accessibility** - Proper ARIA labels
✅ **Performance** - Optimized re-renders
✅ **Code quality** - Clean, readable code

## 🔧 Troubleshooting

### Styles not applying
- Clear browser cache
- Rebuild Tailwind: `npm run build`
- Check `tailwind.config.js` for file paths

### Animations not smooth
- Ensure hardware acceleration is enabled
- Check browser DevTools for performance issues
- Reduce animation complexity on slow devices

### Dark mode not persisting
- Check localStorage is enabled
- Verify `localStorage.setItem()` is called
- Check for browser privacy mode restrictions

## 📄 License

Created by Reyaash U - Portfolio template available for personal and commercial use.

## 🤝 Contributing

Feel free to fork and customize this template for your own portfolio!

---

**Built with ❤️ using React & Tailwind CSS**
