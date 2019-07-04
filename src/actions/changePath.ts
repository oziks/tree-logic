import { TreeNodeExtra, TreeNode } from "../types";
import unflatten from "../nodes/unflatten";
import flatten from "../nodes/flatten";
import { parentPath, depthPath } from "../helpers/path";

const changePath = (
  node: TreeNodeExtra,
  nodes: Array<TreeNodeExtra>,
  newPath: string
): Array<TreeNodeExtra> => {
  if (newPath.indexOf(node.path) === 0) {
    throw Error("The parent cannot become his own child.");
  }

  const newParentPath = parentPath(newPath);
  const newParentDepthPath = depthPath(newParentPath);

  if (newParentDepthPath > 0 && !nodes.find(n => n.path === newParentPath)) {
    throw Error("The parent of new path does not exists.");
  }

  const unflattenNodes = unflatten(nodes);

  const pickTree = (nodes: Array<TreeNode>, path: Array<number>): TreeNode => {
    const index = path.shift();
    if (path.length > 0) {
      return pickTree(nodes[index].children, path);
    }

    const pickNode = nodes[index];

    delete nodes[index];

    return pickNode;
  };

  const insertTree = (
    nodes: Array<TreeNode>,
    node: TreeNode,
    path: Array<number>
  ): Array<TreeNode> => {
    const index = path.shift();
    if (path.length > 0) {
      nodes[index].children = insertTree(
        nodes[index].children || [],
        node,
        path
      );

      return nodes;
    }

    nodes.splice(index, 0, node);

    return nodes;
  };

  const treeNode = pickTree(
    unflattenNodes,
    node.path.split(".").map(i => parseInt(i, 10))
  );

  const newNodes = insertTree(
    unflattenNodes,
    treeNode,
    newPath.split(".").map(i => parseInt(i, 10))
  );

  return flatten(newNodes);
};

export default changePath;
