import { WebClient } from '@slack/web-api';
import { NextApiRequest, NextApiResponse } from 'next';

import { getSlackToken, setDefaultChannel } from '@utils/dbUtils';

// Initialize
const web = new WebClient();
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    await postRequest(req, res);
  }
};

const postRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = await getSlackToken(req);

    if (token) {
      if (req.body.defaultChannel) {
        await setDefaultChannel(req, req.body.defaultChannel);
      }
      if (req.body.status_text) {
        const profile = {
          status_text: req.body.status_text,
          status_emoji: req.body.status_emoji,
        };
        const response = await web.users.profile.set({
          token,
          profile: JSON.stringify(profile),
        });
        if (!response.ok) throw new Error(response.error);
      }
      res.status(200).end();
    } else res.status(401).end();
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};
