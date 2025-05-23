# Solara Business Enterprise Suite

A powerful, modern business management platform built with Next.js 14, TypeScript, and Clerk authentication.

## 🌟 Features

- **Authentication & Authorization**
  - Secure user authentication with Clerk
  - Role-based access control
  - Protected routes and API endpoints

- **Project Management**
  - Time tracking
  - Task management
  - Project analytics
  - Team collaboration

- **Modern UI/UX**
  - Responsive design
  - Dark/Light mode
  - Beautiful animations
  - Intuitive navigation

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Clerk account for authentication

### Installation

1. Clone the repository:
```bash
git clone https://github.com/JkayAy/solara.ai.git
cd solara.ai
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Authentication**: Clerk
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Context
- **Animation**: Framer Motion
- **Icons**: Lucide Icons

## 📁 Project Structure

```
solara.ai/
├── src/
│   ├── app/              # App router pages
│   ├── components/       # Reusable components
│   ├── lib/             # Utility functions
│   ├── styles/          # Global styles
│   └── contexts/        # React contexts
├── public/              # Static assets
└── ...
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **JkayAy** - *Initial work* - [GitHub](https://github.com/JkayAy)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Clerk](https://clerk.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
