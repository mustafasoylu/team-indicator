import User from './User';
import { WorkStatus } from '@constants/Enums';

/** An interface that extends [[`User`]] and adds a status property which is a [[`WorkStatus`]] enum. */
type UserExtended = User & { status: WorkStatus };

export default UserExtended;
