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
    expect(result).toHaveLength(3);

    (node => {
      // index 0
      expect(node).toHaveProperty("data", "level 0");
      expect(node).toHaveProperty("children", undefined);
    })(result.shift());

    (node => {
      // index 1
      expect(node).toHaveProperty("data", "level 1");
      expect(node).toHaveProperty("children");
      expect(node.children).toHaveLength(1);

      (children => {
        // children index 0
        expect(children).toHaveProperty("data", "child of level 1");
        expect(children).toHaveProperty("children", undefined);
      })(node.children.pop());
    })(result.shift());

    (node => {
      // index 2
      expect(node).toHaveProperty("data", "level 2");
      expect(node).toHaveProperty("children");
      expect(node.children).toHaveLength(1);

      (children => {
        // children index 0
        expect(children).toHaveProperty("data", "child of level 2");
        expect(children).toHaveProperty("children");
        expect(children.children).toHaveLength(1);

        (children => {
          // children of children index 0
          expect(children).toHaveProperty("data", "child of child of level 2");
          expect(children).toHaveProperty("children", undefined);
        })(children.children.pop());
      })(node.children.pop());
    })(result.shift());
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
