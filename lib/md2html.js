const fs = require('fs-extra');
const path = require('path');
const marked = require('marked');

function convertMarkdownToHTML(options) {
  const { input, output, css } = options;

  if (!fs.existsSync(input)) {
    throw new Error(`Input file or directory not found: ${input}`);
  }

  let cssContent = '';
  if (css && fs.existsSync(css)) {
    cssContent = `<style>\n${fs.readFileSync(css, 'utf8')}\n</style>\n`;
  }

  const files = getFiles(input, '.md');
  files.forEach(filePath => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let htmlContent = marked(fileContent);
    htmlContent = cssContent + htmlContent;

    const outputFilePath = getOutputPath(filePath, output, '.html');
    fs.outputFileSync(outputFilePath, htmlContent);
    console.log(`Converted ${filePath} to ${outputFilePath}`);
  });
}

module.exports = { convertMarkdownToHTML };
