import { ReactElement } from 'react';
import { Typography, Link } from '@mui/material';

/**
 * Copyright.
 * @category Component
 */
export function Copyright(): ReactElement {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ pt: 4 }}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://trajectory.jp">
        Mustafa Soylu
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
