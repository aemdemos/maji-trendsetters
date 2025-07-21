/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the immediate column children
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Compose table rows according to spec
  const tableRows = [
    ['Columns (columns31)'],
    columns
  ];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
