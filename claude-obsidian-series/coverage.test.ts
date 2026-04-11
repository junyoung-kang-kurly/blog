import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";

const BASE = join(__dirname);

interface Concept {
  id: string;
  name: string;
  source_file: string;
  description: string;
}

interface Skill {
  id: string;
  name: string;
  blog_post_number: number;
  source_files: string[];
  concepts: Concept[];
}

interface Catalog {
  version: string;
  generated_at: string;
  source_repo: string;
  total_concepts: number;
  skills: Skill[];
}

interface Post {
  number: number;
  skill: string;
  title: string;
  file_path: string;
  status: string;
  concepts_covered: string[];
  files_referenced: string[];
}

interface BlogMap {
  series: string;
  total_posts: number;
  posts: Post[];
}

function loadCatalog(): Catalog {
  return JSON.parse(readFileSync(join(BASE, "concepts-catalog.json"), "utf-8"));
}

function loadBlogMap(): BlogMap {
  return JSON.parse(readFileSync(join(BASE, "blog-series-map.json"), "utf-8"));
}

describe("Blog Series Coverage", () => {
  const catalog = loadCatalog();
  const map = loadBlogMap();

  it("카탈로그에 10개 스킬이 있어야 한다", () => {
    expect(catalog.skills.length).toBe(10);
  });

  it("카탈로그에 262개 개념이 있어야 한다", () => {
    const total = catalog.skills.reduce(
      (sum, skill) => sum + skill.concepts.length,
      0
    );
    expect(total).toBe(262);
  });

  it("블로그 맵에 10편이 있어야 한다", () => {
    expect(map.posts.length).toBe(10);
  });

  it("모든 개념이 최소 1편의 블로그 글에 매핑되어야 한다", () => {
    const allConceptIds = catalog.skills.flatMap((s) =>
      s.concepts.map((c) => c.id)
    );
    const coveredIds = new Set(map.posts.flatMap((p) => p.concepts_covered));
    const missing = allConceptIds.filter((id) => !coveredIds.has(id));

    if (missing.length > 0) {
      console.log(`\n누락된 개념 (${missing.length}개):`);
      missing.forEach((id) => console.log(`  - ${id}`));
    }

    expect(missing).toEqual([]);
  });

  it("각 글은 해당 스킬의 개념만 커버해야 한다", () => {
    const violations: string[] = [];

    for (const post of map.posts) {
      const skill = catalog.skills.find((s) => s.id === post.skill);
      if (!skill) continue;

      const validIds = new Set(skill.concepts.map((c) => c.id));
      const invalid = post.concepts_covered.filter((id) => !validIds.has(id));

      if (invalid.length > 0) {
        violations.push(
          `${post.number}편(${post.skill}): 잘못된 개념 ${invalid.join(", ")}`
        );
      }
    }

    expect(violations).toEqual([]);
  });

  it("커버리지 퍼센트를 출력한다", () => {
    const allConceptIds = catalog.skills.flatMap((s) =>
      s.concepts.map((c) => c.id)
    );
    const coveredIds = new Set(map.posts.flatMap((p) => p.concepts_covered));
    const covered = allConceptIds.filter((id) => coveredIds.has(id)).length;
    const total = allConceptIds.length;
    const pct = ((covered / total) * 100).toFixed(1);

    console.log(`\n커버리지: ${covered}/${total} (${pct}%)`);

    expect(true).toBe(true);
  });
});
