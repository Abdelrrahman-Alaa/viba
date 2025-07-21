# Viba

A modern social platform built with **Next.js 15**, **React 19**, **Redux Toolkit**, and **Material UI**.
Viba allows users to register, log in, create posts, comment, and interact in real time with a beautiful, responsive UI.

## Demo

### :globe_with_meridians: Live Demo

[Try Viba Now](https://viba.vercel.app/)

### :key: Demo Credentials

```
Email:    demo@demo.com
Password: Demo@123
```

## Features

- **Authentication**: Register, login, and secure your session with JWT
- **Post Feed**: View all posts, each with user info, image, and comments
- **Create Post**: Add new posts with text and optional image upload
- **Comment System**: Add, delete, and view the latest comments on posts
- **Profile Page**: See your posts and manage your content
- **Protected Routes**: Only authenticated users can access main features
- **Responsive Design**: Built with Material UI for a great look on all devices
- **State Management**: Uses Redux Toolkit for scalable, maintainable state

## Project Structure

```
viba/
│
├── .next/                # Next.js build output
├── node_modules/         # Project dependencies
├── public/              # Static assets (SVGs, favicon, etc.)
├── src/
│   └── app/
│       ├── _redux/      # Redux slices and store
│       ├── components/  # Reusable React components
│       ├── profile/     # User profile page
│       ├── single-post/ # Single post view
│       ├── create-post/ # Create post page
│       ├── login/       # Login page
│       ├── register/    # Registration page
│       ├── _navbar/     # Navigation bar
│       ├── interfaces.ts # TypeScript interfaces
│       ├── globals.css  # Global styles
│       └── ...          # Other app files
├── package.json
├── tsconfig.json
├── next.config.ts
├── eslint.config.mjs
└── README.md
```

## Getting Started

### 1. Install dependencies

```bash
npm install
# or
yarn install
```

### 2. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Scripts

- `dev` – Start the development server with Turbopack
- `build` – Build the app for production
- `start` – Start the production server
- `lint` – Run ESLint

## Tech Stack

- **Next.js 15** – App router, SSR, API routes
- **React 19** – Modern React features
- **Redux Toolkit** – State management
- **Material UI** – UI components and theming
- **Formik & Yup** – Forms and validation
- **JWT** – Authentication
- **TypeScript** – Type safety

## Main Dependencies

See [`package.json`](./package.json) for the full list.

## TypeScript Configuration

- Strict mode enabled
- Path aliases: `@/*` → `src/*`
- No JS emit, only type-checking

## Data Models

Defined in `src/app/interfaces.ts`:

- **User**: `{ _id, name, photo }`
- **Post**: `{ _id, body, image, user, createdAt, comments, id }`
- **Comment**: `{ _id, content, commentCreator, post, createdAt }`

## State Management

Redux store is set up in `src/app/_redux/store.ts`
Slices: `authSlice`, `postSlice`, `commentSlice`

## Linting & Formatting

- ESLint config in `eslint.config.mjs`
- Standard Next.js/Node ignores

## Deployment

You can deploy this app on [Vercel](https://vercel.com/) or any platform supporting Next.js.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This project is for educational/demo purposes.
