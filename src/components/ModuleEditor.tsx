"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import {

  useGetCourseByIdQuery,
} from "@/redux/features/course/courseAPi";
import {
 
  useAddModuleMutation,

} from "@/redux/features/module/courseModuleApi";

type ModuleForm = { title: string };

export default function ModuleEditor({
  courseId: propCourseId,
}: {
  courseId: string;
}) {
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(
    propCourseId || null
  );

  // যদি prop পরিবর্তন হয়, update state
  useEffect(() => {
    setSelectedCourseId(propCourseId);
  }, [propCourseId]);

  const { data: course, refetch } = useGetCourseByIdQuery(selectedCourseId!, {
    skip: !selectedCourseId,
  });

  const [addModule] = useAddModuleMutation();

  const { register, handleSubmit, reset } = useForm<ModuleForm>({
    defaultValues: { title: "" },
  });
     useEffect(() => {
    if (selectedCourseId) refetch();
  }, [selectedCourseId, refetch]);

  // Add Module
  const onAddModule = async (val: ModuleForm) => {
    if (!selectedCourseId) return alert("Select a course first");
    const data = { courseId: selectedCourseId, title: val.title };
    try {
      await addModule(data).unwrap();
      reset();
      refetch();
    } catch (err) {
      console.error(err);
      alert("Add module failed");
    }
  };


  return (
    <div className="bg-white p-6 rounded shadow space-y-6">
      <h3 className="text-lg font-semibold mb-4">Module Editor</h3>


      {!selectedCourseId && (
        <p className="text-gray-500">Select a course to manage modules</p>
      )}

      {/* Module & Lessons */}
      {selectedCourseId && course && (
        <>
          {/* Add Module */}
          <form
            onSubmit={handleSubmit(onAddModule)}
            className="flex gap-2 mb-4"
          >
            <input
              {...register("title", { required: true })}
              placeholder="Module title"
              className="flex-1 border px-3 py-2 rounded"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Add Module
            </button>
          </form>

       
        </>
      )}
    </div>
  );
}
