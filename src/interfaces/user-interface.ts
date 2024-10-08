import { Timestamp } from "firebase/firestore";

export interface IUser {
	uid: string;
  image?: string;
	firstName: string;
	lastName: string;
 	email: string;
	password?: string;
	confirmPassword?: string;
  createdAt?: Timestamp	
}