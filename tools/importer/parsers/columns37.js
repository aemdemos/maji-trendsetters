/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (these are the columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Header row: exactly 1 column
  const headerRow = ['Columns (columns37)'];
  // Content row: one cell for each div
  const contentRow = columns;

  const cells = [headerRow, contentRow];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
