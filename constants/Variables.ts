import { Status } from '@interfaces/Status';
import { WorkStatus } from '@constants/Enums';

/** A list of possible user status to set as slack status. */
export const slackStatus: Status[] = [
  { text: 'Working', emoji: ':briefcase:', status: WorkStatus.Working },
  {
    text: 'With Customer',
    emoji: ':busts_in_silhouette:',
    status: WorkStatus.Working,
  },
  { text: 'Commuting', emoji: ':taxi:', status: WorkStatus.Working },
  { text: 'Coding', emoji: ':computer:', status: WorkStatus.Working },
  { text: 'In a Call', emoji: ':slack_call:', status: WorkStatus.Working },
  { text: 'At Lunch', emoji: ':ramen:', status: WorkStatus.Resting },
  { text: 'At Breakfast', emoji: ':rice_ball:', status: WorkStatus.Resting },
  { text: 'At Dinner', emoji: ':curry:', status: WorkStatus.Resting },
  { text: 'Taking a stroll', emoji: ':walking:', status: WorkStatus.Resting },
  { text: 'Out of work', emoji: ':no_good:', status: WorkStatus.Away },
];
