/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per instructions
  const headerRow = ['Cards (cards12)'];
  const cards = [];
  // Get immediate child divs that represent cards
  const children = Array.from(element.querySelectorAll(':scope > div'));
  children.forEach((child) => {
    // Try to find image (first img descendant)
    const img = child.querySelector('img');
    // Try to find text (look for h3/p in a padded div)
    let textCell = '';
    // Structure is: .utility-position-relative > .utility-padding-all-2rem (contains h3 and p)
    const textWrapper = child.querySelector('.utility-position-relative .utility-padding-all-2rem');
    if (textWrapper) {
      textCell = textWrapper;
    }
    // If no text, cell will be empty string
    // If no image, skip this card (as per spec, image is mandatory)
    if (!img) return;
    cards.push([img, textCell]);
  });
  // Build the table as array of arrays
  const tableData = [headerRow, ...cards];
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}
