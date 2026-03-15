import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useReducedMotionPref } from "@/hooks/useReducedMotionPref";

describe("useReducedMotionPref", () => {
  it("returns false when matchMedia reports no reduced-motion preference", () => {
    // setup.ts already mocks matchMedia to return matches: false
    const { result } = renderHook(() => useReducedMotionPref());
    expect(result.current).toBe(false);
  });

  it("returns a boolean value", () => {
    const { result } = renderHook(() => useReducedMotionPref());
    expect(typeof result.current).toBe("boolean");
  });
});
