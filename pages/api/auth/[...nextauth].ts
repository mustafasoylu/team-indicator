import NextAuth from 'next-auth';
import SlackProvider from 'next-auth/providers/slack';
import config from '@utils/config';
import SequelizeAdapter, { models } from '@next-auth/sequelize-adapter';
import sequelize from '@utils/sequelize';
import { DataTypes } from 'sequelize';
import { NextApiRequest, NextApiResponse } from 'next';

// dont forget to change accounts.id_token length to 2000
// sequelize.sync({ force: true });

const options = {
  providers: [
    SlackProvider({
      clientId: config.SLACK_CLIENT_ID,
      clientSecret: config.SLACK_CLIENT_SECRET,
      idToken: true,
    }),
  ],
  // Optional SQL or MongoDB database to persist users
  // adapter: SequelizeAdapter(sequelize),
  adapter: SequelizeAdapter(sequelize, {
    models: {
      User: sequelize.define('user', {
        ...models.User,
        defaultChannel: DataTypes.STRING,
      }),
    },
  }),
  callbacks: {
    async session({ session, token, user }) {
      session.user = user;
      return session;
    },
  },
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
