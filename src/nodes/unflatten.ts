import { TreeNode, TreeNodeExtra } from "../types";

const unflattenNodes = (nodes: Array<TreeNodeExtra>): Array<TreeNode> => {
  const unflatten: Array<TreeNode> = [];

  const getChildArray = (
    unflatten: Array<TreeNode>,
    path: Array<number>
  ): Array<TreeNode> => {
    if (path.length === 0) {
      return unflatten;
    }

    if (!unflatten[path[0]]) {
      throw Error(
        `Orphaned child found. The parent with path ${path[0]} is not found.`
      );
    }

    if (!unflatten[path[0]].children) {
      unflatten[path[0]].children = [];
    }

    if (path.length === 1) {
      return unflatten[path[0]].children;
    }

    const parentPath = path.shift();

    return getChildArray(unflatten[parentPath].children, path);
  };

  nodes.forEach(node => {
    const path = node.path.split(".").map(v => parseInt(v, 10));
    const childIndex = path.pop();
    const parent = getChildArray(unflatten, path);

    parent[childIndex] = {
      data: node.data,
      children: undefined,
      expanded: node.expanded
    };
  });

  return unflatten;
};

export default unflattenNodes;
