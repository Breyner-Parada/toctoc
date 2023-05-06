import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: '1l363yi6',
  dataset: 'production',
  apiVersion: '2022-11-24',
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
