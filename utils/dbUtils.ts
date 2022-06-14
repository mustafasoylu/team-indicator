import { getSession } from 'next-auth/react';
import sequelize from './sequelize';
import { NextApiRequest } from 'next';

/**
 * Get slack user token from DB.
 * @param req request object
 * @returns slack user token
 */
export async function getSlackToken(req: NextApiRequest): Promise<string> {
  try {
    const session = await getSession({ req });

    if (!session) {
      return '';
    }
    const account = await sequelize.models.account.findOne({
      where: { user_id: session.user.id, provider: 'slack' },
    });

    //@ts-ignore
    const token = account.access_token;
    return token;
  } catch (err) {
    console.error(err);
    return '';
  }
}

/**
 * Set default channel name
 * @param req request object
 * @param defaultChannel channel name
 * @returns whether the data is set or not
 */
export async function setDefaultChannel(
  req: NextApiRequest,
  defaultChannel: string
) {
  try {
    const session = await getSession({ req });

    if (!session) {
      return false;
    }
    const user = await sequelize.models.user.findOne({
      where: { id: session.user.id },
    });

    if (!user) return false;
    //@ts-ignore
    user.defaultChannel = defaultChannel;
    await user.save();
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
