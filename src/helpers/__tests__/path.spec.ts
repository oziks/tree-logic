import {
  comesFromSameTree,
  parentPath,
  depthPath,
  incrementPath,
  decrementPath
} from "../path";

describe("path helpers", () => {
  test("it comesFromSameTree works has expected", () => {
    expect(comesFromSameTree("1", "1.0.2")).toBeTruthy();
    expect(comesFromSameTree("1.0", "2.1")).toBeFalsy();
    expect(comesFromSameTree("1.7", "3")).toBeFalsy();
    expect(comesFromSameTree("1.7.3", "1.7.3.5.1")).toBeTruthy();
  });

  test("it parentPath works has expected", () => {
    expect(parentPath("1")).toEqual(null);
    expect(parentPath("1.0")).toEqual("1");
    expect(parentPath("1.7")).toEqual("1");
    expect(parentPath("1.7.3")).toEqual("1.7");
  });

  test("it depthPath works has expected", () => {
    expect(depthPath("1")).toEqual(0);
    expect(depthPath("1.0")).toEqual(1);
    expect(depthPath("1.7")).toEqual(1);
    expect(depthPath("1.7.3")).toEqual(2);
  });

  test("it incrementPath works has expected", () => {
    expect(incrementPath("1")).toEqual("2");
    expect(incrementPath("1.0")).toEqual("1.1");
    expect(incrementPath("1.7")).toEqual("1.8");
    expect(incrementPath("1.7.3")).toEqual("1.7.4");
    expect(incrementPath("1.0", 0)).toEqual("1.1");
    expect(incrementPath("1.7", 1)).toEqual("1.8");
    expect(incrementPath("1.7.3", 2)).toEqual("1.7.4");

    expect(() => incrementPath("1", 2)).toThrowError(
      "Unabled to increment path for this depth."
    );
  });

  test("it decrementPath works has expected", () => {
    expect(decrementPath("1")).toEqual("0");
    expect(decrementPath("1.7")).toEqual("1.6");
    expect(decrementPath("1.7.3")).toEqual("1.7.2");

    expect(() => decrementPath("1.0")).toThrowError(
      "Unabled to decrement a zero level path."
    );

    expect(() => decrementPath("1.7.0")).toThrowError(
      "Unabled to decrement a zero level path."
    );
  });
});
