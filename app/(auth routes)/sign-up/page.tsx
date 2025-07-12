'use client';

import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import { CreateUserData } from '@/lib/api/api';
import { register } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

import css from './SignUp.module.css';

const initialValues: CreateUserData = {
  email: '',
  password: '',
};

export default function SignUp() {
  const router = useRouter();

  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (values: CreateUserData, actions: FormikHelpers<CreateUserData>) => {
    try {
      const user = await register(values);
      setUser(user);
      actions.resetForm();
      router.replace('/profile');
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <div className={css.formGroup}>
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" id="email" required className={css.input} />
          </div>
          <div className={css.formGroup}>
            <label htmlFor="password">Password</label>
            <Field type="password" name="password" id="password" required className={css.input} />
          </div>
          <div className={css.actions}>
            <button type="submit" className={css.submitButton}>
              Register
            </button>
          </div>
        </Form>
      </Formik>
    </main>
  );
}

// 'use client';

// import { useRouter } from 'next/navigation';
// import { CreateUserData } from '@/lib/api/api';
// import { register } from '@/lib/api/clientApi';
// import { useAuthStore } from '@/lib/store/authStore';

// import css from './SignUp.module.css';
// import { FormEvent } from 'react';

// export default function SignUp() {
//   const router = useRouter();

//   const setUser = useAuthStore((state) => state.setUser);

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const emailRef = e.currentTarget.elements.namedItem('email') as HTMLInputElement;
//     const passwordRef = e.currentTarget.elements.namedItem('password') as HTMLInputElement;
//     const values: CreateUserData = { email: emailRef.value, password: passwordRef.value };
//     try {
//       const user = await register(values);
//       setUser(user);

//       router.replace('/profile');
//     } catch (error) {
//       console.log('error', error);
//     }
//   };

//   return (
//     <main className={css.mainContent}>
//       <h1 className={css.formTitle}>Sign up</h1>
//       <form onSubmit={handleSubmit}>
//         <div className={css.formGroup}>
//           <label htmlFor="email">Email</label>
//           <input type="email" name="email" id="email" required className={css.input} />
//         </div>
//         <div className={css.formGroup}>
//           <label htmlFor="password">Password</label>
//           <input type="password" name="password" id="password" required className={css.input} />
//         </div>
//         <div className={css.actions}>
//           <button type="submit" className={css.submitButton}>
//             Register
//           </button>
//         </div>
//       </form>
//     </main>
//   );
// }
