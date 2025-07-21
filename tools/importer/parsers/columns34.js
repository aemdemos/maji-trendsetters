/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout that contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the immediate children of the grid (columns)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // The header row must have exactly one column with the correct name
  const headerRow = ['Columns (columns34)'];

  // The next row should have as many columns as needed
  const contentRow = columns;

  // Build the cells array: single cell for header, then the content row
  const cells = [headerRow, contentRow];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
