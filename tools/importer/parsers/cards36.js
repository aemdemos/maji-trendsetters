/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards36) block: header row, then n rows, each with [image, all text]
  const headerRow = ['Cards (cards36)'];
  const container = element.querySelector('.container');
  if (!container) return;
  const mainGrid = container.querySelector('.w-layout-grid');
  if (!mainGrid) return;
  const gridChildren = Array.from(mainGrid.children);
  // Featured card (large card)
  const featuredCard = gridChildren.find((ch) => ch.tagName === 'A');
  // Nested grid (smaller cards)
  const nestedGrid = gridChildren.find((ch) => ch.classList && ch.classList.contains('w-layout-grid'));

  // Helper: Extract [img, [text/cta as array]] from a card
  function extractCard(cardEl) {
    const img = cardEl.querySelector('img');
    // Text container
    let textContainer = cardEl.querySelector('.utility-padding-all-2rem') || cardEl;
    // Gather text pieces in order
    const textNodes = [];
    // heading
    let heading = textContainer.querySelector('h2, h3, .h2-heading, .h4-heading');
    if (heading) textNodes.push(heading);
    // description
    let desc = textContainer.querySelector('p');
    if (desc) textNodes.push(desc);
    // CTA (div.button or a.button)
    let cta = textContainer.querySelector('.button');
    if (cta) textNodes.push(cta);
    // The second cell should be an array of these elements (kept in order)
    return [img, textNodes];
  }

  const rows = [headerRow];
  if (featuredCard) {
    rows.push(extractCard(featuredCard));
  }
  if (nestedGrid) {
    const cards = Array.from(nestedGrid.querySelectorAll(':scope > a.utility-link-content-block'));
    cards.forEach((card) => {
      rows.push(extractCard(card));
    });
  }

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
