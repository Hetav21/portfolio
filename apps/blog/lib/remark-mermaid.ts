import { visit } from 'unist-util-visit';

export function remarkMermaid() {
  return (tree: any) => {
    visit(tree, 'code', (node: any, index: number | undefined, parent: any) => {
      if (node.lang === 'mermaid') {
        if (index === undefined) return;
        parent.children[index] = {
          type: 'mdxJsxFlowElement',
          name: 'Mermaid',
          attributes: [
            {
              type: 'mdxJsxAttribute',
              name: 'chart',
              value: node.value,
            },
          ],
          children: [],
          data: { _mdxExplicitJsx: true },
        };
      }
    });
  };
}
