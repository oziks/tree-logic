import { TreeNode, TreeNodeExtra } from "../types";

const flattenNodes = (
  nodes: Array<TreeNode>,
  parent: string = undefined,
  depth: number = 0,
  parentExpanded: boolean = true
): Array<TreeNodeExtra> => {
  if (!Array.isArray(nodes) || nodes.length === 0) {
    return [];
  }

  return nodes
    .filter(child => child != null)
    .reduce((flatNodes, node, index) => {
      const { data, children, expanded } = node;

      const cleanChildren =
        (Array.isArray(children) && children.filter(child => child != null)) ||
        [];

      const hasChildren = cleanChildren.length > 0;
      const path = parent ? `${parent}.${index}` : index.toString();
      const nodeExpanded = expanded === undefined ? true : !!expanded;

      const flattenChildren = flattenNodes(
        cleanChildren,
        path,
        depth + 1,
        parentExpanded && nodeExpanded
      );

      const nodeExtra = {
        path,
        data,
        children: flattenChildren
          .filter(child => child.parent === path)
          .map(child => child.path),
        expanded: nodeExpanded,
        visible: parentExpanded,
        parent,
        hasChildren,
        lastChild: nodes.length - 1 === index,
        depth
      };

      return [...flatNodes, nodeExtra, ...flattenChildren];
    }, []);
};

export default flattenNodes;
