# Zod Validation Example

A React login form that uses [Zod](https://zod.dev) to validate email and password on submit.

## How Zod is used

The schema lives in `src/components/LoginForm.jsx`. It describes the shape of valid form data:

```js
const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
```

On submit, the form does not throw. It uses `safeParse` so success and failure can be handled in the UI:

```js
const result = loginSchema.safeParse(formData);

if (!result.success) {
  const fieldErrors = result.error.flatten().fieldErrors;
  setErrors({
    email: fieldErrors.email?.[0],
    password: fieldErrors.password?.[0],
  });
  return;
}

console.log(result.data); // typed, validated values
```

- `z.object()` defines the fields that must be present.
- `z.email()` checks that the value is a valid email.
- `.min(6)` requires a password of at least 6 characters.
- `safeParse()` returns `{ success, data }` or `{ success, error }` instead of throwing.
- `error.flatten().fieldErrors` maps each field name to its messages, which the form shows under the input.

Valid input is logged to the console. Invalid input shows the first Zod message under the matching field.

## Setup

```bash
bun install
bun run dev
```

| Command | What it does |
| --- | --- |
| `bun install` | Installs dependencies from `package.json` |
| `bun run dev` | Starts the Vite dev server |
| `bun run build` | Builds the production bundle |
| `bun run preview` | Serves the production build locally |

## Project files

```
zod-validation-example/
├── index.html
├── package.json
├── bun.lock
├── vite.config.js
├── eslint.config.js
├── public/
│   ├── favicon.svg
│   └── icons.svg
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    └── components/
        └── LoginForm.jsx
```

| File | Role |
| --- | --- |
| `index.html` | HTML shell. Mounts React on `#root` and loads `src/main.jsx`. |
| `package.json` | Project name, scripts, and dependencies (`react`, `zod`). |
| `bun.lock` | Lockfile so `bun install` gets the same versions. |
| `vite.config.js` | Vite config. Enables the React plugin. |
| `eslint.config.js` | ESLint rules for JS/JSX and React hooks. |
| `public/favicon.svg` | Browser tab icon. |
| `public/icons.svg` | Extra SVG icons used by the Vite template. |
| `src/main.jsx` | App entry. Renders `<App />` into `#root`. |
| `src/App.jsx` | Page layout. Centers and renders `<LoginForm />`. |
| `src/index.css` | Global styles and login card / error styles. |
| `src/components/LoginForm.jsx` | Login UI, Zod schema, submit validation, and field errors. |
