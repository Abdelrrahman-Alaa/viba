---

## 🧪 Demo Credentials

Use the following credentials to log in as a demo user:

```
Email:    demo@demo.com
Password: Demo@123
```

---

## 🧑‍💻 Getting Started

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

---

## 📝 Scripts

- `dev` – Start the development server with Turbopack
- `build` – Build the app for production
- `start` – Start the production server
- `lint` – Run ESLint

---

## 🛠️ Tech Stack

- **Next.js 15** – App router, SSR, API routes
- **React 19** – Modern React features
- **Redux Toolkit** – State management
- **Material UI** – UI components and theming
- **Formik & Yup** – Forms and validation
- **JWT** – Authentication
- **TypeScript** – Type safety

---

## 📦 Main Dependencies

See [`package.json`](./package.json) for the full list.

---

## 🏗️ TypeScript Configuration

- Strict mode enabled
- Path aliases: `@/*` → `src/*`
- No JS emit, only type-checking

---

## 🗃️ Data Models

Defined in [`src/app/interfaces.ts`](./src/app/interfaces.ts):

- **User**: `{ _id, name, photo }`
- **Post**: `{ _id, body, image, user, createdAt, comments, id }`
- **Comment**: `{ _id, content, commentCreator, post, createdAt }`

---

## 🧩 State Management

Redux store is set up in [`src/app/_redux/store.ts`](./src/app/_redux/store.ts)  
Slices: `authSlice`, `postSlice`, `commentSlice`

---

## 🧹 Linting & Formatting

- ESLint config: [`eslint.config.mjs`](./eslint.config.mjs)
- Ignores: `node_modules`, `.next`, build, coverage, etc. (see `.gitignore`)

---

## 📁 Other Notable Files

- `.gitignore` – Standard Node/Next ignores
- `next.config.ts` – Next.js configuration
- `tsconfig.json` – TypeScript configuration

---

## 🌐 Deployment

You can deploy this app on [Vercel](https://vercel.com/) or any platform supporting Next.js.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is for educational/demo purposes.

---

**Enjoy building with Viba!**
