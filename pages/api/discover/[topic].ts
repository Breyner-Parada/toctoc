import type { NextApiRequest, NextApiResponse } from 'next';
import {client} from '../../../utils/client';
import { topicPostsQuery } from '../../../utils/queries';

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { topic } = req.query;
    if (topic) {
      const videosTopic = topicPostsQuery(topic);
      const videos = await client.fetch(videosTopic);
      res.status(200).json(videos);
    } else {
      res.status(400).json({ message: 'Invalid request' });
    }
  }
}