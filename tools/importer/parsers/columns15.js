/* global WebImporter */
export default function parse(element, { document }) {
  // Find the container with the grid
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Header row: must be a single cell (array of 1)
  const headerRow = ['Columns (columns15)'];
  // Content row: one cell per column
  const contentRow = columns;
  
  // Build the cells array
  const cells = [headerRow, contentRow];

  // Create the block
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Fix header row colspan to span all columns (critical fix)
  const th = table.querySelector('th');
  if (th && columns.length > 1) {
    th.setAttribute('colspan', columns.length);
  }

  // Replace the original element
  element.replaceWith(table);
}
