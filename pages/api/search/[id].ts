import type { NextApiRequest, NextApiResponse } from 'next';
import {client} from '../../../utils/client';
import { searchPostsQuery } from '../../../utils/queries';

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query;
    if (!id) {
      res.status(400).json({ message: 'Missing id' });
      return;
    }
    const videosQuery = searchPostsQuery(id);

    const videos = await client.fetch(videosQuery);
    
    res.status(200).json(videos);
  }

}
