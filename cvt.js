#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const marked = require('marked');
const TurndownService = require('turndown');
const chalk = require('chalk');

// Initialize TurndownService for HTML to Markdown conversion
const turndownService = new TurndownService();

// Function to convert Markdown to HTML
const convertMarkdownToHTML = (filePath, outputPath, cssPath = null) => {
  if (!fs.existsSync(filePath)) {
    console.log(chalk.red(`File not found: ${filePath}`));
    return;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  let htmlContent = marked(fileContent);

  if (cssPath && fs.existsSync(cssPath)) {
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    htmlContent = `<style>\n${cssContent}\n</style>\n` + htmlContent;
  }

  fs.writeFileSync(outputPath, htmlContent);
  console.log(chalk.green(`Successfully converted to ${outputPath}`));
};

// Function to convert HTML to Markdown
const convertHTMLToMarkdown = (filePath, outputPath) => {
  if (!fs.existsSync(filePath)) {
    console.log(chalk.red(`File not found: ${filePath}`));
    return;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const markdownContent = turndownService.turndown(fileContent);

  fs.writeFileSync(outputPath, markdownContent);
  console.log(chalk.green(`Successfully converted to ${outputPath}`));
};

// Command-line argument handling
const [, , command, ...args] = process.argv;

if (!command) {
  console.log(chalk.red('Please specify a command (md-to-html, html-to-md)'));
  process.exit(1);
}

switch (command) {
  case 'md-to-html':
    args.forEach(filePath => {
      const outputPath = path.join(
        path.dirname(filePath),
        path.basename(filePath, path.extname(filePath)) + '.html'
      );
      convertMarkdownToHTML(filePath, outputPath);
    });
    break;

  case 'md-to-html-with-css':
    const [mdFile, cssFile] = args;
    const outputWithCSS = path.join(
      path.dirname(mdFile),
      path.basename(mdFile, path.extname(mdFile)) + '.html'
    );
    convertMarkdownToHTML(mdFile, outputWithCSS, cssFile);
    break;

  case 'html-to-md':
    args.forEach(filePath => {
      const outputPath = path.join(
        path.dirname(filePath),
        path.basename(filePath, path.extname(filePath)) + '.md'
      );
      convertHTMLToMarkdown(filePath, outputPath);
    });
    break;

  default:
    console.log(chalk.red(`Unknown command: ${command}`));
    process.exit(1);
}
