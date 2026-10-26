"use client";

import { createElement, useMemo, type ComponentProps } from "react";
import * as runtime from "react/jsx-runtime";

// 넓은 표가 모바일에서 페이지 전체를 가로로 밀지 않도록 표만 스크롤시킨다
const components = {
  table: (props: ComponentProps<"table">) => (
    <div className="table-wrapper">
      <table {...props} />
    </div>
  ),
};

const getMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

interface MDXContentProps {
  code: string;
}

export function MDXContent({ code }: MDXContentProps) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return createElement(Component, { components });
}
