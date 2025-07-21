/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare table rows array with header
  const rows = [['Cards']];

  // Select all direct children (card containers)
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach(cardDiv => {
    // For each card: find the paragraph(s) for content
    const ps = cardDiv.querySelectorAll('p');
    const cellContent = [];
    ps.forEach(p => {
      cellContent.push(p);
    });
    // Only add the cell if there is content
    if (cellContent.length > 0) {
      rows.push([cellContent.length === 1 ? cellContent[0] : cellContent]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
