"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useAddLessonMutation,
  useCreateAssignmentMutation,
  useCreateQuizMutation,
} from "@/redux/features/module/courseModuleApi";
import { useGetAllCoursesQuery } from "@/redux/features/course/courseAPi";
import { Edit, Plus } from "lucide-react";

// Props
interface Props {
  onEdit: (course: any) => void;
  onAddLesson: (course: any) => void;
}

// Form types
type AssignmentForm = { description: string; submissionType: "text" | "link" };
type QuizForm = { question: string; options: string; correctIndex: number };
type LessonFormType = { title: string; videoUrl: string; duration: number };

export default function CourseList({ onEdit, onAddLesson }: Props) {
  const { data: courses, isLoading } = useGetAllCoursesQuery();

  const [addingLessonTo, setAddingLessonTo] = useState<any>(null);
  const [showAssignmentFormFor, setShowAssignmentFormFor] = useState<any>(null);
  const [showQuizFormFor, setShowQuizFormFor] = useState<any>(null);
  // Helper function to convert YouTube URL to embed URL
  const convertToEmbedUrl = (url: string) => {
    if (!url) return "";
    if (url.includes("youtu.be/"))
      return url.replace("https://youtu.be/", "https://www.youtube.com/embed/");
    if (url.includes("youtube.com/watch?v=")) {
      const videoId = url.split("v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  const [lessonInput, setLessonInput] = useState<LessonFormType>({
    title: "",
    videoUrl: "",
    duration: 0,
  });

  const [addLesson] = useAddLessonMutation();
  const [createAssignment] = useCreateAssignmentMutation();
  const [createQuiz] = useCreateQuizMutation();

  const {
    register: regAssignment,
    handleSubmit: handleSubmitAssignment,
    reset: resetAssignment,
  } = useForm<AssignmentForm>();
  const {
    register: regQuiz,
    handleSubmit: handleSubmitQuiz,
    reset: resetQuiz,
  } = useForm<QuizForm>();

  if (isLoading) return <p className="text-center mt-10">Loading courses...</p>;

  // -------------------- Handlers --------------------
  const handleAddLesson = async (courseId: string, moduleId: string) => {
    // Convert previewVideo URL to embed URL
    const embedVideoUrl = convertToEmbedUrl(lessonInput?.videoUrl);
    const data = {
      ...lessonInput,
      videoUrl: embedVideoUrl,
    };
    try {
      await addLesson({ courseId, moduleId, ...data }).unwrap();
      setLessonInput({ title: "", videoUrl: "", duration: 0 });
      setAddingLessonTo(null);
    } catch (err) {
      console.error(err);
      alert("Add lesson failed");
    }
  };

  const handleCreateAssignment = async (
    courseId: string,
    moduleId: string,
    lessonIndex: number,
    data: AssignmentForm
  ) => {
    try {
      await createAssignment({
        courseId,
        moduleId,
        lessonIndex,
        ...data,
      }).unwrap();
      resetAssignment();
      setShowAssignmentFormFor(null);
    } catch (err) {
      console.error(err);
      alert("Assignment create failed");
    }
  };

  const handleCreateQuiz = async (
    courseId: string,
    moduleId: string,
    lessonIndex: number,
    data: QuizForm
  ) => {
    try {
      await createQuiz({
        courseId,
        moduleId,
        lessonIndex,
        quiz: {
          questions: [
            {
              question: data.question,
              options: data.options.split(",").map((s) => s.trim()),
              correctAnswer: data.correctIndex,
            },
          ],
        },
      }).unwrap();

      resetQuiz();
      setShowQuizFormFor(null);
    } catch (err) {
      console.error(err);
      alert("Quiz create failed");
    }
  };

  // -------------------- JSX --------------------
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden p-4 space-y-4">
      <table className="w-full text-sm border-collapse">
        <thead className="bg-muted border-b border-border">
          <tr>
            <th className="px-4 py-3 text-left font-semibold">Course</th>
            <th className="px-4 py-3 text-left font-semibold">Instructor</th>
            <th className="px-4 py-3 text-right font-semibold">Price</th>
            <th className="px-4 py-3 text-right font-semibold">Enrolled</th>
            <th className="px-4 py-3 text-center font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses?.data?.map((course: any) => (
            <React.Fragment key={course._id}>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-medium">{course.title}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {course.instructor}
                </td>
                <td className="px-4 py-3 text-right font-semibold">
                  {course.price}
                </td>
                <td className="px-4 py-3 text-right">
                  {course.enrollCounts.length || 0}
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEdit(course)}
                      className="p-1.5 hover:bg-muted rounded"
                    >
                      <Edit className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button
                      onClick={() => onAddLesson(course)}
                      className="p-1.5 hover:bg-muted rounded"
                    >
                      <Plus className="w-4 h-4 text-green-600" />
                    </button>
                  </div>
                </td>
              </tr>

              {/* Modules & Lessons */}
              {course.modules && course.modules.length > 0 ? (
                course.modules.map((mod: any) => (
                  <React.Fragment key={mod._id}>
                    {/* Module Header */}
                    <tr className="bg-gray-50 border-b border-border">
                      <td className="px-4 py-2" colSpan={5}>
                        <div className="flex justify-between items-center">
                          <div>
                            <strong>Module:</strong> {mod.title}
                          </div>
                          {/* Add Lesson Button */}
                          <button
                            className="px-3 py-1 bg-blue-600 text-white rounded"
                            onClick={() =>
                              setAddingLessonTo({
                                courseId: course._id,
                                moduleId: mod._id,
                              })
                            }
                          >
                            Add Lesson
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Lessons */}
                    {mod.lessons && mod.lessons.length > 0
                      ? mod.lessons.map((lesson: any, idx: number) => (
                          <tr
                            key={lesson._id}
                            className="bg-gray-50 border-b border-border"
                          >
                            <td className="px-4 py-2" colSpan={5}>
                              <div className="flex justify-between items-center">
                                <div>
                                  <strong>Lesson:</strong> {lesson.title} (
                                  {lesson.duration} min)
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    className="px-2 py-1 bg-green-500 text-white rounded"
                                    onClick={() =>
                                      setShowAssignmentFormFor({
                                        courseId: course._id,
                                        moduleId: mod._id,
                                        lessonIndex: idx,
                                      })
                                    }
                                  >
                                    Add Assignment
                                  </button>
                                  <button
                                    className="px-2 py-1 bg-yellow-500 text-white rounded"
                                    onClick={() =>
                                      setShowQuizFormFor({
                                        courseId: course._id,
                                        moduleId: mod._id,
                                        lessonIndex: idx,
                                      })
                                    }
                                  >
                                    Add Quiz
                                  </button>
                                </div>
                              </div>

                              {/* Assignment Form */}
                              {showAssignmentFormFor?.moduleId === mod._id &&
                                showAssignmentFormFor.lessonIndex === idx &&
                                showAssignmentFormFor.courseId ===
                                  course._id && (
                                  <form
                                    onSubmit={handleSubmitAssignment((data) =>
                                      handleCreateAssignment(
                                        course._id,
                                        mod._id,
                                        idx,
                                        data
                                      )
                                    )}
                                    className="mt-2 p-2 border rounded space-y-2 bg-white"
                                  >
                                    <input
                                      {...regAssignment("description")}
                                      placeholder="Description"
                                      className="w-full border px-2 py-1 rounded"
                                    />
                                    <select
                                      {...regAssignment("submissionType")}
                                      className="w-full border px-2 py-1 rounded"
                                    >
                                      <option value="text">Text</option>
                                      <option value="link">Link</option>
                                    </select>
                                    <div className="flex gap-2">
                                      <button
                                        type="submit"
                                        className="bg-green-600 text-white px-3 py-1 rounded"
                                      >
                                        Save
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setShowAssignmentFormFor(null)
                                        }
                                        className="px-3 py-1 border rounded"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </form>
                                )}

                              {/* Quiz Form */}
                              {showQuizFormFor?.moduleId === mod._id &&
                                showQuizFormFor.lessonIndex === idx &&
                                showQuizFormFor.courseId === course._id && (
                                  <form
                                    onSubmit={handleSubmitQuiz((data) =>
                                      handleCreateQuiz(
                                        course._id,
                                        mod._id,
                                        idx,
                                        data
                                      )
                                    )}
                                    className="mt-2 p-2 border rounded space-y-2 bg-white"
                                  >
                                    <input
                                      {...regQuiz("question")}
                                      placeholder="Question"
                                      className="w-full border px-2 py-1 rounded"
                                    />
                                    <input
                                      {...regQuiz("options")}
                                      placeholder="Options comma separated"
                                      className="w-full border px-2 py-1 rounded"
                                    />
                                    <input
                                      type="number"
                                      {...regQuiz("correctIndex")}
                                      placeholder="Correct option index"
                                      className="w-full border px-2 py-1 rounded"
                                    />
                                    <div className="flex gap-2">
                                      <button
                                        type="submit"
                                        className="bg-green-600 text-white px-3 py-1 rounded"
                                      >
                                        Save
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => setShowQuizFormFor(null)}
                                        className="px-3 py-1 border rounded"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </form>
                                )}
                            </td>
                          </tr>
                        ))
                      : null}

                    {/* Add Lesson Form */}
                    {addingLessonTo?.moduleId === mod._id &&
                      addingLessonTo.courseId === course._id && (
                        <tr>
                          <td colSpan={5}>
                            <div className="p-2 border rounded space-y-2 bg-gray-50 mt-2">
                              <input
                                value={lessonInput.title}
                                onChange={(e) =>
                                  setLessonInput({
                                    ...lessonInput,
                                    title: e.target.value,
                                  })
                                }
                                placeholder="Lesson title"
                                className="w-full border px-2 py-1 rounded"
                              />
                              <input
                                value={lessonInput.videoUrl}
                                onChange={(e) =>
                                  setLessonInput({
                                    ...lessonInput,
                                    videoUrl: e.target.value,
                                  })
                                }
                                placeholder="Video URL"
                                className="w-full border px-2 py-1 rounded"
                              />
                              <input
                                type="number"
                                value={lessonInput.duration}
                                onChange={(e) =>
                                  setLessonInput({
                                    ...lessonInput,
                                    duration: Number(e.target.value),
                                  })
                                }
                                placeholder="Duration (minutes)"
                                className="w-full border px-2 py-1 rounded"
                              />
                              <div className="flex gap-2">
                                <button
                                  onClick={() =>
                                    handleAddLesson(course._id, mod._id)
                                  }
                                  className="bg-green-600 text-white px-3 py-1 rounded"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setAddingLessonTo(null)}
                                  className="px-3 py-1 border rounded"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-4 text-muted-foreground"
                  >
                    No modules available
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
