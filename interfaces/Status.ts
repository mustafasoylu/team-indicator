import { WorkStatus } from '@constants/Enums';

/** User status for setting up a card for the user. */
export interface Status {
  /** Slack status text */
  text: string;
  /** Slack status emoji */
  emoji: string;
  /** Work status set by using [[`slackStatus`]] variable. */
  status: WorkStatus;
}
