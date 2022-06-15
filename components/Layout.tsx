import { ReactElement, PropsWithChildren } from 'react';
import { WorkStatus } from '@constants/Enums';
import Head from 'next/head';
import { BackBone } from './BackBone';
import { Container, Grid, Paper } from '@mui/material';

/**
 * The props type for [[`Layout`]].
 */
export interface LayoutProps {
  children?: ReactElement[];
  username?: string;
  imageURL?: string | undefined;
  status?: WorkStatus;
  statusText?: string;
  channels?: string[];
  refreshComponents?: Function;
  avatar?: boolean;
}

/**
 * Main layout of pages.
 * @category Component
 */
export function Layout({
  children,
  username,
  imageURL,
  status,
  channels,
  statusText,
  refreshComponents,
  avatar = true,
}: PropsWithChildren<LayoutProps>): ReactElement {
  const mainComponent = (
    <>
      <Head>
        <title>Slack Team Indicator</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link rel="shortcut icon" href="/public/logo.svg" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {children}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );

  return (
    <BackBone
      username={username}
      mainComponent={mainComponent}
      imageURL={imageURL}
      status={status}
      channels={channels}
      statusText={statusText}
      refreshComponents={refreshComponents}
      avatar={avatar}
    />
  );
}
