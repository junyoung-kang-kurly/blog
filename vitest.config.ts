import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["claude-obsidian-series/**/*.test.ts"],
    globals: true,
  },
});
