import unflatten from "../unflatten";

describe("unflatten function", () => {
  test("it unflatten has expected", () => {
    const nodes = [
      {
        data: "level 0",
        children: undefined,
        hasChildren: false,
        path: "0",
        expanded: true,
        visible: true,
        lastChild: false,
        depth: 0
      },
      {
        data: "level 1",
        children: ["1.0"],
        hasChildren: true,
        path: "1",
        expanded: true,
        visible: true,
        lastChild: false,
        depth: 0
      },
      {
        data: "child of level 1",
        hasChildren: false,
        path: "1.0",
        expanded: true,
        visible: true,
        lastChild: true,
        parent: "1",
        depth: 1
      },
      {
        data: "level 2",
        children: ["2.0"],
        hasChildren: true,
        path: "2",
        expanded: true,
        lastChild: true,
        visible: true,
        depth: 0
      },
      {
        data: "child of level 2",
        hasChildren: true,
        path: "2.0",
        expanded: true,
        lastChild: true,
        visible: true,
        parent: "2",
        depth: 1
      },
      {
        path: "2.0.0",
        expanded: true,
        visible: true,
        data: "child of child of level 2",
        hasChildren: false,
        lastChild: true,
        parent: "2.0",
        depth: 2
      }
    ];

    const result = unflatten(nodes);

    expect(Array.isArray(result)).toBeTruthy();
    expect(result.length).toEqual(3);

    expect(result[0]).toHaveProperty("data", "level 0");
    expect(result[0]).toHaveProperty("children", undefined);

    expect(result[1]).toHaveProperty("data", "level 1");
    expect(result[1]).toHaveProperty("children");

    expect(result[1].children.length).toEqual(1);

    expect(result[1].children[0]).toHaveProperty("data", "child of level 1");
    expect(result[1].children[0]).toHaveProperty("children", undefined);

    expect(result[2]).toHaveProperty("data", "level 2");
    expect(result[2]).toHaveProperty("children");

    expect(result[2].children.length).toEqual(1);

    expect(result[2].children[0]).toHaveProperty("data", "child of level 2");
    expect(result[2].children[0]).toHaveProperty("children");
    expect(result[2].children[0].children.length).toEqual(1);

    expect(result[2].children[0].children[0]).toHaveProperty(
      "data",
      "child of child of level 2"
    );
    expect(result[2].children[0].children[0]).toHaveProperty(
      "children",
      undefined
    );
  });

  test("unflatten function with orphan child", () => {
    const nodes = [
      {
        data: "level 0",
        children: ["1.0.0"],
        hasChildren: false,
        parent: "1",
        path: "1.0",
        expanded: true,
        lastChild: true,
        visible: true,
        depth: 1
      }
    ];

    expect(() => {
      unflatten(nodes);
    }).toThrowError(
      "Orphaned child found. The parent with path 1 is not found."
    );
  });
});
