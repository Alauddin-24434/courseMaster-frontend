
export interface IUser {
  _id?: string;
  name: string;
  email: string;
  bio?: string | null;
  password: string;
  role: "student" | "instructor" | "admin";
  enrolledCourses: string[];
  avatar?: string | null;
  createdAt: Date;
  updatedAt: Date;
}