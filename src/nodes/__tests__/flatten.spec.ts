import flatten from "../flatten";

describe("flatten function", () => {
  test("it flatten has expected", () => {
    const nodes = [
      {
        data: "level 0"
      },
      {
        data: "level 1",
        children: [{ data: "child of level 1" }],
        expanded: false
      },
      {
        data: "level 2",
        children: [
          {
            data: "child of level 2",
            children: [{ data: "child of child of level 2" }]
          }
        ]
      }
    ];

    const result = flatten(nodes);

    expect(Array.isArray(result)).toBeTruthy();
    expect(result.length).toEqual(6);

    (node => {
      // index 0
      expect(node).toHaveProperty("data", "level 0");
      expect(node).toHaveProperty("children", []);
      expect(node).toHaveProperty("hasChildren", false);
      expect(node).toHaveProperty("path", "0");
      expect(node).toHaveProperty("parent", undefined);
      expect(node).toHaveProperty("depth", 0);
      expect(node).toHaveProperty("expanded", true);
      expect(node).toHaveProperty("visible", true);
      expect(node).toHaveProperty("lastChild", false);
    })(result.shift());

    (node => {
      // index 1
      expect(node).toHaveProperty("data", "level 1");
      expect(node).toHaveProperty("children", ["1.0"]);
      expect(node).toHaveProperty("hasChildren", true);
      expect(node).toHaveProperty("path", "1");
      expect(node).toHaveProperty("parent", undefined);
      expect(node).toHaveProperty("depth", 0);
      expect(node).toHaveProperty("expanded", false);
      expect(node).toHaveProperty("visible", true);
      expect(node).toHaveProperty("lastChild", false);
    })(result.shift());

    (node => {
      // index 2
      expect(node).toHaveProperty("data", "child of level 1");
      expect(node).toHaveProperty("children", []);
      expect(node).toHaveProperty("hasChildren", false);
      expect(node).toHaveProperty("path", "1.0");
      expect(node).toHaveProperty("parent", "1");
      expect(node).toHaveProperty("depth", 1);
      expect(node).toHaveProperty("expanded", true);
      expect(node).toHaveProperty("visible", false);
      expect(node).toHaveProperty("lastChild", true);
    })(result.shift());

    (node => {
      // index 3
      expect(node).toHaveProperty("data", "level 2");
      expect(node).toHaveProperty("children", ["2.0"]);
      expect(node).toHaveProperty("hasChildren", true);
      expect(node).toHaveProperty("path", "2");
      expect(node).toHaveProperty("parent", undefined);
      expect(node).toHaveProperty("depth", 0);
      expect(node).toHaveProperty("expanded", true);
      expect(node).toHaveProperty("visible", true);
      expect(node).toHaveProperty("lastChild", true);
    })(result.shift());

    (node => {
      // index 4
      expect(node).toHaveProperty("data", "child of level 2");
      expect(node).toHaveProperty("children", ["2.0.0"]);
      expect(node).toHaveProperty("hasChildren", true);
      expect(node).toHaveProperty("path", "2.0");
      expect(node).toHaveProperty("parent", "2");
      expect(node).toHaveProperty("depth", 1);
      expect(node).toHaveProperty("expanded", true);
      expect(node).toHaveProperty("visible", true);
      expect(node).toHaveProperty("lastChild", true);
    })(result.shift());

    (node => {
      // index 5
      expect(node).toHaveProperty("data", "child of child of level 2");
      expect(node).toHaveProperty("children", []);
      expect(node).toHaveProperty("hasChildren", false);
      expect(node).toHaveProperty("path", "2.0.0");
      expect(node).toHaveProperty("parent", "2.0");
      expect(node).toHaveProperty("depth", 2);
      expect(node).toHaveProperty("expanded", true);
      expect(node).toHaveProperty("visible", true);
      expect(node).toHaveProperty("lastChild", true);
    })(result.shift());
  });
});
