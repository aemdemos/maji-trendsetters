/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: only block name, exactly as example
  const headerRow = ['Hero (hero38)'];

  // Find the main two grid children: one is the image, one is the textual content
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  let bgImg = null;
  let content = null;

  if (grid) {
    const children = grid.querySelectorAll(':scope > div');
    children.forEach(div => {
      if (!bgImg) {
        const img = div.querySelector('img');
        if (img) bgImg = img;
      }
      if (!content && div.querySelector('h1')) {
        content = div;
      }
    });
  }

  // Fallbacks if for some reason not found
  if (!bgImg) bgImg = element.querySelector('img');
  if (!content) {
    const h1 = element.querySelector('h1');
    if (h1) content = h1.closest('div');
  }

  // Ensure that we reference existing nodes, not clone or create new ones
  // The image row contains only the img (or nothing if absent)
  const imgRow = [bgImg ? bgImg : ''];
  // The content row contains the div with all headings, paragraph, button, etc (or nothing if absent)
  const contentRow = [content ? content : ''];

  // Compose the final block table
  const cells = [
    headerRow,
    imgRow,
    contentRow,
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}
