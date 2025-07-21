/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout (the columns container)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Each direct child of grid is a column
  const colDivs = Array.from(grid.children);

  // For each column, include the full content of the column (not just the image)
  // This ensures that any text, button, or other content is preserved
  const contentRow = colDivs.map(col => col);

  // Table header as specified: exactly one cell as a single array entry
  const headerRow = ['Columns (columns30)'];

  // Build the table
  const tableRows = [headerRow, contentRow];

  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
