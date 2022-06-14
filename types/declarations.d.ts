/** Set custom types */
declare module 'custom-types' {
  /** Profile type from slack */
  export { default as Profile } from './Profile';
  /** An interface that extends [[`Profile`]] and adds a status property which is a [[`WorkStatus`]] enum. */
  export { default as ProfileExtended } from './ProfileExtended';
  /** User type from slack */
  export { default as User } from './User';
  /** An interface that extends [[`User`]] and adds a status property which is a [[`WorkStatus`]] enum. */
  export { default as UserExtended } from './UserExtended';
}
