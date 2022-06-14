import { WebClient } from '@slack/web-api';
import { NextApiRequest, NextApiResponse } from 'next';

import { getSlackToken } from '@utils/dbUtils';

// Initialize
const web = new WebClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = await getSlackToken(req);

    if (token) {
      const members = await web.users.list({
        token,
      });
      res.status(200).json(members.members);
    } else res.status(401).end();
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};
