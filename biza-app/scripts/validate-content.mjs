import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const appPath = new URL("../lib/content/content-map.json", import.meta.url);
const docsPath = new URL("../../Docs/content-map.json", import.meta.url);
const [appSource, docsSource] = await Promise.all([
  readFile(appPath, "utf8"),
  readFile(docsPath, "utf8"),
]);

assert.equal(appSource, docsSource, "Docs and runtime content maps must stay in sync");
const contentMap = JSON.parse(appSource);
const assertUnique = (values, label) => {
  assert.equal(new Set(values).size, values.length, `${label} must be unique`);
};

assertUnique(contentMap.categories.map(({ slug }) => slug), "Category slugs");
assertUnique(contentMap.opportunities.map(({ slug }) => slug), "Opportunity slugs");

for (const opportunity of contentMap.opportunities) {
  assert.ok(
    contentMap.categories.some(({ slug }) => slug === opportunity.categorySlug),
    `${opportunity.slug} must reference an existing category`
  );
  assertUnique(opportunity.course.lessons.map(({ slug }) => slug), `${opportunity.slug} lesson slugs`);

  for (const lesson of opportunity.course.lessons) {
    assertUnique(lesson.chapters.map(({ slug }) => slug), `${lesson.slug} chapter slugs`);
    assert.equal(lesson.chapters.filter(({ isFree }) => isFree).length, 2, `${lesson.slug} must have two free chapters`);

    for (const chapter of lesson.chapters) {
      if (!chapter.content) continue;
      assert.ok(chapter.estimatedMinutes > 0, `${chapter.slug} needs a duration`);
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
      assertUnique(quiz.options.map(({ id }) => id), `${quiz.id} option ids`);
      assert.ok(quiz.options.length >= 2, `${quiz.id} needs two options`);
      assert.equal(quiz.options.filter(({ correct }) => correct).length, 1, `${quiz.id} needs one correct answer`);
      assert.ok(chapter.quizTypes?.includes(quiz.type), `${chapter.slug} quiz metadata must match its quiz`);
    }
  }
}

console.log(`Validated ${contentMap.opportunities.length} opportunities; Docs and runtime maps match.`);
