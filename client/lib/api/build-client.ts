import axios, { Axios, AxiosRequestHeaders } from 'axios';
import { GetServerSidePropsContext, NextPageContext } from 'next';

export const buildClient = (ctx?: GetServerSidePropsContext) => {
  if (typeof window === 'undefined') {
    return axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: ctx?.req?.headers as AxiosRequestHeaders,
    });
  } else {
    return axios.create({
      baseURL: 'https://dungeon-logger.dev',
    });
  }
};

export type AppAxiosInstance = ReturnType<typeof buildClient>;
