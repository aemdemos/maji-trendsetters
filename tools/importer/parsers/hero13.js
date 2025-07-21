/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Hero (hero13)'];

  // Find the grid-layout div (should be the first child)
  const gridLayout = element.querySelector(':scope > .w-layout-grid.grid-layout');
  let bgImg = null;
  let contentDiv = null;

  if (gridLayout) {
    // Get direct children (the two grid cells)
    const gridCells = gridLayout.querySelectorAll(':scope > div');
    if (gridCells.length >= 1) {
      // The first cell should contain the image
      const imgDiv = gridCells[0];
      const img = imgDiv.querySelector('img');
      if (img) {
        bgImg = img;
      }
    }
    if (gridCells.length >= 2) {
      // The second cell contains the container with the heading/button
      const container = gridCells[1];
      // Usually there's a .container > div > h1 (etc.)
      // We want the full content (all children), so find the main inner content wrapper
      // Look for the first div inside container
      let mainContent = container.querySelector(':scope > div');
      if (!mainContent) {
        // fallback: use container itself
        mainContent = container;
      }
      contentDiv = mainContent;
    }
  }

  // Build table rows, using '' for any missing data to ensure always 3 rows
  const cells = [
    headerRow,
    [bgImg || ''],
    [contentDiv || '']
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
