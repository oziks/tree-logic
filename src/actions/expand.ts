import { TreeNodeExtra } from "../types";

const expandAction = (
  node: TreeNodeExtra,
  nodes: Array<TreeNodeExtra>,
  options: { propagation: boolean } = { propagation: false }
) => {
  return nodes.map(n => {
    if (n.path !== node.path) {
      if (options.propagation && n.path.indexOf(node.path) === 0) {
        return {
          ...n,
          visible: false
        };
      }

      return n;
    }

    return {
      ...n,
      expanded: !n.expanded
    };
  });
};

export default expandAction;
