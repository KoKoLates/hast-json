#!/usr/bin/env node

const { parseOptions } = require('../lib/cliOptions');
const { convertMarkdownToHTML, convertHTMLToMarkdown } = require('../lib/markdownToHtml');
const { convertHTMLToMarkdown } = require('../lib/htmlToMarkdown');
const { errorHandler } = require('../lib/fileUtils');

const options = parseOptions();

try {
  if (options.command === 'md-to-html') {
    convertMarkdownToHTML(options);
  } else if (options.command === 'html-to-md') {
    convertHTMLToMarkdown(options);
  } else {
    throw new Error(`Unknown command: ${options.command}`);
  }
} catch (error) {
  errorHandler(error);
}
