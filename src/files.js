const fs = require("fs").promises;

/**
 * Reads the content of a file asynchronously.
 * @param {string} file_path - The path to the input file.
 * @returns {Promise<string>} - A promise that resolves to the content of the file.
 */
async function read_file(file_path) {
  try {
    const data = await fs.readFile(file_path, "utf-8");
    return data;
  } catch (error) {
    throw new Error(`Error reading file: ${error.message}`);
  }
}

/**
 * Writes data to a file asynchronously.
 * @param {string} file_path - The path to the output file.
 * @param {string} data - The data to be written to the file.
 * @returns {Promise<void>} - A promise that resolves once the file is written.
 */
async function write_file(file_path, data) {
  try {
    await fs.writeFile(file_path, data, "utf-8");
    console.log(`AST written to file: ${file_path}`);
  } catch (error) {
    throw new Error(`Error writing output file: ${error.message}`);
  }
}

module.exports = { read_file, write_file };
