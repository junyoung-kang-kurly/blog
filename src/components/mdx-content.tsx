"use client";

import { createElement, isValidElement, useMemo } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import * as runtime from "react/jsx-runtime";

const getMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const slugify = (value: string) => {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\p{L}\p{N}-]/gu, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

const getNodeText = (node: ReactNode): string => {
  if (typeof node === "string" || typeof node === "number") {
    return node.toString();
  }

  if (Array.isArray(node)) {
    return node.map(getNodeText).join("");
  }

  if (isValidElement(node)) {
    return getNodeText(node.props.children);
  }

  return "";
};

interface MDXContentProps {
  code: string;
}

export function MDXContent({ code }: MDXContentProps) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  const slugCounts = new Map<string, number>();

  const registerSlug = (slug: string) => {
    const count = slugCounts.get(slug) ?? 0;
    slugCounts.set(slug, count + 1);
  };

  const createSlug = (value: string) => {
    const base = slugify(value) || "section";
    const count = slugCounts.get(base) ?? 0;
    slugCounts.set(base, count + 1);
    return count === 0 ? base : `${base}-${count + 1}`;
  };

  const createHeading =
    (Tag: "h2" | "h3" | "h4") =>
    ({
      children,
      ...props
    }: ComponentPropsWithoutRef<"h2">) => {
      const text = getNodeText(children).trim();
      const explicitId =
        typeof props.id === "string" && props.id.length > 0
          ? props.id
          : undefined;
      const id = explicitId ?? createSlug(text || "section");

      if (explicitId) {
        registerSlug(explicitId);
      }

      return createElement(Tag, { ...props, id }, children);
    };

  const components = {
    h2: createHeading("h2"),
    h3: createHeading("h3"),
    h4: createHeading("h4"),
  };

  return createElement(Component, { components });
}
