/**
 * Velog 백업 → Blog 마이그레이션 스크립트
 *
 * 원칙: 원본 콘텐츠는 절대 손상되지 않음
 * - 본문은 이미지 경로만 치환
 * - Frontmatter만 필요한 형식으로 변환
 */

import fs from 'fs';
import path from 'path';

const SOURCE_DIR = '/Users/junyoung.kang/velog-backups/velog-backup/backup/content';
const TARGET_DIR = '/Users/junyoung.kang/blog/content/posts';

// 파일명에서 slug 추출 (영문/숫자만)
function extractSlug(filename) {
  // 확장자 제거
  const name = filename.replace(/\.md$/, '');

  // 영문, 숫자, 하이픈만 추출
  const englishParts = name.match(/[a-zA-Z0-9]+/g);

  if (englishParts && englishParts.length > 0) {
    return englishParts
      .join('-')
      .toLowerCase()
      .replace(/-+/g, '-')
      .substring(0, 50); // 최대 50자
  }

  // 영문이 없으면 해시 사용
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    const char = name.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return `post-${Math.abs(hash).toString(36)}`;
}

// ISO 날짜에서 YYYY-MM-DD 추출
function formatDate(isoDate) {
  if (!isoDate) return new Date().toISOString().split('T')[0];

  // 이미 YYYY-MM-DD 형식이면 그대로
  if (/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) {
    return isoDate;
  }

  // ISO timestamp에서 날짜 부분만 추출
  const date = new Date(isoDate);
  if (isNaN(date.getTime())) {
    return new Date().toISOString().split('T')[0];
  }

  return date.toISOString().split('T')[0];
}

