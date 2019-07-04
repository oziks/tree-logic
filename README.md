# baobab-tree-logic

Tree Logic System.

Many tree management libraries are available for JavaScript. But these libraries are often complicated to customize. Here, I wanted to create a project where the tree logic would have come out of any interface context.

[![NPM Version](https://img.shields.io/npm/v/baobab-tree-logic.svg?style=flat)](https://www.npmjs.com/package/baobab-tree-logic)
[![NPM Downloads](https://img.shields.io/npm/dm/baobab-tree-logic.svg?style=flat)](https://www.npmjs.com/package/baobab-tree-logic)
[![Build Status](https://travis-ci.org/oziks/tree-logic.svg?branch=master)](https://travis-ci.org/oziks/tree-logic)
[![codecov](https://codecov.io/gh/oziks/tree-logic/branch/master/graph/badge.svg)](https://codecov.io/gh/oziks/tree-logic)

## Installation

```bash
$ yarn add baobab-tree-logic
```

## Getting start

To start, your structure will have to respect a defined type called `TreeNode`.

```ts
interface TreeNode {
  data: any; // Your business data
  children?: Array<TreeNode>;
  expanded?: boolean;
}
```

Here is an example of a tree we use for testing:

```js
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
```

This tree will need to be flattened so that you can use it in your applications. To do this, you can use the flattenNodes function.

```js
import { flattenNodes } from "baobab-tree-logic";

const flattenedNodes = flattenNodes(nodes);
```

The `flattenNodes` function will return you an array of elements of type `TreeNodeExtra`.

```ts
interface TreeNodeExtra {
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
```

Here is what the function will have returned to you:

```json
[
  {
    "path": "0",
    "data": "level 0",
    "children": [],
    "expanded": true,
    "visible": true,
    "hasChildren": false,
    "lastChild": false,
    "depth": 0
  },
  {
    "path": "1",
    "data": "level 1",
    "children": ["1.0"],
    "expanded": false,
    "visible": true,
    "hasChildren": true,
    "lastChild": false,
    "depth": 0
  },
  {
    "path": "1.0",
    "data": "child of level 1",
    "children": [],
    "expanded": true,
    "visible": false,
    "parent": "1",
    "hasChildren": false,
    "lastChild": true,
    "depth": 1
  },
  {
    "path": "2",
    "data": "level 2",
    "children": ["2.0"],
    "expanded": true,
    "visible": true,
    "hasChildren": true,
    "lastChild": true,
    "depth": 0
  },
  {
    "path": "2.0",
    "data": "child of level 2",
    "children": ["2.0.0"],
    "expanded": true,
    "visible": true,
    "parent": "2",
    "hasChildren": true,
    "lastChild": true,
    "depth": 1
  },
  {
    "path": "2.0.0",
    "data": "child of child of level 2",
    "children": [],
    "expanded": true,
    "visible": true,
    "parent": "2.0",
    "hasChildren": false,
    "lastChild": true,
    "depth": 2
  }
]
```

## API

The following can be imported from `baobab-tree-logic`.

### `flattenNodes(nodes: Array<TreeNode>, parent: string = undefined, depth: number = 0, parentExpanded: boolean = true): Array<TreeNodeExtra>`

Function that allows you to flatten the tree. It adds attributes to each node of the tree that will allow you to perform actions later.

### `unflattenNodes(nodes: Array<TreeNodeExtra>): Array<TreeNode>`

Function that allows you to funlatten the tree. It deletes the attributes added by the method `flattenNodes`.

### `expandNode(node: TreeNodeExtra, nodes: Array<TreeNodeExtra>): Array<TreeNodeExtra>`

Function that allows to modify the `extended` state of a node of the tree.

### `changeNodePath(node: TreeNodeExtra, nodes: Array<TreeNodeExtra>, newPath: string): Array<TreeNodeExtra>`

Function that allows you to change the path of a node in the tree.
