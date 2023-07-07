import { resolve, join, dirname } from "path";
import { fileURLToPath } from "url";
import handlebars from "handlebars";
import fs from "fs-extra";
import { updateHTML } from "./populate.js";
import { getConfig, outDir } from "./utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const assetDir = resolve(`${__dirname}/assets/`);
const config = join(outDir, "config.json");

/**
 * Creates the stylesheet used by the site from a template stylesheet.
 *
 * Theme styles are added to the new stylesheet depending on command line
 * arguments.
 */
async function populateCSS({
  theme = "light",
  background = "https://source.unsplash.com/1280x720/?wallpaper",
} = {}) {
  // Get the theme the user requests. Defaults to 'light'
  theme = `${theme}.css`;
  const template = resolve(assetDir, "index.css");
  const stylesheet = join(outDir, "index.css");

  try {
    await fs.access(outDir, fs.constants.F_OK);
  } catch (error) {
    await fs.mkdir(outDir);
  }

  // Copy over the template CSS stylesheet
  await fs.copyFile(template, stylesheet);

  // Get an array of every available theme
  const themes = await fs.readdir(join(assetDir, "themes"));

  if (!themes.includes(theme)) {
    console.error('Error: Requested theme not found. Defaulting to "light".');
    theme = "light";
  }

  // Read in the theme stylesheet
  let themeSource = fs.readFileSync(join(assetDir, "themes", theme));
  themeSource = themeSource.toString("utf-8");
  const themeTemplate = handlebars.compile(themeSource);
  const styles = themeTemplate({
    background: `${background}`,
  });
  // Add the user-specified styles to the new stylesheet
  await fs.appendFile(stylesheet, styles);

  // Update the config file with the user's theme choice
  const data = await getConfig();
  data[0].theme = theme;
  await fs.writeFile(config, JSON.stringify(data, null, " "));
}

async function populateConfig(opts) {
  const data = await getConfig();
  Object.assign(data[0], opts);
  await fs.writeFile(config, JSON.stringify(data, null, " "));
}

async function buildCommand(username, program) {
  await populateCSS(program);
  let types;
  if (!program.include || !program.include.length) {
    types = ["all"];
  } else {
    types = program.include;
  }

  const opts = {
    sort: program.sort,
    order: program.order,
    includeFork: Boolean(program.fork),
    types,
    codepen: program.codepen,
    dev: program.dev,
    discord: program.discord,
    dribbble: program.dribbble,
    email: program.email,
    facebook: program.facebook,
    gradient: program.gradient,
    initials: program.initials,
    instagram: program.instagram,
    keybase: program.keybase,
    linkedin: program.linkedin,
    medium: program.medium,
    paypal: program.paypal,
    pinterest: program.pinterest,
    reddit: program.reddit,
    snapchat: program.snapchat,
    stackexchange: program.stackexchange,
    steam: program.steam,
    telegram: program.telegram,
    threads: program.threads,
    tvtime: program.tvtime,
    tumblr: program.tumblr,
    twitch: program.twitch,
    twitter: program.twitter,
    xda: program.xda,
    youtube: program.youtube,
  };

  await populateConfig(opts);
  updateHTML(("%s", username), opts);
}

export { buildCommand, populateCSS, populateConfig };
