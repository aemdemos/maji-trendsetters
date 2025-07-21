/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate column divs
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));
  // The block header should exactly match the component name
  const headerRow = ['Columns (columns28)'];
  // Each column is a cell in the second row; retain the original divs as cells
  const contentRow = columnDivs.map(col => col);
  // Build table block
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  // Replace the original block with the new table
  element.replaceWith(table);
}
