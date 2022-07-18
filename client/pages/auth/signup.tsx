import { NextPage } from 'next';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { buildClient } from '../../api/build-client';
import { User } from '../../api/models/User';

const Signup: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { data, mutate, error } = useMutation<User>('user', async () => {
    const { data } = await buildClient().post('/api/users/signup', {
      email,
      password,
    });

    return data;
  });

  console.log(data);

  return (
    <div>
      <input
        placeholder="email"
        value={email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="password"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit" onClick={() => mutate()}>
        submit
      </button>
    </div>
  );
};

export default Signup;
