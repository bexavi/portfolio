import { describe, expect, it } from "vitest";
import { retrieve } from "@/lib/retrieve";

describe("profile retrieval", () => {
  it("finds education passages for study questions", () => {
    expect(retrieve("Where did you study?").some((p) => p.id.startsWith("edu"))).toBe(true);
  });
  it("finds the roles passage for remote work", () => {
    expect(retrieve("Are you open to remote roles?")[0]?.id).toBe("looking");
  });
});
