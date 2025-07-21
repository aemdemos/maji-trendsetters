/* global WebImporter */
export default function parse(element, { document }) {
  // Create header row with exact block name
  const headerRow = ['Hero (hero19)'];

  // --- 1. Extract collage/background images ---
  // Find the .grid-layout.desktop-3-column grid containing the collage images
  let collageDiv = null;
  const collageGrid = element.querySelector('.grid-layout.desktop-3-column');
  if (collageGrid) {
    // Get all images that are direct or indirect children of the grid
    const images = collageGrid.querySelectorAll('img');
    if (images.length) {
      collageDiv = document.createElement('div');
      images.forEach(img => collageDiv.appendChild(img));
    }
  }

  // --- 2. Extract content (heading, subheading, CTA) ---
  let contentDiv = null;
  // Find the hero text section (content area)
  // The content is in the .container.small-container.utility-text-align-center
  const contentWrap = element.querySelector('.container.small-container.utility-text-align-center');
  if (contentWrap) {
    contentDiv = document.createElement('div');
    // Heading (h1)
    const h1 = contentWrap.querySelector('h1');
    if (h1) contentDiv.appendChild(h1);
    // Subheading (p)
    const subheading = contentWrap.querySelector('p');
    if (subheading) contentDiv.appendChild(subheading);
    // CTA buttons
    const buttonGroup = contentWrap.querySelector('.button-group');
    if (buttonGroup) contentDiv.appendChild(buttonGroup);
  }

  // Edge case: if no collage or content, ensure cells are not empty (at least blank string)
  const collageCell = collageDiv || '';
  const contentCell = contentDiv || '';

  // Compose the 1-column, 3-row table as specified
  const cells = [
    headerRow,
    [collageCell],
    [contentCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
