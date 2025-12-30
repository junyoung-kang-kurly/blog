"use client";

import { createElement } from "react";
import * as runtime from "react/jsx-runtime";

const getMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

interface MDXContentProps {
  code: string;
}

export function MDXContent({ code }: MDXContentProps) {
  const Component = getMDXComponent(code);
  return createElement(Component);
}
