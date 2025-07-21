/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main container
  const container = element.querySelector('.container');
  if (!container) return;

  // Locate the 2 main grid cells (expecting left: text/buttons, right: images)
  const gridLayout = container.querySelector('.grid-layout');
  if (!gridLayout) return;

  // Get the immediate direct children of the grid
  const gridCells = gridLayout.querySelectorAll(':scope > div');
  if (gridCells.length < 2) return;
  const leftCell = gridCells[0];
  const rightCell = gridCells[1];

  // Extract heading (first h1-h6)
  const heading = leftCell.querySelector('h1, h2, h3, h4, h5, h6');
  // Extract subheading (first p)
  const subheading = leftCell.querySelector('p');
  // Extract button group (if present)
  const buttonGroup = leftCell.querySelector('.button-group');

  // Get the right-side images grid
  const imagesGrid = rightCell.querySelector('.grid-layout');
  if (!imagesGrid) return;

  const images = Array.from(imagesGrid.querySelectorAll('img'));
  if (images.length === 0) return;

  // Compose the header row
  const rows = [['Carousel']];

  // For each image, create a row [image, text content (heading, subheading, buttons)]
  images.forEach((img) => {
    const textContent = [];
    if (heading) textContent.push(heading);
    if (subheading) textContent.push(subheading);
    if (buttonGroup) textContent.push(buttonGroup);
    rows.push([
      img,
      textContent.length > 0 ? textContent : ''
    ]);
  });

  // Create the carousel block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}
