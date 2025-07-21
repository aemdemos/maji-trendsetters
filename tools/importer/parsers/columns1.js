/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout (columns container)
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  // Each direct child of grid is a column: one <img>, one <div> (the text/buttons)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Build the table: first row is always ['Columns (columns1)']
  const headerRow = ['Columns (columns1)'];
  // Second row, each column cell references the existing DOM element
  const columnsRow = columns.map((col) => col);

  // Create the table block
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}