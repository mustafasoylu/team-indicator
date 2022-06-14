import Profile from './Profile';
import { WorkStatus } from '@constants/Enums';

/** An interface that extends [[`Profile`]] and adds a status property which is a [[`WorkStatus`]] enum. */
type ProfileExtended = Profile & { status: WorkStatus };

export default ProfileExtended;
