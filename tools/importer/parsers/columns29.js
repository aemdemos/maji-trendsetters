/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container for columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  // Get all direct children (columns)
  const columns = Array.from(grid.children);
  // Defensive: support 3 columns layout only
  if (columns.length !== 3) return;
  // Build table: header row and content row with each column's full content
  const cells = [
    ['Columns (columns29)'],
    columns,
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
