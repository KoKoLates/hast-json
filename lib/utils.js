const fs = require('fs-extra');
const path = require('path');

function getFiles(inputPath, extension) {
  if (fs.lstatSync(inputPath).isDirectory()) {
    return fs.readdirSync(inputPath)
      .filter(file => file.endsWith(extension))
      .map(file => path.join(inputPath, file));
  } else if (inputPath.endsWith(extension)) {
    return [inputPath];
  } else {
    throw new Error(`No files with extension ${extension} found at ${inputPath}`);
  }
}

function getOutputPath(inputFile, outputPath, newExtension) {
  if (outputPath && fs.lstatSync(outputPath).isDirectory()) {
    return path.join(outputPath, path.basename(inputFile, path.extname(inputFile)) + newExtension);
  } else {
    return path.join(path.dirname(inputFile), path.basename(inputFile, path.extname(inputFile)) + newExtension);
  }
}

function errorHandler(error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}

module.exports = { getFiles, getOutputPath, errorHandler };
