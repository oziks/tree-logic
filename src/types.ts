export interface TreeNode {
  data: any;
  children?: Array<TreeNode>;
  expanded?: boolean;
}

export interface TreeNodeExtra {
  data: any;
  children?: Array<string>;
  hasChildren: boolean;
  lastChild: boolean;
  expanded: boolean;
  visible: boolean;
  path: string;
  parent?: string;
  depth: number;
}
