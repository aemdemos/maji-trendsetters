/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards32)'];
  const rows = [headerRow];

  // Each direct child <a> is a card
  const cards = element.querySelectorAll(':scope > a');

  cards.forEach(card => {
    // Image cell: Find first <img> inside this <a>
    const img = card.querySelector('img');

    // Text cell: Find the grid container in each card (usually first/only direct <div> under <a>)
    const grid = card.querySelector(':scope > div');
    let textCell = null;
    if (grid) {
      // In the grid, image is first, then a <div> with all text content (tags, heading, paragraph, etc.)
      // So get the first div in grid that is NOT an image
      const parts = Array.from(grid.children);
      // Find the first DIV after the image
      const textContent = parts.find(child => child.tagName === 'DIV' && !child.querySelector('img'));
      textCell = textContent || null;
    }
    rows.push([img, textCell]);
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
