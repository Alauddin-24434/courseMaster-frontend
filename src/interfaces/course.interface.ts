// interfaces/course.interface.ts
export interface ICourse {
  _id: string;
  title: string;
  description?: string;
  thumbnail: string;
  previewVideo: string;
  price: number;
  category: string;
  tags?: string[];
  instructor: string;
  whatYouWillLearn?: string[];
  courseIncludes?: string[];
  isPublished?: boolean;
}

// Wrapper type for API responses
export interface ICourseResponse {
  status: "success" | "error";
  data: ICourse[];
}
