const fs = require("fs").promises;

async function read_file(file_path) {
  try {
    const data = await fs.readFile(file_path, "utf-8");
    return data;
  } catch (error) {
    throw new Error(`Error reading file: ${error.message}`);
  }
}

async function write_file(file_path, data) {
  try {
    await fs.writeFile(file_path, data, "utf-8");
    console.log(`AST written to file: ${file_path}`);
  } catch (error) {
    throw new Error(`Error writing output file: ${error.message}`);
  }
}

module.exports = { read_file, write_file };
