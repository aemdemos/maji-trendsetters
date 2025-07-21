/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Locate the top-level structure
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // 2. Get immediate children: background/image and content
  const gridDivs = grid.querySelectorAll(':scope > div');

  // 3. Extract background image (first grid child, .cover-image)
  let bgImg = '';
  if (gridDivs[0]) {
    const img = gridDivs[0].querySelector('img.cover-image');
    if (img) bgImg = img;
  }

  // 4. Extract card content (second grid child, .card)
  let content = '';
  if (gridDivs[1]) {
    // This grid can nest several layers, grab the .card
    const card = gridDivs[1].querySelector('.card');
    if (card) content = card;
  }

  // 5. Compose table rows
  const headerRow = ['Hero (hero7)'];
  const bgRow = [bgImg || ''];
  const contentRow = [content || ''];
  const cells = [headerRow, bgRow, contentRow];

  // 6. Build and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
