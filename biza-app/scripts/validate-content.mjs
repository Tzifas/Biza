import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const appMapPath = new URL("../lib/content/content-map.json", import.meta.url);
const docsMapPath = new URL("../../Docs/content-map.json", import.meta.url);
const [appSource, docsSource] = await Promise.all([
  readFile(appMapPath, "utf8"),
  readFile(docsMapPath, "utf8"),
]);

assert.equal(appSource, docsSource, "Docs and runtime content maps must stay in sync");
const map = JSON.parse(appSource);
const unique = (values, label) => {
  assert.equal(new Set(values).size, values.length, `${label} must be unique`);
};

unique(map.categories.map(({ slug }) => slug), "Category slugs");
unique(map.opportunities.map(({ slug }) => slug), "Opportunity slugs");

for (const opportunity of map.opportunities) {
  assert.ok(
    map.categories.some(({ slug }) => slug === opportunity.categorySlug),
    `${opportunity.slug} must reference an existing category`
  );
  unique(opportunity.course.lessons.map(({ slug }) => slug), `${opportunity.slug} lesson slugs`);

  for (const lesson of opportunity.course.lessons) {
    unique(lesson.chapters.map(({ slug }) => slug), `${lesson.slug} chapter slugs`);
    assert.equal(
      lesson.chapters.filter(({ isFree }) => isFree).length,
      2,
      `${lesson.slug} must have exactly two free chapters`
    );

    for (const chapter of lesson.chapters) {
      if (!chapter.content) continue;
      assert.ok(chapter.learningObjectives?.length, `${chapter.slug} needs learning objectives`);
      assert.ok(chapter.content.hook?.trim(), `${chapter.slug} needs a hook`);
      assert.ok(chapter.content.blocks?.length, `${chapter.slug} needs content blocks`);
      assert.ok(chapter.content.takeaway?.trim(), `${chapter.slug} needs a takeaway`);
      assert.ok(chapter.content.closing?.trim(), `${chapter.slug} needs a closing`);

      for (const block of chapter.content.blocks) {
        assert.ok(["paragraph", "callout", "steps"].includes(block.type), `${chapter.slug} has an unknown block type`);
        if (block.type === "steps") assert.ok(block.items.length, `${chapter.slug} has an empty steps block`);
      }

      const { quiz } = chapter.content;
      assert.ok(quiz.id && quiz.question && quiz.explanation, `${chapter.slug} needs a complete quiz`);
      unique(quiz.options.map(({ id }) => id), `${quiz.id} option ids`);
      assert.ok(quiz.options.length >= 2, `${quiz.id} needs at least two options`);
      assert.equal(quiz.options.filter(({ correct }) => correct).length, 1, `${quiz.id} needs exactly one correct answer`);
      assert.ok(chapter.quizTypes?.includes(quiz.type), `${chapter.slug} quiz type must match its quiz metadata`);
    }
  }
}

console.log(`Validated ${map.opportunities.length} opportunities; Docs and runtime content maps match.`);
