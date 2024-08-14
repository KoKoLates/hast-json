// parser.js
const MarkdownIt = require('markdown-it');
const fs = require('fs');
const path = require('path');

const md = new MarkdownIt()
  .use(require('markdown-it-katex'))          // For math equations
  .use(require('markdown-it-highlightjs'));   // For code syntax highlighting

function parseMarkdown(filePath) {
  const markdown = fs.readFileSync(filePath, 'utf8');
  return md.render(markdown);
}

module.exports = parseMarkdown;
