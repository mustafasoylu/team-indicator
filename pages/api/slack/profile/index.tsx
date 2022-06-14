import { WebClient } from '@slack/web-api';
import { NextApiRequest, NextApiResponse } from 'next';

import { getSlackToken } from '@utils/dbUtils';

import { ProfileExtended } from 'custom-types';
import { WorkStatus } from '@constants/Enums';
import { slackStatus } from '@constants/Variables';

// Initialize
const web = new WebClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    await getRequest(req, res);
  }
};

const getRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = await getSlackToken(req);

    if (token) {
      const profile = await web.users.profile.get({ token });
      if (!profile.profile) res.status(401).end();

      let status = WorkStatus.Away;
      for (let i = 0; i < slackStatus.length; i++) {
        if (
          profile.profile &&
          profile.profile.status_text === slackStatus[i].text
        ) {
          status = slackStatus[i].status;
          break;
        }
      }

      const profileExtended: ProfileExtended = {
        ...profile.profile,
        status: status,
      };
      res.status(200).json(profileExtended);
    } else res.status(401).end();
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};
