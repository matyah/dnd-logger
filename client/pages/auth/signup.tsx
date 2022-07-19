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
  confirmPassword: string;
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
      description={
        <>
          A web app to record your successes and failures. In addition to your
          character sheet, you should have an adventure logsheet. This sheet
          serves as a record of each session of play. Treat your logsheet as an
          extension of your character sheet; it is your official record of your
          character!
        </>
      }
      imgSrc="https://sportshub.cbsistatic.com/i/2021/08/09/5dc852d3-6315-4d03-95a3-54a4712a63a7/strixhaven-college-1276008.jpg"
    >
      <div className="text-center">
        <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">
          {brand}
        </h2>

        <p className="mt-3 text-gray-500 dark:text-gray-300">
          Sign up to start logging your amazing characters.
        </p>
      </div>

      <div className="mt-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="flex justify-between mb-2">
              <Label htmlFor="email">Email Address</Label>
            </div>
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
              {/* <a
                href="#"
                className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
              >
                Forgot password?
              </a> */}
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
            <div className="flex justify-between mb-2">
              <Label htmlFor="password">Confirm Password</Label>
            </div>

            <TextInput
              type="password"
              id="confirm"
              placeholder="Confirm Your Password"
              color={errors.confirmPassword ? 'failure' : 'gray'}
              helperText={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />
          </div>

          <div className="mt-6">
            <Button type="submit" disabled={!isValid}>
              Sign Up
            </Button>
          </div>
        </form>

        <p className="mt-6 text-sm text-center text-gray-400">
          You already have an account ?{' '}
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
