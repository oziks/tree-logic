import { TreeNodeExtra, TreeNode } from "../types";

const expandAction = (
  node: TreeNodeExtra,
  nodes: Array<TreeNodeExtra>
): Array<TreeNodeExtra> => {
  return nodes.map(n => {
    if (n.path === node.path) {
      return {
        ...n,
        expanded: !n.expanded
      };
    }

    if (n.path.indexOf(node.path) === 0) {
      return {
        ...n,
        visible: false
      };
    }

    return n;
  });
};

export default expandAction;
