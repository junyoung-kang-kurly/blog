"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  contentSelector?: string;
  headingSelector?: string;
  title?: string;
}

export function TableOfContents({
  contentSelector = "#post-content",
  headingSelector = "h2, h3",
  title = "Contents",
}: TableOfContentsProps) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const container = document.querySelector(contentSelector);

    if (!container) {
      setItems([]);
      setActiveId(null);
      return;
    }

    const headingElements = Array.from(
      container.querySelectorAll<HTMLElement>(headingSelector)
    ).filter((heading) => heading.id);

    const nextItems = headingElements
      .map((heading) => ({
        id: heading.id,
        text: heading.textContent?.trim() ?? "",
        level: Number(heading.tagName.replace("H", "")),
      }))
      .filter((item) => item.text);

    setItems(nextItems);
    setActiveId(nextItems[0]?.id ?? null);

    if (headingElements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );

        if (visible.length > 0) {
          setActiveId((visible[0].target as HTMLElement).id);
        }
      },
      {
        rootMargin: "0px 0px -70% 0px",
      }
    );

    headingElements.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [contentSelector, headingSelector]);

  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Table of contents"
      className="mb-8 rounded border border-border bg-muted px-4 py-3"
    >
      <p className="text-xs font-semibold text-muted-foreground mb-2">
        {title}
      </p>
      <ul className="space-y-1 text-sm">
        {items.map((item) => {
          const indentClass =
            item.level === 3 ? "ml-4" : item.level === 4 ? "ml-8" : "";
          const isActive = activeId === item.id;

          return (
            <li key={item.id} className={indentClass}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`block rounded px-1 py-0.5 transition-colors ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
