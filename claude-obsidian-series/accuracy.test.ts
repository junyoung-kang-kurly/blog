import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "fs";
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

describe("Blog Series Accuracy", () => {
  const catalog = loadCatalog();
  const map = loadBlogMap();

  it("카탈로그의 모든 source_file이 코드베이스에 존재해야 한다", () => {
    const missing: string[] = [];

    for (const skill of catalog.skills) {
      for (const file of skill.source_files) {
        const fullPath = join(catalog.source_repo, file);
        if (!existsSync(fullPath)) {
          missing.push(`${skill.id}: ${file}`);
        }
      }
    }

    if (missing.length > 0) {
      console.log(`\n존재하지 않는 소스 파일 (${missing.length}개):`);
      missing.forEach((m) => console.log(`  - ${m}`));
    }

    expect(missing).toEqual([]);
  });

  it("블로그 글에서 참조하는 파일이 코드베이스에 존재해야 한다", () => {
    const missing: string[] = [];

    for (const post of map.posts) {
      for (const file of post.files_referenced) {
        const fullPath = join(catalog.source_repo, file);
        if (!existsSync(fullPath)) {
          missing.push(`${post.number}편(${post.skill}): ${file}`);
        }
      }
    }

    if (missing.length > 0) {
      console.log(`\n참조 파일 누락 (${missing.length}개):`);
      missing.forEach((m) => console.log(`  - ${m}`));
    }

    expect(missing).toEqual([]);
  });

  it("블로그 글 MDX 파일이 존재해야 한다 (published 상태만)", () => {
    const blogRoot = join(BASE, "..");
    const missing: string[] = [];

    for (const post of map.posts) {
      if (post.status !== "published") continue;
      const fullPath = join(blogRoot, post.file_path);
      if (!existsSync(fullPath)) {
        missing.push(`${post.number}편: ${post.file_path}`);
      }
    }

    if (missing.length > 0) {
      console.log(`\nMDX 파일 누락 (${missing.length}개):`);
      missing.forEach((m) => console.log(`  - ${m}`));
    }

    expect(missing).toEqual([]);
  });

  it("카탈로그 개념의 키워드가 해당 소스 파일에 존재해야 한다", () => {
    const failures: string[] = [];

    for (const skill of catalog.skills) {
      for (const concept of skill.concepts) {
        const fullPath = join(catalog.source_repo, concept.source_file);
        if (!existsSync(fullPath)) continue;

        const content = readFileSync(fullPath, "utf-8").toLowerCase();
        // 개념 이름과 설명에서 키워드 후보를 추출, 하나라도 매치하면 통과
        const nameWords = concept.name.toLowerCase().split(/[\s-]+/).filter((w) => w.length > 2);
        const descWords = concept.description.toLowerCase().split(/[\s-]+/).filter((w) => w.length > 3);
        // 간단한 stemming: -ing, -tion, -ment, -ation 제거한 형태도 후보에 추가
        const stemmed = nameWords
          .map((w) => w.replace(/(ing|tion|ment|ation)$/, ""))
          .filter((w) => w.length > 2);
        const candidates = [...new Set([...nameWords, ...descWords, ...stemmed])];
        const matched = candidates.some((w) => content.includes(w));

        if (!matched) {
          failures.push(`${concept.id}: no keyword match in ${concept.source_file} (tried: ${candidates.slice(0, 5).join(", ")})`);
        }
      }
    }

    if (failures.length > 0) {
      console.log(`\n키워드 불일치 (${failures.length}개):`);
      failures.slice(0, 20).forEach((f) => console.log(`  - ${f}`));
      if (failures.length > 20) {
        console.log(`  ... 외 ${failures.length - 20}개`);
      }
    }

    expect(failures).toEqual([]);
  });
});
