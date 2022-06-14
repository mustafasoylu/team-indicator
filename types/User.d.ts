import { UsersInfoResponse } from '@slack/web-api';

/** User type from slack */
type User = UsersInfoResponse['user'];

export default User;
