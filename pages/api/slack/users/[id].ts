import { WebClient } from '@slack/web-api';
import { NextApiRequest, NextApiResponse } from 'next';

import { getSlackToken } from '@utils/dbUtils';
import { UserExtended } from 'custom-types';
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
    const { id } = req.query;

    if (token) {
      const user = await web.users.info({
        token,
        user: id as string,
      });

      let status = WorkStatus.Away;
      for (let i = 0; i < slackStatus.length; i++) {
        if (
          user.user &&
          user.user.profile &&
          user.user.profile.status_text === slackStatus[i].text
        ) {
          status = slackStatus[i].status;
          break;
        }
      }

      const userExtended: UserExtended = {
        ...user.user,
        status: status,
      };
      res.status(200).json(userExtended);
    } else res.status(401).end();
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};
