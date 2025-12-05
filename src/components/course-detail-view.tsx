"use client";

import { useDispatch, useSelector } from "react-redux";
import { Star, Users, Clock, ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { RootState } from "@/redux/store";

import { addToCart } from "@/redux/slices/cartSlice";
import {
  useEnrollCourseMutation,
  useGetCourseByIdQuery,
} from "@/redux/features/course/courseAPi";
import { useRouter } from "next/navigation";

export function CourseDetailView({ courseId }: { courseId: string }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.cmAuth);
 const [enrollCourse, { isLoading: enrollLoading }] = useEnrollCourseMutation();

  const router = useRouter();
  // RTK Query
  const { data, isLoading, isError } = useGetCourseByIdQuery(courseId);
  const course = data?.data;
 // Check if user already enrolled


  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-lg text-muted-foreground">Loading course...</p>
      </div>
    );
  }

  if (isError || !course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-lg text-muted-foreground">Course not found</p>
      </div>
    );
  }
const isEnrolled = user && (course?.enrollCounts || []).includes(user._id);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        courseId: course._id,
        title: course.title,
        price: course.price,
      })
    );
  };

  const handleEnroll = async () => {
    try {
      const res = await enrollCourse(course._id).unwrap();
      alert(res.message);
    } catch (err) {
      console.error(err);
      alert("Enrollment failed");
    }
  };

  return (
    <div className="container py-16 mx-auto px-4 sm:px-6 lg:px-8">
      <Link
        href="/courses"
        className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Courses
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero Section with Preview Video */}
          <div className="space-y-4">
            {course.previewVideo ? (
              <iframe
                src={course.previewVideo}
                title={course.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-[200px] md:h-[300px] lg:h-[350px] object-cover rounded-lg"
              ></iframe>
            ) : (
              <img
                src={course.thumbnail || "/placeholder.svg"}
                alt={course.title}
                className="w-full h-96 object-cover rounded-lg"
              />
            )}

            <div>
              <p className="text-sm font-semibold text-accent uppercase mb-2">
                {course.category}
              </p>
              <h1 className="text-5xl font-serif font-bold mb-4">
                {course.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-2">
                {course.description}
              </p>

              {/* Batch Details */}
              {course.batch && (
                <div className="text-sm text-muted-foreground">
                  <p>
                    <strong>Batch:</strong> {course.batch.title}
                  </p>
                  <p>
                    <strong>Start Date:</strong>{" "}
                    {course.batch.startDate
                      ? new Date(course.batch.startDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                  <p>
                    <strong>End Date:</strong>{" "}
                    {course.batch.endDate
                      ? new Date(course.batch.endDate).toLocaleDateString()
                      : "Ongoing"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Syllabus */}
          {course.modules && course.modules.length > 0 && (
            <div className="mt-8">
              <h2 className="text-3xl font-serif font-bold mb-6">
                Course Syllabus
              </h2>
              <div className="space-y-3">
                {course.modules.map((module: any) => (
                  <div
                    key={module._id || module.id}
                    className="p-4 bg-card rounded-lg border border-border"
                  >
                    <h4 className="font-semibold text-lg mb-2">
                      {module.title}
                    </h4>
                    {module.lessons && module.lessons.length > 0 && (
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        {module.lessons.map((lesson: any) => (
                          <li key={lesson._id || lesson.id}>
                            {lesson.title} - {lesson.duration} mins
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Info Bar */}
          <div className="flex flex-wrap gap-6 py-6 border-y border-border">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{course.rating}</span>
              <span className="text-muted-foreground">
                ({(course.students / 1000).toFixed(1)}K reviews)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span className="font-semibold">
                {(course.students / 1000).toFixed(0)}K+ students
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">{course.duration}</span>
            </div>
          </div>

          {/* Instructor */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="font-serif font-bold text-xl mb-2">Instructor</h3>
            <p className="text-lg font-medium text-primary">
              {course.instructor}
            </p>
            <p className="text-muted-foreground mt-2">
              Expert instructor with 10+ years of industry experience
            </p>
          </div>

          {/* Syllabus */}
          {course.modules && course.modules.length > 0 && (
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6">
                Course Syllabus
              </h2>
              <div className="space-y-3">
                {course.modules.map((module: any) => (
                  <div
                    key={module._id || module.id}
                    className="p-4 bg-card rounded-lg border border-border flex justify-between items-center"
                  >
                    <h4 className="font-semibold">{module.title}</h4>
                    <span className="text-sm text-muted-foreground">
                      {module.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {course.tags && course.tags.length > 0 && (
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6">
                What You'll Learn
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {course.tags.map((skill: string) => (
                  <div
                    key={skill}
                    className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border"
                  >
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 bg-card rounded-lg border border-border p-6 space-y-4">
            <img
              src={course.thumbnail || "/placeholder.svg"}
              alt={course.title}
              className="w-full h-40 object-cover rounded-lg"
            />

            <div className="space-y-2">
              <p className="text-3xl font-bold text-primary">${course.price}</p>
              <p className="text-sm text-muted-foreground">
                30-day money-back guarantee
              </p>
            </div>
           {/* Enroll Button */}
        {isAuthenticated ? (
  isEnrolled ? (
    <Link
      href={`/course/${course._id}/player`}
      className="w-full block py-3 rounded-lg font-semibold text-center bg-green-600 text-white hover:opacity-90 transition"
    >
      Continue Course
    </Link>
  ) : (
    <button
      onClick={handleEnroll}
      disabled={enrollLoading}
      className="w-full py-3 rounded-lg font-semibold transition bg-primary text-primary-foreground hover:opacity-90"
    >
      {enrollLoading ? "Enrolling..." : "Enroll Now"}
    </button>
  )
) : (
  <Link
    href="/login"
    className="block w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-center hover:opacity-90 transition"
  >
    Sign In to Enroll
  </Link>
)}

            {/* <button className="w-full py-3 border border-border rounded-lg font-semibold hover:bg-muted transition">
              Add to Wishlist
            </button> */}

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>Self-paced learning</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span>Lifetime access</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-muted-foreground" />
                <span>Certificate of completion</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
