import flatten from "../../nodes/flatten";
import expand from "../expand";

describe("expand action", () => {
  test("it expand has expected", () => {
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

    const flattenNodes = flatten(nodes);
    const nodeToExpand = flattenNodes.find(n => n.path === "2");
    expect(nodeToExpand).toHaveProperty("path", "2");
    expect(nodeToExpand).toHaveProperty("expanded", true);

    const result = expand(nodeToExpand, flattenNodes);

    expect(Array.isArray(result)).toBeTruthy();
    expect(result.length).toEqual(6);

    (node => {
      // index 0
      expect(node).toHaveProperty("data", "level 0");
      expect(node).toHaveProperty("expanded", true);
      expect(node).toHaveProperty("visible", true);
    })(result.shift());

    (node => {
      // index 1
      expect(node).toHaveProperty("data", "level 1");
      expect(node).toHaveProperty("expanded", false);
      expect(node).toHaveProperty("visible", true);
    })(result.shift());

    (node => {
      // index 2
      expect(node).toHaveProperty("data", "child of level 1");
      expect(node).toHaveProperty("expanded", true);
      expect(node).toHaveProperty("visible", false);
    })(result.shift());

    (node => {
      // index 3
      expect(node).toHaveProperty("data", "level 2");
      expect(node).toHaveProperty("expanded", false);
      expect(node).toHaveProperty("visible", true);
    })(result.shift());

    (node => {
      // index 4
      expect(node).toHaveProperty("data", "child of level 2");
      expect(node).toHaveProperty("expanded", true);
      expect(node).toHaveProperty("visible", false);
    })(result.shift());

    (node => {
      // index 5
      expect(node).toHaveProperty("data", "child of child of level 2");
      expect(node).toHaveProperty("expanded", true);
      expect(node).toHaveProperty("visible", false);
    })(result.shift());
  });
});
