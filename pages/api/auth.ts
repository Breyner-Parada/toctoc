// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import {client} from '../../utils/client';

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
 
  const user = req.body;

  await client.createIfNotExists(user)
    .then(() => res.status(200).json('Login Successful'))
    .catch(err => res.status(500).json(err));
  
}
