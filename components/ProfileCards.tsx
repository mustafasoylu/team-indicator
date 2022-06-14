import { Grid } from '@mui/material';
import { ProfileCard } from './ProfileCard';
import { UserExtended } from 'custom-types';
import { ReactElement, PropsWithChildren } from 'react';

/**
 * The props type for [[`ProfileCards`]].
 */
export interface ProfileCardsProps {
  users: UserExtended[];
}

/**
 * Collection of MUI cards to show channel users.
 * @category Component
 */
export const ProfileCards = ({
  users = [],
}: PropsWithChildren<ProfileCardsProps>): ReactElement => {
  const listItems = users.map((user) => {
    return user ? (
      <Grid item key={user.id}>
        <ProfileCard user={user} />
      </Grid>
    ) : null;
  });
  return (
    <Grid container spacing={2}>
      {listItems}
    </Grid>
  );
};
