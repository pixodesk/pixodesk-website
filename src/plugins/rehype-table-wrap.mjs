/**
 * Wraps every markdown `<table>` in `<div class="table-wrap">`.
 *
 * Markdown tables have no wrapper of their own, which forces a choice between
 * a table that can overflow its column (clipped by the rounded frame) and the
 * `display: block` hack, whose cells then stop short of the container's right
 * edge. With a wrapper the table can stay a real `width: 100%` table — rows
 * always span the full width — while the wrapper carries the frame and scrolls
 * when a wide table cannot squeeze any further.
 */
function walk(node) {
  if (!node.children) return;
  node.children = node.children.map((child) => {
    walk(child);
    if (child.type === 'element' && child.tagName === 'table') {
      return {
        type: 'element',
        tagName: 'div',
        properties: { className: ['table-wrap'] },
        children: [child],
      };
    }
    return child;
  });
}

export function rehypeTableWrap() {
  return (tree) => {
    walk(tree);
  };
}
