/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid with two columns
  const outerGrid = element.querySelector(':scope > .w-layout-grid');
  if (!outerGrid) return;

  // Find all immediate children of the main grid
  const gridChildren = Array.from(outerGrid.children);
  // Prepare arrays for possible columns
  let contentCol = null;
  let imageCol = null;

  // First, look for a grid that contains the content (should have a heading)
  for (const child of gridChildren) {
    // If it contains a heading, treat it as the content column
    if (child.querySelector && child.querySelector('h2')) {
      // In this source, there's a 2nd-level grid for content, dig one level deeper
      const possibleInnerGrid = child.classList.contains('w-layout-grid') ? child : null;
      if (possibleInnerGrid) {
        for (const innerChild of possibleInnerGrid.children) {
          if (innerChild.querySelector && innerChild.querySelector('h2')) {
            contentCol = innerChild;
            break;
          }
        }
      } else {
        contentCol = child;
      }
    }
    // If it's an <img>, treat it as the image column
    if (!imageCol && child.tagName === 'IMG') {
      imageCol = child;
    }
  }

  // Fallbacks for edge cases
  if (!contentCol) {
    // Try to find the h2 anywhere deeper in the tree
    const deepContent = element.querySelector('h2');
    if (deepContent) {
      contentCol = deepContent.closest('div');
    }
  }
  if (!imageCol) {
    // Grab the first image in the section
    imageCol = element.querySelector('img');
  }

  // If still missing, create blank cells to preserve structure
  if (!contentCol) {
    contentCol = document.createElement('div');
  }
  if (!imageCol) {
    imageCol = document.createElement('div');
  }

  // Build the block table
  const headerRow = ['Columns (columns23)'];
  const row = [contentCol, imageCol];

  const table = WebImporter.DOMUtils.createTable([headerRow, row], document);
  element.replaceWith(table);
}
