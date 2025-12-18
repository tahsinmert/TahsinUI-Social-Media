# TahsinUI

<div align="center">
  <img src="/public/TahsinUI_full_logo.png" alt="TahsinUI Logo" width="300"/>
  
  <p align="center">
    <strong>A sophisticated, minimalist social media and editorial platform</strong>
  </p>
  
  <p align="center">
    Built with Next.js 14, TypeScript, and Tailwind CSS
  </p>
  
  [![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
</div>

---

## 🌟 Overview

TahsinUI is a modern, elegant social media and editorial platform that combines the best of both worlds: the engagement of social networks with the sophistication of high-end editorial design. Built with cutting-edge web technologies, it offers a seamless, responsive experience across all devices.

### Key Highlights

- **Modern Architecture**: Built on Next.js 14 with App Router for optimal performance
- **Type-Safe Development**: Full TypeScript support for enhanced developer experience
- **Beautiful UI**: Clean, minimalist design with smooth animations
- **Fully Responsive**: Mobile-first approach ensuring perfect experience on all devices
- **Performance Optimized**: Server-side rendering, code splitting, and image optimization
- **Accessible**: Built with accessibility best practices in mind

## ✨ Features

### Core Features

- **📱 Social Feed**: Interactive feed with posts, likes, comments, and reposts
- **👤 User Profiles**: Rich user profiles with followers, following, and activity stats
- **🔍 Explore**: Discover trending topics, hashtags, and people
- **📚 Stories**: Visual storytelling with image galleries
- **💬 Messaging**: Real-time messaging interface
- **🔔 Notifications**: Smart notification system
- **📑 Bookmarks**: Save and organize your favorite content
- **📝 Drafts**: Create and manage draft posts
- **📋 Lists**: Organize content with custom lists
- **⚙️ Settings**: Comprehensive user settings and preferences

### Design Features

- **Glassmorphism Navbar**: Sticky navigation with backdrop blur effect
- **Smooth Animations**: Powered by Framer Motion for fluid interactions
- **Quote of the Day**: Daily inspiration with beautiful typography
- **Trending Topics**: Real-time trending topics and hashtags
- **User Stats**: Comprehensive user statistics and engagement metrics
- **Weather & Motivation**: Personalized weather and motivational content
- **Text Selection Tooltip**: Enhanced text selection experience
- **Page Transitions**: Smooth page transitions for better UX
- **Scroll to Top**: Convenient scroll-to-top button

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js 14.2** - React framework with App Router
- **React 18.3** - UI library
- **TypeScript 5.3** - Type-safe JavaScript

### Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

### UI Components & Libraries
- **Headless UI 1.7** - Unstyled, accessible UI components
- **Framer Motion 11.0** - Animation library
- **Lucide React 0.344** - Beautiful icon library

### Fonts
- **Inter** - Modern sans-serif for body text
- **Playfair Display** - Elegant serif for headings

## 📦 Installation

### Prerequisites

- Node.js 18.0 or higher
- npm, yarn, or pnpm package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/TahsinUI.git
   cd TahsinUI
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
TasoUI/
├── app/                      # Next.js App Router pages
│   ├── archive/             # Archive page
│   ├── bookmarks/           # Bookmarks page
│   ├── contact/             # Contact page
│   ├── drafts/              # Drafts page
│   ├── editions/            # Editions listing and detail pages
│   ├── explore/             # Explore/discover page
│   ├── lists/               # Lists page
│   ├── messages/            # Messages page
│   ├── notifications/       # Notifications page
│   ├── settings/            # Settings page
│   ├── stories/             # Stories page
│   ├── subscribe/           # Subscription page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── BlogCard.tsx         # Blog post card component
│   ├── CommentSection.tsx   # Comment section component
│   ├── EditionCard.tsx      # Edition card component
│   ├── FeaturedContent.tsx  # Featured content component
│   ├── Feed.tsx             # Main feed component
│   ├── Footer.tsx           # Footer component
│   ├── Hero.tsx             # Hero section component
│   ├── LeftSidebar.tsx      # Left sidebar component
│   ├── ListCard.tsx         # List card component
│   ├── MoodboardGrid.tsx    # Moodboard grid component
│   ├── Navbar.tsx           # Navigation bar component
│   ├── Newsletter.tsx       # Newsletter component
│   ├── PageHeader.tsx       # Page header component
│   ├── PageTransition.tsx   # Page transition wrapper
│   ├── QuickActions.tsx     # Quick actions component
│   ├── QuoteOfDay.tsx       # Quote of the day component
│   ├── RightSidebar.tsx     # Right sidebar component
│   ├── ScrollToTop.tsx      # Scroll to top button
│   ├── SocialLayout.tsx     # Social layout wrapper
│   ├── StoryCard.tsx        # Story card component
│   ├── TextSelectionTooltip.tsx  # Text selection tooltip
│   ├── Toggle.tsx           # Toggle switch component
│   ├── TrendingTopics.tsx   # Trending topics component
│   ├── UserStats.tsx        # User statistics component
│   └── WeatherMotivation.tsx # Weather and motivation component
├── lib/                     # Utility libraries
│   ├── data.ts              # Mock data and types
│   └── socialData.ts        # Social media mock data
├── public/                  # Static assets
│   ├── favicon.png          # Favicon
│   ├── favicon-192.png      # 192x192 favicon
│   ├── profile-avatar.png   # Default profile avatar
│   └── TahsinUI_full_logo.png # Full logo
├── next.config.js           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── postcss.config.js        # PostCSS configuration
├── package.json             # Project dependencies
└── README.md                # This file
```

## 🎨 Design Philosophy

TahsinUI follows a minimalist design philosophy focused on:

- **Whitespace**: Generous use of whitespace for clarity and focus
- **Typography**: Carefully selected fonts for hierarchy and readability
- **Smooth Interactions**: Every interaction feels organic and fluid
- **Editorial Style**: Magazine-inspired layouts and content presentation
- **Consistency**: Cohesive design language throughout the application
- **Accessibility**: WCAG compliant design for inclusive user experience

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📱 Responsive Design

TahsinUI is fully responsive and optimized for:

- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktops (1280px+)
- 🖥️ Large desktops (1536px+)

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Add your environment variables here
# NEXT_PUBLIC_API_URL=your_api_url
```

### Next.js Configuration

The project includes optimized image domains configuration in `next.config.js`. Add additional image domains as needed.

### Tailwind Configuration

Customize colors, fonts, and other design tokens in `tailwind.config.ts`.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to:

- Report bugs
- Suggest new features
- Submit pull requests
- Follow our code of conduct

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Production-ready motion library
- [Lucide](https://lucide.dev/) - Beautiful & consistent icon toolkit
- [Headless UI](https://headlessui.com/) - Unstyled, accessible UI components

## 📞 Support

For support, email support@tahsinui.com or open an issue in the repository.

## 🔮 Roadmap

- [ ] Authentication & Authorization
- [ ] Real-time features with WebSockets
- [ ] Advanced search functionality
- [ ] Dark mode support
- [ ] Internationalization (i18n)
- [ ] Progressive Web App (PWA) support
- [ ] Advanced analytics dashboard
- [ ] Mobile applications (iOS & Android)

## 📊 Project Status

![Project Status](https://img.shields.io/badge/status-active-success?style=flat-square)
![Maintenance](https://img.shields.io/badge/maintained-yes-green?style=flat-square)

---

<div align="center">
  <p>Made with ❤️ using Next.js and TypeScript</p>
  <p>© 2024 TahsinUI. All rights reserved.</p>
</div>
