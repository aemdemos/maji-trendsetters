/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Columns block
  const headerRow = ['Columns (columns26)'];

  // 1. Find the grid layout (side-by-side columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // 2. The left column: all content (author, headings, paragraphs, button)
  // 3. The right column: the image
  const leftCol = columns[0];
  const rightCol = columns[1];

  // Compose cells array as per block spec: first row is header, second row is one cell per column
  const cells = [
    headerRow,
    [leftCol, rightCol]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the section with the block table
  element.replaceWith(block);
}
