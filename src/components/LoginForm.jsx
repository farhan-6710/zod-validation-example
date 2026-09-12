import { useState } from "react";
import { z } from "zod";

const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });
      return;
    }

    setErrors({});
    console.log(result.data);
  }

  return (
    <section className="login-card">
      <header className="login-header">
        <p className="login-eyebrow">Welcome back</p>
        <h1 className="login-title">Sign in</h1>
        <p className="login-subtitle">Enter your email and password to continue.</p>
      </header>

      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <label className="login-field">
          <span>Email</span>
          <input
            className={errors.email ? "is-invalid" : undefined}
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="login-error">{errors.email}</p>}
        </label>

        <label className="login-field">
          <span>Password</span>
          <input
            className={errors.password ? "is-invalid" : undefined}
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="login-error">{errors.password}</p>}
        </label>

        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </section>
  );
}

export default LoginForm;
