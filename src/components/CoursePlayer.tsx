"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { markLessonCompleted } from "@/redux/slices/coursesSlice";

export default function CoursePlayer({ course }: { course: any }) {
  const dispatch = useDispatch<AppDispatch>();
  const completedLessons = useSelector(
    (state: RootState) => state.progress.completedLessons
  );

  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  const module = course.modules[currentModuleIndex];
  const lesson = module.lessons?.[currentLessonIndex];

  // Next Lesson
// handleNextLesson function
const handleNextLesson = () => {
  if (!module.lessons || module.lessons.length === 0) return;

  // ✅ Mark current lesson as completed
  if (!completedLessons.includes(lesson._id)) {
    dispatch(markLessonCompleted(lesson._id));
  }

  // Move to next lesson/module
  if (currentLessonIndex < module.lessons.length - 1) {
    setCurrentLessonIndex(currentLessonIndex + 1);
  } else if (currentModuleIndex < course.modules.length - 1) {
    setCurrentModuleIndex(currentModuleIndex + 1);
    setCurrentLessonIndex(0);
  }
};


  // Previous Lesson
  const handlePrevLesson = () => {
    if (!module.lessons || module.lessons.length === 0) return;
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    } else if (currentModuleIndex > 0) {
      const prevModule = course.modules[currentModuleIndex - 1];
      setCurrentModuleIndex(currentModuleIndex - 1);
      setCurrentLessonIndex(prevModule.lessons.length - 1);
    }
  };

  // Progress Calculation
  const totalLessons = course.modules.reduce(
    (sum: number, mod: any) => sum + (mod.lessons?.length || 0),
    0
  );
  const completedCount = completedLessons.length;
  const progressPercentage =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side - Video & Lesson */}
        <div className="lg:col-span-2 space-y-6">
          {module.lessons && module.lessons.length > 0 && lesson ? (
            <>
              <h2 className="text-2xl font-bold">
                Module: {module.title} - Lesson: {lesson.title}
              </h2>

              {/* Video */}
              <div className="w-full h-64 md:h-96 lg:h-[500px]">
                <iframe
                  src={lesson.videoUrl}
                  title={lesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg shadow-lg border"
                />
              </div>

              {/* Lesson Info & Mark Complete */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 bg-white rounded-lg shadow border">
                <span className="font-medium">Duration: {lesson.duration} mins</span>
                <button
                  className={`px-4 py-2 rounded ${
                    completedLessons.includes(lesson._id)
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-black hover:bg-gray-300"
                  }`}
                  onClick={() => dispatch(markLessonCompleted(lesson._id))}
                >
                  {completedLessons.includes(lesson._id)
                    ? "Completed"
                    : "Mark as Complete"}
                </button>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="w-full bg-gray-200 h-2 rounded mt-2">
                  <div
                    className="bg-green-500 h-2 rounded"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <p className="text-sm mt-1">{progressPercentage}% completed</p>
              </div>

              {/* Navigation */}
              <div className="flex justify-between">
                <button
                  onClick={handlePrevLesson}
                  disabled={currentModuleIndex === 0 && currentLessonIndex === 0}
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
                >
                  Previous
                </button>
                <button
                  onClick={handleNextLesson}
                  disabled={
                    currentModuleIndex === course.modules.length - 1 &&
                    currentLessonIndex === module.lessons.length - 1
                  }
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <div className="p-4 bg-gray-100 rounded-lg border text-center text-muted-foreground">
              No lessons available in this module.
            </div>
          )}
        </div>

        {/* Right Side - Sticky Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 max-h-[80vh] overflow-y-auto space-y-3">
            {course.modules.map((mod: any, modIdx: number) => (
              <div
                key={mod._id}
                className="bg-white rounded-lg shadow border p-3"
              >
                <h3 className="font-semibold mb-2">{mod.title}</h3>
                {mod.lessons && mod.lessons.length > 0 ? (
                  <div className="space-y-1">
                    {mod.lessons.map((les: any, lesIdx: number) => (
                      <div
                        key={les._id}
                        className={`p-2 rounded border cursor-pointer flex justify-between items-center ${
                          currentModuleIndex === modIdx &&
                          currentLessonIndex === lesIdx
                            ? "bg-primary text-white border-primary"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => {
                          setCurrentModuleIndex(modIdx);
                          setCurrentLessonIndex(lesIdx);
                        }}
                      >
                        <span className="text-sm">{les.title}</span>
                        <span className="text-xs text-muted-foreground">
                          {les.duration} min
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground italic p-2">
                    No lessons
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
