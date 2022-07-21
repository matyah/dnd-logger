import axios, { AxiosError } from 'axios';
import { GetServerSidePropsContext, NextPageContext } from 'next';
import { buildClient } from './build-client';
import { Character } from './models/Character';

export const getCharacters = async (
  context: GetServerSidePropsContext | NextPageContext
) => {
  const client = buildClient(context);

  try {
    const { data } = await client.get<Character[]>('/api/characters');
    if (data && data.length) {
      return data;
    }

    return [];
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error('GET:Characters', err.message);
    }
    return [];
  }
};
