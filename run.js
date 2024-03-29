import { resolve } from "path";
import express from "express";
const outDir = resolve("./dist/" || process.env.OUT_DIR);
const app = express();
app.use(express.static(`${outDir}`));

function runCommand(program) {
  const port = program.port ? program.port : 3000;

  app.get("/", (req, res) => {
    res.sendFile("/index.html");
  });

  app.listen(port);
  console.log(
    `\nGitfolio running on port ${port}, Navigate to http://localhost:${port} in your browser\n`,
  );
}

export { runCommand };
