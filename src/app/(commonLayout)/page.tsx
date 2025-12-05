import { FeaturedCourses } from "@/components/FeaturedCourses";
import { HeroAnimated } from "@/components/hero";
import { UpcomingLiveCourses } from "@/components/UpcomingLiveCourses";

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <HeroAnimated />
      {/* <UpcomingLiveCourses /> */}
      <FeaturedCourses />
    </main>
  );
}
