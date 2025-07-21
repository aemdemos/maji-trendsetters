/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards24) block with 2 columns: [image | text]
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  const rows = [['Cards (cards24)']];

  cards.forEach((card) => {
    // First column: image (mandatory; can be empty string if truly absent)
    const imgContainer = card.querySelector(':scope > div');
    let image = '';
    if (imgContainer) {
      const img = imgContainer.querySelector('img');
      if (img) image = img;
    }

    // Second column: structured text content (tag/date line and heading)
    const textParts = [];
    // tag/date (optional): always comes before heading
    const infoDiv = card.querySelector('.flex-horizontal');
    if (infoDiv) textParts.push(infoDiv);
    // heading (mandatory)
    const heading = card.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) textParts.push(heading);
    
    rows.push([
      image,
      textParts.length === 1 ? textParts[0] : textParts
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
