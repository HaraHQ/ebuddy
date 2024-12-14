export interface User {
  u: string; // User name, mandatory
  p: string; // User password, mandatory
  av?: string; // User avatar URL, optional
  createdAt?: number; // Timestamp in milliseconds
  updatedAt?: number; // Timestamp in milliseconds
}