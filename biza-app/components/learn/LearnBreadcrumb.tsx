import Link from "next/link";

type Props = {
  categorySlug: string;
  categoryName: string;
  opportunitySlug: string;
  opportunityName: string;
  lessonTitle: string;
  chapterTitle: string;
};

export function LearnBreadcrumb({
  categorySlug,
  categoryName,
  opportunitySlug,
  opportunityName,
  lessonTitle,
  chapterTitle,
}: Props) {
  const crumbs = [
    { label: categoryName, href: `/courses/${categorySlug}` },
    { label: opportunityName, href: `/courses/${categorySlug}/${opportunitySlug}` },
    { label: lessonTitle, href: `/courses/${categorySlug}/${opportunitySlug}/learn` },
    { label: chapterTitle },
  ];

  return (
    <nav aria-label="Breadcrumb" className="overflow-x-auto px-4 py-2">
      <ol className="flex min-w-0 items-center gap-1 text-[10px] text-stone whitespace-nowrap">
        {crumbs.map((crumb, i) => (
          <li key={crumb.label} className="flex items-center gap-1">
            {i > 0 ? <span aria-hidden className="text-border">/</span> : null}
            {crumb.href ? (
              <Link href={crumb.href} className="hover:text-forest">
                {crumb.label}
              </Link>
            ) : (
              <span className="font-medium text-forest">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
