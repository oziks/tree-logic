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

    expect(result[0]).toHaveProperty("data", "level 0");
    expect(result[0]).toHaveProperty("children", []);
    expect(result[0]).toHaveProperty("hasChildren", false);
    expect(result[0]).toHaveProperty("path", "0");
    expect(result[0]).toHaveProperty("parent", undefined);
    expect(result[0]).toHaveProperty("depth", 0);
    expect(result[0]).toHaveProperty("expanded", true);
    expect(result[0]).toHaveProperty("visible", true);
    expect(result[0]).toHaveProperty("lastChild", false);

    expect(result[1]).toHaveProperty("data", "level 1");
    expect(result[1]).toHaveProperty("children", ["1.0"]);
    expect(result[1]).toHaveProperty("hasChildren", true);
    expect(result[1]).toHaveProperty("path", "1");
    expect(result[1]).toHaveProperty("parent", undefined);
    expect(result[1]).toHaveProperty("depth", 0);
    expect(result[1]).toHaveProperty("expanded", false);
    expect(result[1]).toHaveProperty("visible", true);
    expect(result[1]).toHaveProperty("lastChild", false);

    expect(result[2]).toHaveProperty("data", "child of level 1");
    expect(result[2]).toHaveProperty("children", []);
    expect(result[2]).toHaveProperty("hasChildren", false);
    expect(result[2]).toHaveProperty("path", "1.0");
    expect(result[2]).toHaveProperty("parent", "1");
    expect(result[2]).toHaveProperty("depth", 1);
    expect(result[2]).toHaveProperty("expanded", true);
    expect(result[2]).toHaveProperty("visible", false);
    expect(result[2]).toHaveProperty("lastChild", true);

    expect(result[3]).toHaveProperty("data", "level 2");
    expect(result[3]).toHaveProperty("children", ["2.0"]);
    expect(result[3]).toHaveProperty("hasChildren", true);
    expect(result[3]).toHaveProperty("path", "2");
    expect(result[3]).toHaveProperty("parent", undefined);
    expect(result[3]).toHaveProperty("depth", 0);
    expect(result[3]).toHaveProperty("expanded", true);
    expect(result[3]).toHaveProperty("visible", true);
    expect(result[3]).toHaveProperty("lastChild", true);

    expect(result[4]).toHaveProperty("data", "child of level 2");
    expect(result[4]).toHaveProperty("children", ["2.0.0"]);
    expect(result[4]).toHaveProperty("hasChildren", true);
    expect(result[4]).toHaveProperty("path", "2.0");
    expect(result[4]).toHaveProperty("parent", "2");
    expect(result[4]).toHaveProperty("depth", 1);
    expect(result[4]).toHaveProperty("expanded", true);
    expect(result[4]).toHaveProperty("visible", true);
    expect(result[4]).toHaveProperty("lastChild", true);

    expect(result[5]).toHaveProperty("data", "child of child of level 2");
    expect(result[5]).toHaveProperty("children", []);
    expect(result[5]).toHaveProperty("hasChildren", false);
    expect(result[5]).toHaveProperty("path", "2.0.0");
    expect(result[5]).toHaveProperty("parent", "2.0");
    expect(result[5]).toHaveProperty("depth", 2);
    expect(result[5]).toHaveProperty("expanded", true);
    expect(result[5]).toHaveProperty("visible", true);
    expect(result[5]).toHaveProperty("lastChild", true);
  });
});
