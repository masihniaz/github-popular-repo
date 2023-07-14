import { isPopular, debounce } from "./utils";
import { jest } from "@jest/globals";

describe("Utils", () => {
  test("Should display correct label if repository is popular", () => {
    expect(isPopular(210322, 44064)).toEqual("Yes");
    expect(isPopular(10, 20)).toEqual("No");
  });

  jest.useFakeTimers();
  test("Should debounce before 1 second", () => {
    const func = jest.fn();
    const debouncedFunc = debounce(func, 1000);

    debouncedFunc();

    jest.advanceTimersByTime(250);
    debouncedFunc();

    jest.advanceTimersByTime(1100);

    expect(func).toBeCalledTimes(1);
  });
});
