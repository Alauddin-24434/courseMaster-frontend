"use client";

import { useParams } from "next/navigation";
import { useGetCourseByIdQuery } from "@/redux/features/course/courseAPi";
import CoursePlayer from "@/components/CoursePlayer";
import { ICourse } from "@/interfaces/course.interface";

export default function CoursePlayerPage() {
  const params = useParams();
  const courseId = params.id as string;

  const { data, isLoading, isError } = useGetCourseByIdQuery(courseId);
  const course: ICourse | undefined = data?.data; // ✅ type-safe

  if (isLoading) return <p>Loading...</p>;
  if (isError || !course) return <p>Course not found</p>;

  return <CoursePlayer course={course} />;
}
// 