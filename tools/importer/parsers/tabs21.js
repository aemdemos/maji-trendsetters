/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the tab menu and content containers
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabContent = element.querySelector('.w-tab-content');
  if (!tabMenu || !tabContent) return;
  // Labels
  const tabLinks = Array.from(tabMenu.querySelectorAll('a'));
  const tabLabels = tabLinks.map((a) => {
    const div = a.querySelector('div');
    return div ? div.textContent.trim() : a.textContent.trim();
  });
  // Panes
  const tabPanes = Array.from(tabContent.querySelectorAll('.w-tab-pane'));
  // Compose rows: first row is a single cell header; each subsequent row is [label, content]
  const rows = [];
  rows.push(['Tabs']); // single cell header row
  for (let i = 0; i < tabLabels.length; i++) {
    const label = tabLabels[i];
    const pane = tabPanes[i];
    let contentElem = null;
    if (pane) {
      // Use the first element child as main content if there is one, else the pane itself
      const firstElem = Array.from(pane.children).find((el) => el.nodeType === 1);
      contentElem = firstElem || pane;
    }
    rows.push([label, contentElem]);
  }
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
