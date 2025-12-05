"use client";

import React from "react";
import { useForm } from "react-hook-form";

type Props = {
  onSubmit: (data: { title: string; videoUrl: string; duration: number }) => void;
  onCancel?: () => void;
};

export default function LessonForm({ onSubmit, onCancel }: Props) {
  const { register, handleSubmit, reset } = useForm<{ title: string; videoUrl: string; duration: number }>({ defaultValues: { title: "", videoUrl: "", duration: 0 } });

  const submit = (data: { title: string; videoUrl: string; duration: number }) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="bg-gray-50 p-4 rounded">
      <input {...register("title", { required: true })} placeholder="Lesson title" className="w-full border px-3 py-2 rounded mb-2" />
      <input {...register("videoUrl", { required: true })} placeholder="Video URL (youtube embed or link)" className="w-full border px-3 py-2 rounded mb-2" />
      <input type="number" {...register("duration", { required: true, valueAsNumber: true })} placeholder="Duration (minutes)" className="w-full border px-3 py-2 rounded mb-2" />
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Lesson</button>
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">Cancel</button>
      </div>
    </form>
  );
}
