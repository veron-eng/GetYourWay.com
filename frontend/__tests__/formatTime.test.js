// formatTime.test.ts
import { formatTime } from "@/utils/formatTime";

describe("formatTime", () => {
  it("should correctly format the time", () => {
    const testTime = "2021-08-10T13:45:00.00";
    const result = formatTime(testTime);
    expect(result).toBe("13:45");
  });

  it("should pad single-digit hours and minutes with a 0", () => {
    const testTime = "2021-08-10T03:05:00.00";
    const result = formatTime(testTime);
    expect(result).toBe("03:05");
  });
});
