import { Card, CardHeader, CardContent, Typography } from '@mui/material';
import { AvatarMenu } from './AvatarMenu';
import { Emoji } from './Emoji';
import type { UserExtended } from 'custom-types';
import { ReactElement, PropsWithChildren } from 'react';

/**
 * The props type for [[`ProfileCard`]].
 */
export interface ProfileCardProps {
  user: UserExtended;
}

/**
 * A MUI card to show user information.
 * @category Component
 */
export const ProfileCard = ({
  user,
}: PropsWithChildren<ProfileCardProps>): ReactElement => {
  if (!user || !user.profile) return <></>;
  else {
    return (
      <Card
        sx={{ maxWidth: 345, minWidth: 230 }}
        key={user.id}
        style={{ height: '100%' }}
      >
        <CardHeader
          avatar={
            <AvatarMenu
              username={user.profile.display_name ?? 'X'}
              imageURL={user.profile.image_32}
              status={user.status}
              isInAppBar={false}
            />
          }
          title={user.profile.display_name}
          subheader={user.real_name}
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <strong>Status:</strong> {user.profile.status_text}
            {user.profile.status_emoji && user.profile.status_emoji !== '' ? (
              <Emoji text={user.profile.status_emoji} key={user.id} />
            ) : null}
            {user.updated ? (
              <>
                <br />
                <strong>Last updated:</strong>
                <br />
                {`${new Date(user.updated * 1000).toLocaleString('en-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour12: false,
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                })}`}
              </>
            ) : null}
          </Typography>
        </CardContent>
      </Card>
    );
  }
};
