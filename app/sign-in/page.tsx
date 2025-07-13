'use client';

export default function SignIn() {
  // login
  // оновлення стану аутентифікації
  // редірект

  return (
    <main>
      <h1>Sign in</h1>
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>

        <div>
          <button type="submit">Log in</button>
        </div>
      </form>
    </main>
  );
}
