/** Enum for the different types of work status. This is used to determine the the badge color for the user. */
export enum WorkStatus {
  /** The user is currently working, showed by green badge. */
  Working,
  /** The user is currently resting, showed by orange badge. */
  Resting,
  /** The user is currently out of work, showed by red badge. Default is status is empty. */
  Away,
}

/** Enum for Emoji vendors */
export enum EmojiVendor {
  Apple = 'apple',
  Google = 'google',
  Twitter = 'twitter',
  Facebook = 'facebook',
}
