#! /usr/bin/env node

/* Argument parser */
const program = require("commander");

process.env.OUT_DIR = process.env.OUT_DIR || process.cwd();

const { buildCommand } = require("../build");
const { updateCommand } = require("../update");
const { uiCommand } = require("../ui");
const { runCommand } = require("../run");
const { version } = require("../package.json");

function collect(val, memo) {
  memo.push(val);
  return memo;
}

program
  .command("build <username>")
  .description(
    "Build site with your GitHub username. This will be used to customize your site"
  )
  .option("-b, --background [background]", "set the background image")
  .option("-f, --fork", "includes forks with repos")
  .option("-o, --order [order]", "set default order on sort", "asc")
  .option("-s, --sort [sort]", "set default sort for repository", "created")
  .option("-t, --theme [theme]", "specify a theme to use", "light")

  .option("-c, --codepen [username]", "specify codepen username")
  .option("-d, --dev [username]", "specify dev username")
  .option("-D, --dribbble [username]", "specify dribbble username")
  .option("-e, --email [email]", "specify email")
  .option("-F, --facebook [username]", "specify facebook username")
  .option(
    "-g, --gradient [direction,color1,color2...]",
    "specify your preferred gradient"
  )
  .option("-i, --initials [initials]", "specify your initials")
  .option("-I, --instagram [username]", "specify instagram username")
  .option("-k, --keybase [username]", "specify keybase username")
  .option("-m, --medium [username]", "specify medium username")
  .option("-p, --pinterest [username]", "specify pinterest username")
  .option("-r, --reddit [username]", "specify reddit username")
  .option("-S, --snapchat [username]", "specify snapchat username")
  .option("-E, --stackexchange [user id]", "specify stackexchange user id")
  .option("-a, --steam [username]", "specify steam username")
  .option("-T, --telegram [username]", "specify telegram username")
  .option("-u, --tumblr [username]", "specify tumblr username")
  .option("-w, --twitch [username]", "specify twitch username")
  .option("-W, --twitter [username]", "specify twitter username")
  .option("-x, --xda [user id]", "specify xda user id")
  .option("-y, --youtube [channel id]", "specify youtube channel id")
  .action(buildCommand);

program
  .command("update")
  .description("Update user and repository data")
  .action(updateCommand);

program
  .command("ui")
  .description("Create and Manage your portfolio with ease")
  .action(uiCommand);

program
  .command("run")
  .description("Run build files")
  .option("-p, --port [port]", "provide a port for localhost, default is 3000")
  .action(runCommand);

program.on("command:*", () => {
  console.log("Unknown Command: " + program.args.join(" "));
  program.help();
});

program
  .version(version, "-v --version")
  .usage("<command> [options]")
  .parse(process.argv);

if (program.args.length === 0) {
  program.help();
}
