import { useState, useEffect, ReactElement } from 'react';
import axios from 'axios';

import { useSession, signIn } from 'next-auth/react';
import { LoadingSpinner } from '@components/LoadingSpinner';
import { Layout } from '@components/Layout';
import { ProfileCards } from '@components/ProfileCards';
import { ProfileExtended } from 'custom-types';
import { WorkStatus } from '@constants/Enums';
import { TextField, FormControl, Autocomplete } from '@mui/material';

import { UsersConversationsResponse } from '@slack/web-api';
import { useRouter } from 'next/router';

/**
 * Index Page
 * @category Page
 */
export default function IndexPage(): ReactElement {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<ProfileExtended>({
    status: WorkStatus.Away,
    status_text: '',
    status_emoji: '',
  });
  const [users, setUsers] = useState<any[]>([]);
  const [channels, setChannels] = useState<any[]>([]);
  const [channel, setChannel] = useState<UsersConversationsResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      Promise.all([
        axios.get('/api/slack/profile/get'),
        axios.get('/api/slack/channels'),
      ])
        .then(function (values) {
          setUser(values[0].data);
          setChannels(values[1].data);
          if (session && session.user.defaultChannel) {
            for (let i = 0; i < values[1].data.length; i++) {
              if (values[1].data[i].name === session.user.defaultChannel) {
                setChannel(values[1].data[i]);
                axios
                  .get('/api/slack/channels/' + values[1].data[i].id)
                  .then((res) => {
                    //get user info
                    const ids = res.data;

                    Promise.all(
                      ids.map((id: string) =>
                        axios.get('/api/slack/users/' + id)
                      )
                    ).then((values) => {
                      let result = values.map((value) => value.data);
                      result = result.filter((user) => user);
                      setUsers(result);
                    });
                  });
                setIsLoading(false);
              }
            }
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setUser({
            status: WorkStatus.Away,
            status_text: '',
            status_emoji: '',
          });
          setChannels([]);
          setIsLoading(false);
        });
    } else if (status === 'loading') setIsLoading(true);
    else router.push('/info');
    let interval = setInterval(() => refreshComponents(), 10000);

    return () => clearInterval(interval);
  }, [status]);

  const handleChangeChannels = (event, values) => {
    setChannel(values);
    // get user list in channel
    axios.get('/api/slack/channels/' + values.id).then((res) => {
      //get user info
      const ids = res.data;

      Promise.all(
        ids.map((id: string) => axios.get('/api/slack/users/' + id))
      ).then((values) => {
        let result = values.map((value) => value.data);
        result = result.filter((user) => user);
        setUsers(result);
      });
    });
  };

  const getChannelNames = (): string[] => {
    let channelNames: string[] = [];
    if (channels.length > 0) {
      for (let i = 0; i < channels.length; i++) {
        if (channels[i]) {
          channelNames.push(channels[i].name);
        }
      }
    }
    return channelNames;
  };

  const refreshChannel = (): void => {
    if (channel) {
      axios.get('/api/slack/channels/' + channel.id).then((res) => {
        //get user info
        const ids = res.data;

        Promise.all(
          ids.map((id: string) => axios.get('/api/slack/users/' + id))
        ).then((values) => {
          let result = values.map((value) => value.data);
          result = result.filter((user) => user);
          setUsers(result);
        });
      });
    }
  };

  const refreshUser = (): void => {
    axios.get('/api/slack/profile/get').then((res) => {
      setUser(res.data);
    });
  };

  const refreshComponents = (): void => {
    refreshChannel();
    refreshUser();
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <Layout
      username={user.display_name ?? ''}
      imageURL={user.image_32}
      status={user.status}
      statusText={user.status_text ?? ''}
      channels={getChannelNames()}
      refreshComponents={refreshComponents}
    >
      <FormControl fullWidth margin="normal">
        <Autocomplete
          onChange={handleChangeChannels}
          id="channels"
          options={channels ?? []}
          disableClearable
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => <TextField {...params} label="Channels" />}
          value={channel}
        />
      </FormControl>
      {channel ? (
        <>
          <h3>Channel {channel.name} residents</h3>
          {users.length > 0 && <ProfileCards users={users} />}
        </>
      ) : (
        <></>
      )}
    </Layout>
  );
}
