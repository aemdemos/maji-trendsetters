/* global WebImporter */
export default function parse(element, { document }) {
  // Correct header row: single cell, as per example
  const headerRow = ['Columns (columns16)'];

  // Locate the two main content columns in the grid
  const grid = element.querySelector('.grid-layout.tablet-1-column');
  let leftCol = null;
  let rightCol = null;
  if (grid && grid.children.length >= 2) {
    leftCol = grid.children[0];
    rightCol = grid.children[1];
  }

  // LEFT COLUMN: eyebrow, h1, description, author, button
  const leftContent = [];
  if (leftCol) {
    const eyebrow = leftCol.querySelector('.eyebrow');
    if (eyebrow) leftContent.push(eyebrow);
    const h1 = leftCol.querySelector('h1');
    if (h1) leftContent.push(h1);
  }
  if (rightCol) {
    const desc = rightCol.querySelector('.rich-text');
    if (desc) leftContent.push(desc);
    const metaRow = rightCol.querySelector('.grid-layout > .flex-horizontal');
    if (metaRow) leftContent.push(metaRow);
    const button = rightCol.querySelector('a.button');
    if (button) leftContent.push(button);
  }

  // RIGHT COLUMN: Both images in a single cell
  const imagesGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  let imageCells = [];
  if (imagesGrid) {
    const imgDivs = Array.from(imagesGrid.children);
    imgDivs.forEach(div => {
      const img = div.querySelector('img');
      if (img) imageCells.push(img);
    });
  }

  // Compose the content row with two columns (cells)
  const columnsRow = [leftContent, imageCells];

  // Build table: header is a single cell row, content is a two-cell row
  const rows = [headerRow, columnsRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
