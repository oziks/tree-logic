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

    expect(result[3]).toHaveProperty("data", "level 2");
    expect(result[3]).toHaveProperty("expanded", false);
    expect(result[3]).toHaveProperty("visible", true);

    expect(result[4]).toHaveProperty("data", "child of level 2");
    expect(result[4]).toHaveProperty("expanded", true);
    expect(result[4]).toHaveProperty("visible", true);

    expect(result[5]).toHaveProperty("data", "child of child of level 2");
    expect(result[5]).toHaveProperty("expanded", true);
    expect(result[5]).toHaveProperty("visible", true);
  });

  test("it expand has expected with propagation", () => {
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

    const result = expand(nodeToExpand, flattenNodes, { propagation: true });

    expect(Array.isArray(result)).toBeTruthy();
    expect(result.length).toEqual(6);

    expect(result[3]).toHaveProperty("data", "level 2");
    expect(result[3]).toHaveProperty("expanded", false);
    expect(result[3]).toHaveProperty("visible", true);

    expect(result[4]).toHaveProperty("data", "child of level 2");
    expect(result[4]).toHaveProperty("expanded", true);
    expect(result[4]).toHaveProperty("visible", false);

    expect(result[5]).toHaveProperty("data", "child of child of level 2");
    expect(result[5]).toHaveProperty("expanded", true);
    expect(result[5]).toHaveProperty("visible", false);
  });
});
