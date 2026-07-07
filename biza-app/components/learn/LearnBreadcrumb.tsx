"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

type Props = {
  categorySlug: string;
  categoryName: string;
  opportunitySlug: string;
  opportunityName: string;
  lessonTitle: string;
  chapterTitle: string;
  basePath?: string;
};

export function LearnBreadcrumb({
  categorySlug,
  categoryName,
  opportunitySlug,
  opportunityName,
  lessonTitle,
  chapterTitle,
  basePath = "/courses",
}: Props) {
  const crumbs = [
    { label: categoryName, href: `${basePath}/${categorySlug}` },
    { label: opportunityName, href: `${basePath}/${categorySlug}/${opportunitySlug}` },
    { label: lessonTitle, href: `${basePath}/${categorySlug}/${opportunitySlug}/learn` },
    { label: chapterTitle },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      aria-label="Breadcrumb"
      className="overflow-x-auto px-4 py-2"
    >
      <ol className="flex min-w-0 items-center gap-1.5 text-xs text-stone whitespace-nowrap">
        {crumbs.map((crumb, i) => (
          <motion.li
            key={crumb.label}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="flex items-center gap-1.5"
          >
            {i > 0 ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.05 + 0.1 }}
              >
                <ChevronRight size={12} className="text-border" aria-hidden />
              </motion.div>
            ) : null}
            {crumb.href ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.15 }}
              >
                <Link href={crumb.href} className="hover:text-forest transition-colors">
                  {crumb.label}
                </Link>
              </motion.div>
            ) : (
              <motion.span
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                className="font-semibold text-forest"
              >
                {crumb.label}
              </motion.span>
            )}
          </motion.li>
        ))}
      </ol>
    </motion.nav>
  );
}
