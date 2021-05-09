/** @module models */
/**
 * A human user in our system.
 */
export interface IUser {
  /** Unique ID. */
  id: string;
  /** First name. */
  firstName: string;
  /** Last name. */
  lastName: string;
  /** Email address. */
  email: string;
  /** Role. */
  role: EUserRole;
}
/**
 * Role assigned to the user.
 */
export declare enum EUserRole {
  /** Admin user. */
  Admin = 'admin',
  /** Student user */
  Student = 'student',
  /** Staff user */
  Staff = 'staff',
}

/** List of all possible values for any type-`EUserRole` variable. */
export declare const userRoles: EUserRole[];
