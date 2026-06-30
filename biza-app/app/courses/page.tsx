import { SiteLayout } from "@/components/layouts/SiteLayout";
import { CoursesCatalogContent } from "@/components/courses/CoursesCatalogContent";
import { Suspense } from "react";

export default function CoursesPage() {
  return (
    <SiteLayout>
      <Suspense fallback={<div className="min-h-[40vh] bg-cream" />}>
        <CoursesCatalogContent basePath="/courses" />
      </Suspense>
    </SiteLayout>
  );
}
