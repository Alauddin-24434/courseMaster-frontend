"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { useCreateCourseMutation } from "@/redux/features/course/courseAPi";
import { useGetCategoriesQuery } from "@/redux/features/category/categoriesApi";

type FormValues = {
  title: string;
  description?: string;
  thumbnailFile?: File;
  previewVideo: string;
  price: number;
  category: string;
  tags: string;
  instructor: string;
  batchTitle: string;
};

// Helper function to convert YouTube URL to embed URL
const convertToEmbedUrl = (url: string) => {
  if (!url) return "";
  if (url.includes("youtu.be/")) return url.replace("https://youtu.be/", "https://www.youtube.com/embed/");
  if (url.includes("youtube.com/watch?v=")) {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return url;
};

export default function CourseCreateForm({
  onCreated,
}: {
  onCreated?: (courseId: string) => void;
}) {
  const { register, handleSubmit, reset, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      previewVideo: "",
      price: 0,
      category: "",
      tags: "",
      instructor: "",
      batchTitle: "",
    },
  });

  const [createCourse] = useCreateCourseMutation();
  const { data: categories, isLoading: catLoading, isError } = useGetCategoriesQuery();
  const [thumbPreview, setThumbPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Thumbnail change handler
  const handleThumbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setValue("thumbnailFile" as any, file);
    const reader = new FileReader();
    reader.onload = () => setThumbPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: FormValues) => {
    if (!data.thumbnailFile) {
      alert("Thumbnail is required!");
      return;
    }
    try {
      setLoading(true);

      // Upload thumbnail to Cloudinary
      let thumbnailUrl = "";
      const fd = new FormData();
      fd.append("file", data.thumbnailFile);
      fd.append("upload_preset", "course_thumbnails");

      const res = await fetch("https://api.cloudinary.com/v1_1/dyfamn6rm/image/upload", { method: "POST", body: fd });
      const json = await res.json();
      thumbnailUrl = json.secure_url;
      if (!thumbnailUrl) {
        alert("Thumbnail is required!");
        return;
      }

      // Convert previewVideo URL to embed URL
      const embedVideoUrl = convertToEmbedUrl(data.previewVideo);

      const payload = {
        title: data.title,
        description: data.description,
        thumbnail: thumbnailUrl,
        previewVideo: embedVideoUrl,
        price: Number(data.price),
        category: data.category,
        instructor: data.instructor,
        tags: data.tags ? data.tags.split(",").map((t) => t.trim()) : [],
        batch: {
          title: data.batchTitle,
          startDate: new Date(), // আপডেট করতে পারো user input অনুযায়ী
          endDate: null,         // optional
        },
        modules: [],
      };

      const created = await createCourse(payload).unwrap();
      reset();
      setThumbPreview(null);

      if (onCreated && created?._id) onCreated(created._id);
    } catch (err) {
      console.error("Create course error:", err);
      alert("Failed to create course.");
    } finally {
      setLoading(false);
    }
  };

  // Watch previewVideo for live preview
  const previewVideoUrl = watch("previewVideo");

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-xl mx-auto">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">Create Course</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <input {...register("title", { required: true })} placeholder="Course title" className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />

        <textarea {...register("description")} placeholder="Short description" className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />

        {/* Thumbnail Upload */}
        <div className="w-full">
          <label className="block text-gray-700 font-semibold mb-2">Thumbnail</label>
          <div className="flex items-center gap-4">
            <label htmlFor="thumbnail" className="cursor-pointer bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition">Choose File</label>
            <span className="text-gray-600">{thumbPreview ? "Selected" : "No file chosen"}</span>
            <input id="thumbnail" type="file" accept="image/*" onChange={handleThumbChange} className="hidden" />
          </div>
          {thumbPreview && <img src={thumbPreview} alt="Thumbnail Preview" className="mt-3 w-64 h-36 object-cover rounded-lg shadow-md border border-gray-200" />}
        </div>

        <input {...register("previewVideo", { required: true })} placeholder="Preview video URL" className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />

        {/* Live Video Preview */}
        {previewVideoUrl && (
          <div className="mt-4">
            <label className="block text-gray-700 font-semibold mb-2">Video Preview</label>
            <iframe
              width="100%"
              height="315"
              src={convertToEmbedUrl(previewVideoUrl)}
              title="Course Preview Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <input type="number" {...register("price", { required: true, valueAsNumber: true })} placeholder="Price" className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />

          <select {...register("category", { required: true })} className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option value="">Select category</option>
            {catLoading && <option>Loading...</option>}
            {isError && <option>Error loading categories</option>}
            {categories?.data?.map((cat: any) => (<option key={cat._id} value={cat._id}>{cat.name}</option>))}
          </select>
        </div>

        {/* Batch Select */}
        <div className="w-full">
          <label className="block text-gray-700 font-semibold mb-2">Batch</label>
          <select {...register("batchTitle", { required: true })} className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option value="">Select Batch</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={`Batch ${num}`}>{`Batch ${num}`}</option>
            ))}
          </select>
        </div>

        <input {...register("tags")} placeholder="Tags (comma separated)" className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />

        <input {...register("instructor")} placeholder="Instructor name" className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />

        <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
          {loading ? "Creating..." : "Create Course"}
        </button>
      </form>
    </div>
  );
}
