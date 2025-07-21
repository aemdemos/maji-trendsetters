/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards10)'];
  const cardLinks = Array.from(element.querySelectorAll(':scope > a.card-link'));

  const rows = cardLinks.map(card => {
    // First cell: image element (reference existing img)
    let imgEl = null;
    const imageContainer = card.querySelector('.utility-aspect-3x2');
    if (imageContainer) {
      imgEl = imageContainer.querySelector('img');
    }

    // Second cell: all text content including tag, heading, and paragraph, in order and referencing existing elements
    const textCell = document.createElement('div');
    const textContainer = card.querySelector('.utility-padding-all-1rem');
    if (textContainer) {
      // Tag (optional)
      const tagDiv = textContainer.querySelector('.tag');
      if (tagDiv) textCell.appendChild(tagDiv);
      // Heading (mandatory)
      const heading = textContainer.querySelector('h3');
      if (heading) textCell.appendChild(heading);
      // Paragraph/Description (mandatory)
      const desc = textContainer.querySelector('p');
      if (desc) textCell.appendChild(desc);
    }
    return [imgEl, textCell];
  });

  const tableRows = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
