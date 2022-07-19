import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../components/Button';
import { Label } from '../../components/FormControls/Label';
import { TextInput } from '../../components/FormControls/TextInput';
import { signupSchema } from '../../lib/validator/singup';
import { useMutation } from 'react-query';
import { User } from '../../lib/api/models/User';
import { buildClient } from '../../lib/api/build-client';
import { useRouter } from 'next/router';
import { SignLayout } from '../../components/Layouts/SignLayout';

interface SignUpFormInput {
  email: string;
  password: string;
}

const Signup: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpFormInput>({
    resolver: yupResolver(signupSchema),
    mode: 'onChange',
  });

  const router = useRouter();

  const { mutate } = useMutation<User, unknown, SignUpFormInput>(
    'user',
    async ({ email, password }: SignUpFormInput) => {
      const { data } = await buildClient().post('/api/users/signup', {
        email,
        password,
      });

      return data;
    },
    {
      onSuccess: (data) => {
        if (data?.id) router.push('/');
      },
    }
  );

  const onSubmit: SubmitHandler<SignUpFormInput> = (data) => mutate(data);

  const brand = 'Dungeon Logger';

  return (
    <SignLayout
      brand={brand}
      description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
    autem ipsa, nulla laboriosam dolores, repellendus perferendis
    libero suscipit nam temporibus molestiae"
      imgSrc="https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    >
      <div className="text-center">
        <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">
          {brand}
        </h2>

        <p className="mt-3 text-gray-500 dark:text-gray-300">
          Sign in to access your account
        </p>
      </div>

      <div className="mt-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <TextInput
              type="email"
              id="email"
              placeholder="example@example.com"
              addon="@"
              color={errors.email ? 'failure' : 'gray'}
              helperText={errors.email?.message}
              {...register('email')}
            />
          </div>

          <div className="mt-6">
            <div className="flex justify-between mb-2">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <TextInput
              type="password"
              id="password"
              placeholder="Your Password"
              color={errors.password ? 'failure' : 'gray'}
              helperText={errors.password?.message}
              {...register('password')}
            />
          </div>

          <div className="mt-6">
            <Button type="submit" disabled={!isValid}>
              Sign Up
            </Button>
          </div>
        </form>

        <p className="mt-6 text-sm text-center text-gray-400">
          You already have an account ?
          <a
            href="#"
            className="text-blue-500 focus:outline-none focus:underline hover:underline"
          >
            Sign In
          </a>
          .
        </p>
      </div>
    </SignLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {
    data: { currentUser },
  } = await buildClient(ctx).get<{ currentUser: User }>(
    '/api/users/currentuser'
  );

  if (currentUser?.id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Signup;
