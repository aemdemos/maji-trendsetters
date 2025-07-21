/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (each column)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Header row must be exactly one cell, per prompt example
  const headerRow = ['Columns (columns9)'];

  // Content row: one cell per column
  const contentRow = columns;

  // Create the table with the correct structure
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
