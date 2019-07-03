import flatten from "../../nodes/flatten";
import changePath from "../changePath";

describe("changePath action", () => {
  test("it changePath has expected #1", () => {
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
    const nodeToChangePath = flattenNodes.find(n => n.path === "2.0");
    const result = changePath(nodeToChangePath, flattenNodes, "0");

    expect(result).toHaveLength(6);

    (node => {
      // index 0
      expect(node).toHaveProperty("data", "child of level 2");
      expect(node).toHaveProperty("children", ["0.0"]);
      expect(node).toHaveProperty("hasChildren", true);
      expect(node).toHaveProperty("path", "0");
      expect(node).toHaveProperty("parent", undefined);
      expect(node).toHaveProperty("depth", 0);
      expect(node).toHaveProperty("lastChild", false);
    })(result.shift());

    (node => {
      // index 1
      expect(node).toHaveProperty("data", "child of child of level 2");
      expect(node).toHaveProperty("children", []);
      expect(node).toHaveProperty("hasChildren", false);
      expect(node).toHaveProperty("path", "0.0");
      expect(node).toHaveProperty("parent", "0");
      expect(node).toHaveProperty("depth", 1);
      expect(node).toHaveProperty("lastChild", true);
    })(result.shift());

    (node => {
      // index 2
      expect(node).toHaveProperty("data", "level 0");
      expect(node).toHaveProperty("children", []);
      expect(node).toHaveProperty("hasChildren", false);
      expect(node).toHaveProperty("path", "1");
      expect(node).toHaveProperty("parent", undefined);
      expect(node).toHaveProperty("depth", 0);
      expect(node).toHaveProperty("lastChild", false);
    })(result.shift());

    (node => {
      // index 3
      expect(node).toHaveProperty("data", "level 1");
      expect(node).toHaveProperty("children", ["2.0"]);
      expect(node).toHaveProperty("hasChildren", true);
      expect(node).toHaveProperty("path", "2");
      expect(node).toHaveProperty("parent", undefined);
      expect(node).toHaveProperty("depth", 0);
      expect(node).toHaveProperty("lastChild", false);
    })(result.shift());

    (node => {
      // index 4
      expect(node).toHaveProperty("data", "child of level 1");
      expect(node).toHaveProperty("children", []);
      expect(node).toHaveProperty("hasChildren", false);
      expect(node).toHaveProperty("path", "2.0");
      expect(node).toHaveProperty("parent", "2");
      expect(node).toHaveProperty("depth", 1);
      expect(node).toHaveProperty("lastChild", true);
    })(result.shift());

    (node => {
      // index 5
      expect(node).toHaveProperty("data", "level 2");
      expect(node).toHaveProperty("children", []);
      expect(node).toHaveProperty("hasChildren", false);
      expect(node).toHaveProperty("path", "3");
      expect(node).toHaveProperty("parent", undefined);
      expect(node).toHaveProperty("depth", 0);
      expect(node).toHaveProperty("lastChild", true);
    })(result.shift());
  });

  test("it changePath has expected #2", () => {
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
    const nodeToChangePath = flattenNodes.find(n => n.path === "0");
    const result = changePath(nodeToChangePath, flattenNodes, "2.0.0.0");

    expect(result).toHaveLength(6);

    (node => {
      // index 0
      expect(node).toHaveProperty("data", "level 1");
      expect(node).toHaveProperty("children", ["0.0"]);
      expect(node).toHaveProperty("hasChildren", true);
      expect(node).toHaveProperty("path", "0");
      expect(node).toHaveProperty("parent", undefined);
      expect(node).toHaveProperty("depth", 0);
      expect(node).toHaveProperty("lastChild", false);
    })(result.shift());

    (node => {
      // index 1
      expect(node).toHaveProperty("data", "child of level 1");
      expect(node).toHaveProperty("children", []);
      expect(node).toHaveProperty("hasChildren", false);
      expect(node).toHaveProperty("path", "0.0");
      expect(node).toHaveProperty("parent", "0");
      expect(node).toHaveProperty("depth", 1);
      expect(node).toHaveProperty("lastChild", true);
    })(result.shift());

    (node => {
      // index 5
      expect(node).toHaveProperty("data", "level 2");
      expect(node).toHaveProperty("children", ["1.0"]);
      expect(node).toHaveProperty("hasChildren", true);
      expect(node).toHaveProperty("path", "1");
      expect(node).toHaveProperty("parent", undefined);
      expect(node).toHaveProperty("depth", 0);
      expect(node).toHaveProperty("lastChild", false);
    })(result.shift());

    (node => {
      // index 0
      expect(node).toHaveProperty("data", "child of level 2");
      expect(node).toHaveProperty("children", ["1.0.0"]);
      expect(node).toHaveProperty("hasChildren", true);
      expect(node).toHaveProperty("path", "1.0");
      expect(node).toHaveProperty("parent", "1");
      expect(node).toHaveProperty("depth", 1);
      expect(node).toHaveProperty("lastChild", true);
    })(result.shift());

    (node => {
      // index 1
      expect(node).toHaveProperty("data", "child of child of level 2");
      expect(node).toHaveProperty("children", ["1.0.0.0"]);
      expect(node).toHaveProperty("hasChildren", true);
      expect(node).toHaveProperty("path", "1.0.0");
      expect(node).toHaveProperty("parent", "1.0");
      expect(node).toHaveProperty("depth", 2);
      expect(node).toHaveProperty("lastChild", true);
    })(result.shift());

    (node => {
      // index 2
      expect(node).toHaveProperty("data", "level 0");
      expect(node).toHaveProperty("children", []);
      expect(node).toHaveProperty("hasChildren", false);
      expect(node).toHaveProperty("path", "1.0.0.0");
      expect(node).toHaveProperty("parent", "1.0.0");
      expect(node).toHaveProperty("depth", 3);
      expect(node).toHaveProperty("lastChild", true);
    })(result.shift());
  });

  test("it throw an exception when change is not possible", () => {
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
    const nodeToChangePath = flattenNodes.find(n => n.path === "2.0");

    expect(() =>
      changePath(nodeToChangePath, flattenNodes, "2.0.0")
    ).toThrowError("The parent cannot become his own child.");

    expect(() =>
      changePath(nodeToChangePath, flattenNodes, "0.0.0")
    ).toThrowError("The parent of new path does not exists.");
  });
});
