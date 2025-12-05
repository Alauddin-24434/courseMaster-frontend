"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { ICategory } from "@/interfaces/category.interface";
import { useCreateCategoryMutation, useDeleteCategoryMutation, useGetCategoriesQuery, useUpdateCategoryMutation } from "@/redux/features/category/categoriesApi";

export default function CategoryPage() {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [editingCategory, setEditingCategory] = useState<ICategory | null>(null);

  const { register, handleSubmit, reset, setValue } = useForm<ICategory>();
console.log(categories)
  const onSubmit = async (data: ICategory) => {
    try {
      if (editingCategory) {
        await updateCategory({ id: editingCategory._id!, body: data });
      } else {
        await createCategory(data);
      }
      reset();
      setEditingCategory(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (category: ICategory) => {
    setEditingCategory(category);
    setValue("name", category.name);

  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure?")) {
      await deleteCategory(id);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Category Management</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-6 space-y-3">
        <input
          {...register("name", { required: true })}
          placeholder="Category Name"
          className="border px-3 py-2 rounded w-full"
        />
    
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingCategory ? "Update Category" : "Create Category"}
        </button>
      </form>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Name</th>

              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories?.data?.map((cat:ICategory) => (
              <tr key={cat._id} className="border-b">
                <td className="p-2">{cat.name}</td>
       
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id!)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
