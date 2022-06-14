import { useState, MouseEvent, ReactElement, PropsWithChildren } from 'react';
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  IconButton,
  Tooltip,
  Badge,
} from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { SettingsModal } from './SettingsModal';
import { deepOrange } from '@mui/material/colors';
import { signOut } from 'next-auth/react';
import { styled } from '@mui/material/styles';
import { WorkStatus } from '@constants/Enums';

const badgeColors = {
  [WorkStatus.Working]: '#44b700',
  [WorkStatus.Resting]: '#ff8c00',
  [WorkStatus.Away]: '#e60000',
};
const StyledBadge = styled(Badge, {
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status: WorkStatus }>(({ theme, status }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: badgeColors[status],
    color: badgeColors[status],
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

/**
 * The props type for [[`AvatarMenu`]].
 */
export interface AvatarMenuProps {
  username: string;
  imageURL: string | undefined;
  status: WorkStatus;
  statusText: string;
  isInAppBar: boolean;
  channels?: string[];
  refreshComponents: Function;
}

/**
 * Avatar menu on the top right of the page and cards.
 * @category Component
 */
export function AvatarMenu({
  username,
  imageURL,
  status,
  isInAppBar = false,
  channels,
  statusText,
  refreshComponents,
}: PropsWithChildren<AvatarMenuProps>): ReactElement {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const open = Boolean(anchorEl);

  let modalClosed: boolean = false;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenModal(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    modalClosed = true;
  };

  const handleSignOut = (e: MouseEvent) => {
    e.preventDefault();
    signOut();
  };

  const handleModal = (e: MouseEvent) => {
    e.preventDefault();
    if (!modalClosed) {
      setOpenModal(true);
      modalClosed = false;
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
              status={status}
            >
              {imageURL ? (
                <Avatar alt="Slack Profile" src={imageURL} />
              ) : (
                <Avatar
                  sx={{ width: 32, height: 32, bgcolor: deepOrange[500] }}
                >
                  {username}
                </Avatar>
              )}
            </StyledBadge>
          </IconButton>
        </Tooltip>
      </Box>
      {isInAppBar && (
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleSignOut}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
          <MenuItem onClick={handleModal}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            Set Status
            <SettingsModal
              open={openModal}
              onClose={handleCloseModal}
              channels={channels ?? []}
              statusText={statusText}
              refreshComponents={refreshComponents}
            />
          </MenuItem>
        </Menu>
      )}
    </>
  );
}
