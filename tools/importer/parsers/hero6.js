/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Hero (hero6)'];

  // Row 2: Background image (optional)
  // Get the background image from the absolutely-positioned cover image
  let bgImg = element.querySelector('.utility-position-relative .cover-image.utility-position-absolute');
  if (!bgImg) {
    // fallback: get any .cover-image inside .utility-position-relative
    const rel = element.querySelector('.utility-position-relative');
    if (rel) {
      bgImg = rel.querySelector('img');
    }
  }

  // Row 3: Content (title, subheading, CTA, etc.)
  // Get the .card-body (contains hero content)
  const cardBody = element.querySelector('.card-body');
  let contentCell = [];
  if (cardBody) {
    // Get the inner grid (contains the left image and right content)
    const grid = cardBody.querySelector('.grid-layout');
    if (grid) {
      // This grid has two children: [side-image, right-content]
      // We want to keep only the right-content (the column with h2, etc)
      const rightCol = Array.from(grid.children).find(
        (col) => col.querySelector('h2')
      );
      if (rightCol) {
        contentCell = [rightCol];
      } else {
        // fallback: use entire grid content
        contentCell = [grid];
      }
    } else {
      // fallback: use all of cardBody
      contentCell = [cardBody];
    }
  }

  const rows = [
    headerRow,
    [bgImg ? bgImg : ''],
    [contentCell]
  ];

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
