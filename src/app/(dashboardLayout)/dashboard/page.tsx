import { AdminDashboard } from "@/components/admin-dashboard";
import { FeaturedCourses } from "@/components/FeaturedCourses";
import { HeroAnimated } from "@/components/hero";
import { StudentDashboard } from "@/components/student-dashboard";
import { UpcomingLiveCourses } from "@/components/UpcomingLiveCourses";

export default function dashboard() {
  return (
    <main>
          <AdminDashboard />
          <StudentDashboard/>
    </main>
  );
}
