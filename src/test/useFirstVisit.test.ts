import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { useFirstVisit } from "@/hooks/useFirstVisit";

describe("useFirstVisit", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("returns true on first visit when nothing is stored", () => {
    const { result } = renderHook(() => useFirstVisit());
    expect(result.current.isFirstVisit).toBe(true);
  });

  it("returns false after markVisited is called", () => {
    const { result } = renderHook(() => useFirstVisit());
    act(() => {
      result.current.markVisited();
    });
    expect(result.current.isFirstVisit).toBe(false);
  });

  it("returns false when the session key already exists", () => {
    sessionStorage.setItem("zeraus_visited", "1");
    const { result } = renderHook(() => useFirstVisit());
    expect(result.current.isFirstVisit).toBe(false);
  });

  it("sets the session key in storage after markVisited", () => {
    const { result } = renderHook(() => useFirstVisit());
    act(() => {
      result.current.markVisited();
    });
    expect(sessionStorage.getItem("zeraus_visited")).toBe("1");
  });
});
