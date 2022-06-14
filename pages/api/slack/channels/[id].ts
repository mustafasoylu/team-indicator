import { WebClient } from '@slack/web-api';
import { NextApiRequest, NextApiResponse } from 'next';

import { getSlackToken } from '@utils/dbUtils';

// Initialize
const web = new WebClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = await getSlackToken(req);
    const { id } = req.query;

    if (token) {
      const members = await web.conversations.members({
        token,
        channel: id as string,
      });
      res.status(200).json(members.members);
    } else res.status(401).end();
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};
