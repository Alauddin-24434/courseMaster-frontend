// src/interfaces/course.interface.ts

export interface ILesson {
  _id: string;
  title: string;
  videoUrl: string;
  duration: number;
  assignment?: any | null;
  quiz?: any | null;
}

export interface IModule {
  _id: string;
  title: string;
  lessons: ILesson[];
}

export interface IStudentProgress {
  _id: string;
  studentId: string;
  completedLessons: string[]; // lesson IDs
  enrolledAt: string; // ISO date string
  lastActivity: string; // ISO date string
}

export interface IBatch {
  title: string;
  startDate: string;
  endDate?: string | null;
}

export interface ICourse {
  _id: string;
  title: string;
  description?: string;
  thumbnail: string;
  previewVideo: string;
  price: number;
  category: string;
  instructor: string;
  modules: IModule[];
  enrollCounts: any[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  batch: IBatch;
  students: IStudentProgress[];
}

// Wrapper type for API response
export interface ICourseResponse {
  status: "success" | "error";
  data: ICourse;
}
