import { yupResolver } from '@hookform/resolvers/yup';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Button } from '../../components/Button';
import { Label } from '../../components/FormControls/Label';
import { TextInput } from '../../components/FormControls/TextInput';
import { SignLayout } from '../../components/Layouts/SignLayout';
import { buildClient } from '../../lib/api/build-client';
import { User } from '../../lib/api/models/User';
import { signinSchema } from '../../lib/validator/signin';

interface SignInFormInput {
  email: string;
  password: string;
}

const Signin: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInFormInput>({
    resolver: yupResolver(signinSchema),
    mode: 'onChange',
  });

  const router = useRouter();

  const { mutate } = useMutation<User, unknown, SignInFormInput>(
    'user',
    async ({ email, password }: SignInFormInput) => {
      const { data } = await buildClient().post('/api/users/signin', {
        email,
        password,
      });

      return data;
    },
    {
      onSuccess: (data) => {
        if (data?.id) {
          router.push('/');
        }
      },
    }
  );

  const onSubmit: SubmitHandler<SignInFormInput> = (data) => mutate(data);

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
      imgSrc="https://static3.cbrimages.com/wordpress/wp-content/uploads/2020/10/DnD-tavern-scene.jpg"
    >
      <div className="text-center">
        <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">
          {brand}
        </h2>

        <p className="mt-3 text-gray-500 dark:text-gray-300">
          Sign in to access your characters logs.
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
              <Link href="#">
                <a className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">
                  Forgot password ?
                </a>
              </Link>
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
              Sign in
            </Button>
          </div>
        </form>

        <p className="mt-6 text-sm text-center text-gray-400">
          Don&apos;t aleady have an account ?{' '}
          <Link href="/auth/signup">
            <a className="text-blue-500 focus:outline-none focus:underline hover:underline">
              Sign Up
            </a>
          </Link>
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

export default Signin;
