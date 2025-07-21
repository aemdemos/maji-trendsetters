/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid that contains the columns
  const grid = element.querySelector('.w-layout-grid, .grid-layout');
  if (!grid) return;

  // Get all direct children of the grid as columns
  const columnDivs = Array.from(grid.children);
  if (!columnDivs.length) return;

  // The first row is the header: a single cell with the block name
  const headerRow = ['Columns (columns3)'];
  // The second row has as many columns as the grid contains
  const columnsRow = columnDivs;

  const cells = [headerRow, columnsRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}