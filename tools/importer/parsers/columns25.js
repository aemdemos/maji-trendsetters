/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Find the main grid containing title, quote, and attribution layout
  const container = element.querySelector('.container');
  if (!container) return;

  // Find all immediate children grids
  const grids = container.querySelectorAll('.grid-layout');
  if (grids.length < 2) return;

  // First grid: contains the heading and quote
  const topGrid = grids[0];
  // Second grid: contains the horizontal layout with avatar/author and icon
  const bottomGrid = grids[1];

  // --- LEFT COLUMN ---
  // Compose a fragment for the left column: heading + avatar/author
  const leftFrag = document.createElement('div');
  // Add heading
  const heading = topGrid.querySelector('.h2-heading');
  if (heading) leftFrag.appendChild(heading);

  // In the bottomGrid, the flex with avatar/author is the second child (after the divider)
  const flexRows = bottomGrid.querySelectorAll('.flex-horizontal');
  if (flexRows.length > 0) {
    leftFrag.appendChild(flexRows[0]);
  }

  // --- RIGHT COLUMN ---
  // Compose right column: quote + (logo icon)
  const rightFrag = document.createElement('div');
  // Add quote
  const quote = topGrid.querySelector('.paragraph-lg');
  if (quote) rightFrag.appendChild(quote);

  // Add the icon (last child of bottomGrid)
  const icon = bottomGrid.querySelector('.utility-display-inline-block');
  if (icon) rightFrag.appendChild(icon);

  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns25)'],
    [leftFrag, rightFrag]
  ], document);

  element.replaceWith(table);
}
