'use client';

import { Field, Form, Formik } from 'formik';

export default function SignUp() {
  // register
  // оновлення стану аутентифікації
  // редірект

  return (
    <main>
      <h1>Sign up</h1>
      <Formik initialValues={{}} onSubmit={() => {}}>
        <Form>
          <div>
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" id="email" required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Field type="password" name="password" id="password" required />
          </div>
          <div>
            <button type="submit">Register</button>
          </div>
        </Form>
      </Formik>
    </main>
  );
}
