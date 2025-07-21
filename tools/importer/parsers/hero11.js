/* global WebImporter */
export default function parse(element, { document }) {
  // Get all images inside the grid
  const imgs = Array.from(element.querySelectorAll('img'));
  // Only one image should be placed as background in the Hero block – use the first one
  const bgImage = imgs.length > 0 ? imgs[0] : '';

  // No text/heading/subheading/cta content present in this HTML, so content row is empty
  const contentRow = [''];

  // Create the block table: 1 column, 3 rows
  const table = WebImporter.DOMUtils.createTable([
    ['Hero (hero11)'],
    [bgImage],
    contentRow
  ], document);

  // Replace the original element in-place
  element.replaceWith(table);
}
