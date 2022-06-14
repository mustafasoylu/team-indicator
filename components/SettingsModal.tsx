import {
  SyntheticEvent,
  useState,
  MouseEvent,
  ReactElement,
  PropsWithChildren,
  useEffect,
} from 'react';
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Typography,
  Autocomplete,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import { Status } from '@interfaces/Status';
import { WorkStatus } from '@constants/Enums';
import { slackStatus } from '@constants/Variables';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { getSession } from 'next-auth/react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

/**
 * The props type for [[`SettingsModal`]].
 */
export interface SettingsModalProps {
  open: boolean;
  onClose: Function;
  channels: string[];
  statusText?: string;
  refreshComponents?: Function;
}

/**
 * Open a windows for user settings.
 * @category Component
 */
export function SettingsModal({
  open,
  onClose,
  channels,
  statusText,
  refreshComponents,
}: PropsWithChildren<SettingsModalProps>): ReactElement {
  const [status, setStatus] = useState<Status>({
    text: '',
    emoji: '',
    status: WorkStatus.Away,
  });
  const [statusChanged, setStatusChanged] = useState<boolean>(false);
  const [channel, setChannel] = useState<string>('');
  const [channelChanged, setChannelChanged] = useState<boolean>(false);

  useEffect(() => {
    setStatus(getStatus(statusText ?? ''));
    getSession().then((session) => {
      setChannel(session ? session.user.defaultChannel : '');
    });
  }, [statusText]);

  const getStatus = (text: string): Status => {
    let status = slackStatus.find((status: Status) => status.text === text);
    if (!status) {
      status = {
        text: '',
        emoji: '',
        status: WorkStatus.Away,
      };
    }
    return status;
  };

  const handleChangeSlackStatus = (event: SyntheticEvent, values: Status) => {
    event.preventDefault();
    if (values) {
      setStatus({
        text: values.text,
        emoji: values.emoji,
        status: values.status,
      });
    } else {
      setStatus({ text: '', emoji: '', status: WorkStatus.Away });
    }
    setStatusChanged(true);
  };

  const handleChangeChannel = (event: SyntheticEvent, value: string) => {
    event.preventDefault();
    if (value) {
      setChannel(value);
    } else {
      setChannel('');
    }
    setChannelChanged(true);
  };

  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    let requestBody: {
      status_text?: string;
      status_emoji?: string;
      defaultChannel?: string;
    } = {};
    if (statusChanged) {
      requestBody.status_text = status.text;
      requestBody.status_emoji = status.emoji;
    }
    if (channelChanged) {
      requestBody.defaultChannel = channel;
    }

    // Set the status
    axios.post('/api/slack/profile/set', requestBody).then(() => {
      // close the modal
      handleClose();
      if (refreshComponents) refreshComponents();
    });
  };

  const handleClose = () => {
    onClose();
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              User Settings
              <IconButton
                color="inherit"
                aria-label="close model"
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
            </Typography>
            <Autocomplete
              disablePortal
              id="combo-box-status"
              options={slackStatus}
              sx={{ width: 300 }}
              getOptionLabel={(option) => option.text}
              renderInput={(params) => <TextField {...params} label="Status" />}
              onChange={handleChangeSlackStatus}
              isOptionEqualToValue={(option, value) =>
                option.text === value.text
              }
              value={status}
            />

            <Autocomplete
              disablePortal
              id="combo-box-channels"
              options={channels}
              sx={{ width: 300, mt: 1 }}
              renderInput={(params) => (
                <TextField {...params} label="Default Channel" />
              )}
              onChange={handleChangeChannel}
              value={channel}
            />
            <Button
              id="updateButton"
              variant="contained"
              onClick={handleClick}
              sx={{ mt: 1 }}
              disabled={!statusChanged && !channelChanged}
            >
              Update
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
