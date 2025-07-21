/* global WebImporter */
export default function parse(element, { document }) {
  // Create the block table header row as specified
  const headerRow = ['Cards (cards20)'];
  const cells = [headerRow];

  // Find the card within the given element
  // The HTML structure is: wrapper > animated div > card > card-body
  const cardDiv = element.querySelector('.card');
  if (cardDiv) {
    const cardBody = cardDiv.querySelector('.card-body') || cardDiv;
    // Get image (mandatory)
    const image = cardBody.querySelector('img');
    // Get title (heading - optional)
    const title = cardBody.querySelector('.h4-heading') || cardBody.querySelector('h1, h2, h3, h4, h5, h6');
    // Description: for this example, no additional description element exists
    
    // Build the text cell: (heading if exists)
    let textCell = [];
    if (title) textCell.push(title);
    // (If there were more text, we'd add it here)
    if (textCell.length === 1) textCell = textCell[0];

    // Add row: [image, text content]
    cells.push([image, textCell]);
  }

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
