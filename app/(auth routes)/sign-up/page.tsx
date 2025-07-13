'use client';

import { AuthUserData } from '@/lib/api/api';
import { register } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';

const initialValues: AuthUserData = {
  email: '',
  password: '',
};

export default function SignUp() {
  // register
  // оновлення стану аутентифікації
  // редірект
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const onSubmit = async (values: AuthUserData, actions: FormikHelpers<AuthUserData>) => {
    try {
      const user = await register(values);

      setUser({ ...user, avatar: '' });
      router.replace('/profile');
      actions.resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <h1>Sign up</h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
