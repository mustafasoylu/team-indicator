import { ReactElement } from 'react';
import { Layout } from '@components/Layout';
import { Box, Typography, Avatar, Button } from '@mui/material';
import { signIn } from 'next-auth/react';

/**
 * Info Page
 * @category Page
 */
export default function InfoPage(): ReactElement {
  return (
    <Layout avatar={false}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          color="inherit"
          noWrap
          fontWeight="fontWeightBold"
        >
          Team Indicator Slack App
        </Typography>
        <Avatar
          src="https://avatars.slack-edge.com/2022-06-06/3628799051204_26ca10d639cf4e5ad01a_512.jpg"
          alt="App Logo"
          variant="rounded"
          sx={{ width: 256, height: 256 }}
        />
      </Box>
      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column' }}>
        <Typography>
          Check the status of your channel members using a refreshing web page.
          Also, set a pre-defined status for easy handling of your and your
          teammates' status. <br /> <br />
          <strong>Next feature: </strong> Set an alarm for yourself to remember
          when lunch break ends or when you want to take a break from working.
        </Typography>
      </Box>
      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            component="h3"
            variant="h5"
            color="inherit"
            noWrap
            fontWeight="fontWeightBold"
          >
            Sign in with Slack
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              signIn(undefined, { callbackUrl: '/' });
            }}
            sx={{ mt: 1 }}
          >
            Sign In
          </Button>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            component="h3"
            variant="h5"
            color="inherit"
            noWrap
            fontWeight="fontWeightBold"
          >
            Add to your Slack Workspace
          </Typography>
          <a href="https://slack.com/oauth/v2/authorize?client_id=3209791648503.3224504926738&scope=&user_scope=channels:read,usergroups:read,users.profile:read,users.profile:write,users:read,users:write,groups:read">
            <img
              alt="Add to Slack"
              height="40"
              width="139"
              src="https://platform.slack-edge.com/img/add_to_slack.png"
              srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
            />
          </a>
        </Box>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography fontWeight="fontWeightBold">Support</Typography>
        Please <a href="mailto:mohkargan@gmail.com">Email Us</a> if you have any
        questions.
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography fontWeight="fontWeightBold">Privacy Policy</Typography>
        We only keep your basic slack account information for authentication and
        data retrieval.
      </Box>
    </Layout>
  );
}
