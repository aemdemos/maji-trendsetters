/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (the direct columns wrapper)
  const grid = element.querySelector('.grid-layout, .w-layout-grid');
  if (!grid) return;

  // Find all the direct children of the grid; these are the columns/blocks
  const columns = Array.from(grid.children);

  // Find the left content (should have h2 or h3)
  const leftDiv = columns.find(col =>
    Array.from(col.querySelectorAll('h2, h3, h4, p')).length > 0
  );
  // Find the contact list (ul)
  const contactList = columns.find(col => col.tagName === 'UL');
  // Find the image (img)
  let imgCol = columns.find(col => col.tagName === 'IMG' || col.querySelector('img'));
  let imgEl = null;
  if (imgCol) {
    imgEl = imgCol.tagName === 'IMG' ? imgCol : imgCol.querySelector('img');
  }

  // Compose left cell fragment with text and contact list stacked
  const leftCellFrag = document.createDocumentFragment();
  if (leftDiv) leftCellFrag.appendChild(leftDiv);
  if (contactList) leftCellFrag.appendChild(contactList);

  // The header row should be a single cell (one column), not two
  const headerRow = ['Columns (columns17)'];
  // The second row should have two columns
  const contentRow = [leftCellFrag, imgEl ? imgEl : ''];

  // Build the cells array for createTable
  const cells = [headerRow, contentRow];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Fix thead so that header cell spans all columns
  // (Add colspan to the header cell)
  const th = table.querySelector('th');
  if (th && contentRow.length > 1) {
    th.colSpan = contentRow.length;
  }

  // Replace the original element with the new table
  element.replaceWith(table);
}
