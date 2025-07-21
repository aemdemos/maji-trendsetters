/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: only one column, 'Table'
  const headerRow = ['Table'];
  // Columns header row: two columns
  const columnsRow = ['Question', 'Answer'];

  // Find all '.divider' children (each contains a grid with Q/A)
  const dividers = Array.from(element.querySelectorAll(':scope > .divider'));

  // For each divider, extract question and answer elements
  const rows = dividers.map(divider => {
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return ['', ''];
    const gridChildren = Array.from(grid.children);
    const question = gridChildren[0] || '';
    const answer = gridChildren[1] || '';
    return [question, answer];
  });

  // Compose the table, with first row as header (single column),
  // second row as column names, remaining as content rows
  const cells = [
    headerRow,
    columnsRow,
    ...rows
  ];

  // Use createTable to build the table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
