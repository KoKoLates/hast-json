const yargs = require('yargs');

function parseOptions() {
  return yargs
    .command('md-to-html', 'Convert Markdown to HTML', {
      input: {
        alias: 'i',
        describe: 'Input Markdown file or directory',
        demandOption: true,
        type: 'string'
      },
      output: {
        alias: 'o',
        describe: 'Output HTML file or directory',
        type: 'string'
      },
      css: {
        alias: 'c',
        describe: 'Path to custom CSS file',
        type: 'string'
      }
    })
    .command('html-to-md', 'Convert HTML to Markdown', {
      input: {
        alias: 'i',
        describe: 'Input HTML file or directory',
        demandOption: true,
        type: 'string'
      },
      output: {
        alias: 'o',
        describe: 'Output Markdown file or directory',
        type: 'string'
      }
    })
    .help()
    .argv;
}

module.exports = { parseOptions };
