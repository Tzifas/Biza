import { CoursesCatalogContent } from "@/components/courses/CoursesCatalogContent";
import { Suspense } from "react";

export default function AppCoursesPage() {
  return (
    <Suspense fallback={<div className="min-h-[40vh]" />}>
      <CoursesCatalogContent basePath="/app/courses" />
    </Suspense>
  );
}
