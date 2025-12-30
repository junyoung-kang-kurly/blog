import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "프론트엔드 기술 블로그 소개",
};

export default function AboutPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">About</h1>

      <div className="prose">
        <p>
          안녕하세요! 이 블로그는 프론트엔드 개발에 관한 기술과 경험을 공유하는
          공간입니다.
        </p>

        <h2>다루는 주제</h2>
        <ul>
          <li>React, Next.js 등 프론트엔드 프레임워크</li>
          <li>TypeScript 및 JavaScript</li>
          <li>웹 성능 최적화</li>
          <li>UI/UX 개선 사례</li>
          <li>개발 도구 및 워크플로우</li>
        </ul>

        <h2>기술 스택</h2>
        <p>이 블로그는 다음 기술로 만들어졌습니다:</p>
        <ul>
          <li>
            <strong>Next.js 15</strong> - React 기반 프레임워크
          </li>
          <li>
            <strong>Velite</strong> - MDX 콘텐츠 관리
          </li>
          <li>
            <strong>Tailwind CSS</strong> - 유틸리티 기반 스타일링
          </li>
          <li>
            <strong>Vercel</strong> - 배포 플랫폼
          </li>
        </ul>

        <h2>연락처</h2>
        <p>
          질문이나 제안이 있으시면 언제든지 연락해 주세요.
        </p>
      </div>
    </div>
  );
}