// Frontmatter 파싱 (정규식으로 간단하게)
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);

  if (!match) {
    return { frontmatter: {}, body: content };
  }

  const frontmatterRaw = match[1];
  const body = match[2];

  const frontmatter = {};

  // title 추출
  const titleMatch = frontmatterRaw.match(/^title:\s*"(.*)"\s*$/m);
  if (titleMatch) frontmatter.title = titleMatch[1];

  // description 추출 (여러 줄일 수 있음)
  const descMatch = frontmatterRaw.match(/^description:\s*"(.*)"\s*$/m);
  if (descMatch) frontmatter.description = descMatch[1];

  // date 추출
  const dateMatch = frontmatterRaw.match(/^date:\s*(.+)$/m);
  if (dateMatch) frontmatter.date = dateMatch[1].trim();

  // tags 추출
  const tagsMatch = frontmatterRaw.match(/^tags:\s*\[(.*)\]$/m);
  if (tagsMatch) {
    const tagsStr = tagsMatch[1].trim();
    if (tagsStr) {
      frontmatter.tags = tagsStr.split(',').map(t => t.trim().replace(/^["']|["']$/g, ''));
    } else {
      frontmatter.tags = [];
    }
  } else {
    frontmatter.tags = [];
  }

  return { frontmatter, body };
}

// 새 Frontmatter 생성
function buildFrontmatter(fm) {
  const lines = ['---'];

  // title (그대로 유지)
  lines.push(`title: "${(fm.title || 'Untitled').replace(/"/g, '\\"')}"`);

  // description (그대로 유지 - 원본 손상 금지)
  // YAML에서 백슬래시는 이스케이프 필요
  const desc = (fm.description || '')
    .replace(/\\/g, '\\\\')  // 백슬래시 먼저 이스케이프
    .replace(/"/g, '\\"');   // 따옴표 이스케이프
  lines.push(`description: "${desc}"`);

  // date (형식만 변환)
  lines.push(`date: "${formatDate(fm.date)}"`);

  // published 추가
  lines.push(`published: true`);

  // tags (그대로 유지)
  if (fm.tags && fm.tags.length > 0) {
    lines.push(`tags: [${fm.tags.map(t => `"${t}"`).join(', ')}]`);
  } else {
    lines.push(`tags: []`);
  }

  lines.push('---');
  return lines.join('\n');
}

// 이미지 경로 변환 (본문에서 /images/ → /images/posts/)
function transformImagePaths(body) {
  // ![alt](/images/xxx.png) → ![alt](/images/posts/xxx.png)
  // 이미지 경로만 변환, 다른 텍스트는 절대 건드리지 않음
  return body.replace(/!\[([^\]]*)\]\(\/images\//g, '![$1](/images/posts/');
}

// MDX에서 중괄호 이스케이프 (코드 블록 밖에서만)
// 원본 콘텐츠의 의미는 유지하면서 MDX 파싱 오류만 방지
function escapeBracesOutsideCodeBlocks(body) {
  const codeBlockRegex = /```[\s\S]*?```|`[^`\n]+`/g;
  const codeBlocks = [];

  // 코드 블록을 플레이스홀더로 대체
  let processed = body.replace(codeBlockRegex, (match) => {
    codeBlocks.push(match);
    return `___CODE_BLOCK_${codeBlocks.length - 1}___`;
  });

  // 코드 블록 밖에서 중괄호를 HTML 엔티티로 변환
  // 렌더링 시 원래 문자로 보임 (시각적 손상 없음)
  processed = processed.replace(/\{/g, '&#123;');
  processed = processed.replace(/\}/g, '&#125;');

  // 코드 블록 복원
  for (let i = 0; i < codeBlocks.length; i++) {
    processed = processed.replace(`___CODE_BLOCK_${i}___`, codeBlocks[i]);
  }

  return processed;
}

// 메인 마이그레이션 함수
async function migrate() {
  console.log('=== Velog → Blog 마이그레이션 시작 ===\n');

  // 소스 디렉토리의 모든 md 파일 읽기
  const files = fs.readdirSync(SOURCE_DIR).filter(f => f.endsWith('.md'));
  console.log(`발견된 파일: ${files.length}개\n`);

  // 날짜별로 파일 그룹화 (같은 날짜 처리용)
  const dateCount = {};
  const results = [];

  for (const file of files) {
    const sourcePath = path.join(SOURCE_DIR, file);
    const content = fs.readFileSync(sourcePath, 'utf-8');

    // Frontmatter 파싱
    const { frontmatter, body } = parseFrontmatter(content);

    // 날짜 추출
    const date = formatDate(frontmatter.date);

    // 같은 날짜 카운트
    dateCount[date] = (dateCount[date] || 0) + 1;
    const suffix = dateCount[date] > 1 ? `-${dateCount[date]}` : '';

    // slug 생성
    const slug = extractSlug(file);

    // 새 파일명
    const newFilename = `${date}-${slug}${suffix}.mdx`;

    results.push({
      original: file,
      newFilename,
      date,
      frontmatter,
      body
    });
  }

  // 파일 생성
  let successCount = 0;
  let errorCount = 0;

  for (const item of results) {
    try {
      // 새 Frontmatter 생성
      const newFrontmatter = buildFrontmatter(item.frontmatter);

      // 이미지 경로 변환 (본문의 다른 내용은 절대 수정하지 않음)
      let transformedBody = transformImagePaths(item.body);

      // MDX 중괄호 이스케이프 (코드 블록 밖에서만, 시각적 손상 없음)
      transformedBody = escapeBracesOutsideCodeBlocks(transformedBody);

      // 최종 콘텐츠
      const finalContent = newFrontmatter + '\n' + transformedBody;

      // 파일 저장
      const targetPath = path.join(TARGET_DIR, item.newFilename);
      fs.writeFileSync(targetPath, finalContent, 'utf-8');

      console.log(`✓ ${item.original} → ${item.newFilename}`);
      successCount++;
    } catch (err) {
      console.error(`✗ ${item.original}: ${err.message}`);
      errorCount++;
    }
  }

  console.log(`\n=== 마이그레이션 완료 ===`);
  console.log(`성공: ${successCount}개`);
  console.log(`실패: ${errorCount}개`);
}

migrate().catch(console.error);
