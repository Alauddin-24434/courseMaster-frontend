"use client";

import React, { useState } from "react";
import CourseCreateForm from "@/components/course-form/CourseCreateForm";
import ModuleEditor from "@/components/ModuleEditor";
import { useGetAllCoursesQuery } from "@/redux/features/course/courseAPi";
import CourseList from "@/components/course-form/CourseList";

export default function ManageCourses() {
  const { data: courses, refetch, isLoading } = useGetAllCoursesQuery();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Course Management</h2>

      <button
        onClick={() => setShowCreateModal(true)}
        className="mb-4 bg-purple-600 text-white px-4 py-2 rounded"
      >
        Create New Course
      </button>

      {/* Course List */}
      <CourseList
        onEdit={(course) => setEditingCourseId(course._id)}
        onAddLesson={(course) => setEditingCourseId(course._id)}
      />

      {/* Create Course Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white rounded p-6 shadow-lg max-h-[90vh] overflow-auto w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Create Course</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-3 py-1 border rounded"
              >
                Close
              </button>
            </div>

            <CourseCreateForm
              onCreated={(newCourseId) => {
                setShowCreateModal(false);
                setEditingCourseId(newCourseId); // Open ModuleEditor after creation
                refetch();
              }}
            />
          </div>
        </div>
      )}

      {/* Module Editor Modal */}
      {editingCourseId && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-start pt-20 z-50 overflow-auto">
          <div className="bg-white rounded p-6 w-full max-w-3xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Manage Modules</h3>
              <button
                onClick={() => setEditingCourseId(null)}
                className="px-3 py-1 border rounded"
              >
                Close
              </button>
            </div>

            <ModuleEditor courseId={editingCourseId} />
          </div>
        </div>
      )}
    </div>
  );
}
