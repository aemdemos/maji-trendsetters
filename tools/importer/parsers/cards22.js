/* global WebImporter */
export default function parse(element, { document }) {
  // Build the header row for the block
  const headerRow = ['Cards (cards22)'];
  const rows = [headerRow];

  // Find all tab panes in the given element
  const tabPanes = element.querySelectorAll(':scope > div.w-tab-pane');
  tabPanes.forEach((tabPane) => {
    // Each tab has a grid of cards
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is a direct child <a>
    const cards = grid.querySelectorAll(':scope > a');
    cards.forEach((card) => {
      // Try to find the image in the card
      let imageElem = card.querySelector('img.cover-image');
      // For cards without an image, use an empty string
      // Collect heading (h3 or .h4-heading) and description (.paragraph-sm)
      let headingElem = card.querySelector('h3, .h4-heading');
      let descElem = card.querySelector('.paragraph-sm');
      // Compose the text cell: heading followed by description, as elements
      const textContent = [];
      if (headingElem) textContent.push(headingElem);
      if (descElem) textContent.push(descElem);
      // If both missing, fallback to the card's textContent (robustness)
      if (textContent.length === 0 && card.textContent.trim()) {
        const fallbackDiv = document.createElement('div');
        fallbackDiv.textContent = card.textContent.trim();
        textContent.push(fallbackDiv);
      }
      rows.push([
        imageElem ? imageElem : '',
        textContent.length === 1 ? textContent[0] : textContent
      ]);
    });
  });
  // Create and replace the block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
