import { WebClient } from '@slack/web-api';
import { NextApiRequest, NextApiResponse } from 'next';

import { getSlackToken } from '@utils/dbUtils';

// Initialize
const web = new WebClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = await getSlackToken(req);

    if (token) {
      const channels = await web.users.conversations({
        token,
        types: 'public_channel,private_channel',
      });
      res.status(200).json(channels.channels);
    } else res.status(401).end();
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};
