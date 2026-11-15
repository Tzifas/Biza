import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const appMapPath = new URL("../lib/content/content-map.json", import.meta.url);
const docsMapPath = new URL("../../Docs/content-map.json", import.meta.url);
const appChapterPath = new URL("../lib/content/chapter-content-map.json", import.meta.url);
const docsChapterPath = new URL("../../Docs/chapter-content.json", import.meta.url);
const [appMapSource, docsMapSource, appChapterSource, docsChapterSource] = await Promise.all([
  readFile(appMapPath, "utf8"),
  readFile(docsMapPath, "utf8"),
  readFile(appChapterPath, "utf8"),
  readFile(docsChapterPath, "utf8"),
]);

assert.equal(appMapSource, docsMapSource, "Docs and runtime course maps must stay in sync");
assert.equal(appChapterSource, docsChapterSource, "Docs and runtime authored content must stay in sync");
const contentMap = JSON.parse(appMapSource);
const authoredMap = JSON.parse(appChapterSource);
assert.equal(contentMap.version, authoredMap.version, "Course map and authored content versions must match");

const assertUnique = (values, label) => {
  assert.equal(new Set(values).size, values.length, `${label} must be unique`);
};

assertUnique(contentMap.categories.map(({ slug }) => slug), "Category slugs");
assertUnique(contentMap.opportunities.map(({ slug }) => slug), "Opportunity slugs");
const knownChapterIds = new Set();

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
      assert.ok(!Object.hasOwn(chapter, "content"), `${chapter.slug} content must stay out of the client course map`);
      knownChapterIds.add(chapter.id);
      const body = authoredMap.chapters[chapter.id];
      if (!body) continue;

      assert.ok(chapter.estimatedMinutes > 0, `${chapter.slug} needs a duration`);
      assert.ok(chapter.learningObjectives?.length, `${chapter.slug} needs learning objectives`);
      assert.ok(body.hook?.trim(), `${chapter.slug} needs a hook`);
      assert.ok(body.blocks?.length, `${chapter.slug} needs content blocks`);
      assert.ok(body.takeaway?.trim(), `${chapter.slug} needs a takeaway`);
      assert.ok(body.closing?.trim(), `${chapter.slug} needs a closing`);

      for (const block of body.blocks) {
        assert.ok(["paragraph", "callout", "steps"].includes(block.type), `${chapter.slug} has an unknown block type`);
        if (block.type === "steps") assert.ok(block.items.length, `${chapter.slug} has an empty steps block`);
      }

      assert.ok(body.quiz.id && body.quiz.question && body.quiz.explanation, `${chapter.slug} needs a complete quiz`);
      assertUnique(body.quiz.options.map(({ id }) => id), `${body.quiz.id} option ids`);
      assert.ok(body.quiz.options.length >= 2, `${body.quiz.id} needs at least two options`);
      assert.equal(body.quiz.options.filter(({ correct }) => correct).length, 1, `${body.quiz.id} needs one correct answer`);
      assert.ok(chapter.quizTypes?.includes(body.quiz.type), `${chapter.slug} quiz metadata must match its quiz`);
    }
  }
}

for (const chapterId of Object.keys(authoredMap.chapters)) {
  assert.ok(knownChapterIds.has(chapterId), `${chapterId} content must map to an existing chapter`);
}

console.log(`Validated ${contentMap.opportunities.length} opportunities and ${Object.keys(authoredMap.chapters).length} server-only authored chapters.`);
