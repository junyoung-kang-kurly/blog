import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "기술 블로그 소개",
};

export default function AboutPage() {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-8">About</h1>

      <div className="prose">
        <p>
          안녕하세요! 이 블로그는 개발에 관한 기술과 경험을 공유하는
          공간입니다.
        </p>

        <h2>다루는 주제</h2>
        <ul>
          <li>SpringBoot, Java, Kotlin</li>
          <li>성능 최적화</li>
          <li>프로덕트 엔지니어링</li>
          <li>AI 엔지니어링</li>
          <li>개발 도구 및 워크플로우</li>
        </ul>

        <h2>기술 스택</h2>
        <ul>
          <li>
            <strong>Frameworks</strong>: Spring, JPA, jOOQ, Testcontainers
          </li>
          <li>
            <strong>Distributed &amp; Messaging</strong>: Kafka, EDA, CQRS,
            DDD, Hexagonal Architecture
          </li>
          <li>
            <strong>Storage</strong>: PostgreSQL, MySQL, Redis, BigQuery,
            DataDog, OpenSearch
          </li>
          <li>
            <strong>Geospatial &amp; Routing</strong>: OSRM, PostGIS
          </li>
          <li>
            <strong>Cloud</strong>: AWS, K8S, Docker
          </li>
        </ul>

        <h2>연락처</h2>
        <p>
          질문이나 제안이 있으시면 언제든지 연락해 주세요.
          dev.bonjugi@gmail.com
        </p>
      </div>
    </div>
  );
}
