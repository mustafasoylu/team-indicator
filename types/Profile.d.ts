import { UsersProfileGetResponse } from '@slack/web-api';

/** Profile type from slack */
type Profile = UsersProfileGetResponse['profile'];

export default Profile;
