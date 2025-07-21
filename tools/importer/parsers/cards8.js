/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row
  const rows = [['Cards (cards8)']];

  // Each card is a direct child <div>, containing an <img> with alt text
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));
  cardDivs.forEach(cardDiv => {
    const img = cardDiv.querySelector('img');
    // Reference the image element directly
    let textCell = '';
    if (img && img.getAttribute('alt') && img.getAttribute('alt').trim().length > 0) {
      // Wrap the alt text in a <p> as a semantic text container
      const p = document.createElement('p');
      p.textContent = img.getAttribute('alt');
      textCell = p;
    }
    rows.push([
      img,
      textCell
    ]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
