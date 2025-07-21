/* global WebImporter */
export default function parse(element, { document }) {
  // Compose header row
  const headerRow = ['Accordion'];
  const rows = [];
  // Select each accordion item (direct children with .accordion)
  const items = element.querySelectorAll(':scope > div.accordion');
  items.forEach((item) => {
    // Extract the title - .w-dropdown-toggle .paragraph-lg
    let title = '';
    const toggle = item.querySelector('.w-dropdown-toggle');
    if (toggle) {
      const titleDiv = toggle.querySelector('.paragraph-lg');
      title = titleDiv ? titleDiv : document.createTextNode('');
    } else {
      title = document.createTextNode('');
    }
    // Extract the content - nav.accordion-content .rich-text, fallback to nav.accordion-content
    let content = '';
    const contentNav = item.querySelector('nav.accordion-content');
    if (contentNav) {
      const richText = contentNav.querySelector('.rich-text');
      content = richText ? richText : contentNav;
    } else {
      content = document.createTextNode('');
    }
    rows.push([title, content]);
  });
  const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);
  element.replaceWith(table);
}
