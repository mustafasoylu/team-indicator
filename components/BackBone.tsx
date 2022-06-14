import { ReactElement, PropsWithChildren } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  CssBaseline,
  Box,
  Toolbar,
  Typography,
  Container,
  Avatar,
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { Copyright } from './Copyright';
import { AvatarMenu } from './AvatarMenu';
import { WorkStatus } from '@constants/Enums';
import { purple } from '@mui/material/colors';

const mdTheme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: purple[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#474350',
    },
  },
});

/**
 * The props type for [[`BackBone`]].
 */
export interface BackBoneProps {
  mainComponent: ReactElement;
  username: string;
  imageURL: string | undefined;
  status: WorkStatus;
  statusText: string;
  channels: string[];
  refreshComponents: Function;
}

/**
 * Back bone of the page layout.
 * @category Component
 */
export function BackBone({
  mainComponent,
  username,
  imageURL,
  status,
  channels,
  statusText,
  refreshComponents,
}: PropsWithChildren<BackBoneProps>): ReactElement {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <MuiAppBar position="absolute" color="secondary">
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Avatar
                src="https://avatars.slack-edge.com/2022-06-06/3628799051204_26ca10d639cf4e5ad01a_512.jpg"
                // src={logo}
                alt="App Logo"
                variant="rounded"
                sx={{ width: 64, height: 64 }}
              />
            </Box>
            <Typography
              component="h1"
              variant="h5"
              color="inherit"
              noWrap
              fontWeight="fontWeightBold"
              sx={{ flexGrow: 1 }}
            >
              Team Indicator
            </Typography>
            <AvatarMenu
              username={username}
              imageURL={imageURL}
              status={status}
              statusText={statusText}
              isInAppBar={true}
              channels={channels}
              refreshComponents={refreshComponents}
            />
          </Toolbar>
        </MuiAppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {mainComponent}
            <Copyright />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
