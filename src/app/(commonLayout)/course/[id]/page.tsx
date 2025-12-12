import { CourseDetailView } from "@/components/course-detail-view";
import { getCourseById } from "@/lib/api";

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // unwrap the promise
  const course = await getCourseById(id);
  console.log(course)

  if (!course) {
    return <div className="text-center py-20">Course not found</div>;
  }

  return (
    <main className="min-h-screen bg-background">
      {/* pass the whole course object */}
      <CourseDetailView course={course} />
    </main>
  );
}
