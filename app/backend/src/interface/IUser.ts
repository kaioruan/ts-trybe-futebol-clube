interface IUser {
  id?: number;
  name?: string;
  email?: string;
  password: string;
  role?: string;
  // created_at: Date;
  // updated_at: Date;
}
export default IUser;