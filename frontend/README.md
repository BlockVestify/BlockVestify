# BlockVest Frontend

A modern React application for managing bond investments.

## Project Structure

```
frontend/
├── public/                 # Static files
├── src/                   # Source code
│   ├── components/        # Reusable components
│   │   ├── Layout.tsx    # Main layout wrapper
│   │   ├── Login.tsx     # Login form
│   │   └── Signup.tsx    # Signup form
│   │
│   ├── contexts/         # React contexts
│   │   └── AuthContext.tsx  # Authentication context
│   │
│   ├── lib/              # Library code
│   │   └── supabase.ts   # Supabase client configuration
│   │
│   ├── pages/            # Page components
│   │   ├── Dashboard.tsx # Main dashboard
│   │   ├── Bonds.tsx     # Bonds management
│   │   ├── Analytics.tsx # Analytics view
│   │   └── Settings.tsx  # User settings
│   │
│   ├── services/         # API services
│   │   └── bondService.ts # Bond-related API calls
│   │
│   ├── styles/           # Global styles
│   │   ├── global.css    # Global CSS
│   │   └── index.css     # Entry CSS file
│   │
│   ├── App.tsx           # Main App component
│   └── main.tsx          # Application entry point
│
├── .env                  # Environment variables
├── index.html            # HTML entry point
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── tailwind.config.js    # Tailwind CSS configuration
```

## Key Features

- **Authentication**: Complete authentication flow using Supabase
- **Protected Routes**: Route protection for authenticated users
- **Modern UI**: Responsive design with Tailwind CSS
- **Type Safety**: Full TypeScript support
- **State Management**: React Context for global state
- **API Integration**: Supabase integration for backend services

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file with:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Start the development server:
```bash
npm run dev
```

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint
