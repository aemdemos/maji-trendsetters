/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Define the header row as in the block requirements
  const headerRow = ['Columns (columns2)'];

  // 2. Find the grid that holds the two columns
  const container = element.querySelector('.container');
  let leftCol, rightCol;
  if (container) {
    const grid = container.querySelector('.grid-layout');
    if (grid) {
      // First cell: the main feature content (big card)
      // Second cell: the vertical stack of secondary content
      // Third cell: the long right-side list
      const gridChildren = Array.from(grid.children);
      // Left: first child (<a> with big image and feature)
      leftCol = gridChildren[0];
      // Right: next two divs, which together have the cards and the vertical list
      // We'll combine them into one container for the right column
      const rightColContainer = document.createElement('div');
      for (let i = 1; i < gridChildren.length; i++) {
        rightColContainer.appendChild(gridChildren[i]);
      }
      rightCol = rightColContainer;
    }
  }
  // Fallback if structure is different or missing
  if (!leftCol || !rightCol) {
    const directDivs = Array.from(element.querySelectorAll(':scope > div'));
    leftCol = directDivs[0] || document.createElement('div');
    rightCol = directDivs[1] || document.createElement('div');
  }

  // 3. Build the content rows
  const contentRow = [leftCol, rightCol];
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // 4. Replace the original element with the block table
  element.replaceWith(table);
}
