import chokidar from "chokidar";
import { fork, ChildProcess } from "child_process";

let serverProcess: ChildProcess | null = null;

function startServer() {
  if (serverProcess) {
    serverProcess.kill();
  }
  serverProcess = fork("./server.ts", [], {
    stdio: "inherit",
  });
}

startServer();

const watcher = chokidar.watch(["./", "../../packages/trpc"], {
  ignored: /node_modules|\.git/,
  persistent: true,
});

watcher.on("change", (path) => {
  console.log(`File changed: ${path}. Restarting server...`);
  startServer();
});

process.on("SIGINT", () => {
  if (serverProcess) serverProcess.kill();
  process.exit();
});
