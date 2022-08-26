import { resolve, join, dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs-extra";

const outDir = resolve("./dist/" || process.env.OUT_DIR);
const configPath = join(outDir, "config.json");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const defaultConfigPath = resolve(`${__dirname}/default/config.json`);

// Tries to read file from out dir, if not present returns default file contents

async function getFileWithDefaults(file, defaultFile) {
  try {
    await fs.access(file, fs.constants.F_OK);
  } catch (error) {
    const defaultData = await fs.readFile(defaultFile);
    return JSON.parse(defaultData);
  }

  const data = await fs.readFile(file);
  return JSON.parse(data);
}

async function getConfig() {
  return getFileWithDefaults(configPath, defaultConfigPath);
}

export { outDir, getConfig };
