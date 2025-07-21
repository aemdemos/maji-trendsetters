/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout inside the container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Collect all direct children of the grid as columns
  const columns = Array.from(grid.children);
  const numColumns = columns.length;

  // Header row: should have the same number of cells as the content row
  // First cell: block name, rest: empty strings
  const headerRow = ['Columns (columns14)', ...Array(numColumns - 1).fill('')];

  // Content row: one cell per column
  const contentRow = columns;

  // Compose the cells for the block table
  const cells = [
    headerRow,
    contentRow
  ];

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
