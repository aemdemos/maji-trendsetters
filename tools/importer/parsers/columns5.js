/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate column divs (should be 3 for this block)
  const columnDivs = element.querySelectorAll(':scope > div');

  // For each, extract the core image element if present, else fallback to the column div
  const columnCells = Array.from(columnDivs).map((colDiv) => {
    const img = colDiv.querySelector('img');
    if (img) return img;
    return colDiv;
  });

  // Build the table as rows: header, then columns row
  const headerRow = ['Columns (columns5)'];
  const cells = [
    headerRow,
    columnCells
  ];

  // Create and replace with the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
