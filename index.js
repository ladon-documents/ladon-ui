import fs from "fs";
import bundle from "./bundler.mjs";
import zipper from "./zipper.mjs";
import packageJson from "./package.json" assert { type: "json" };
import { exec } from "child_process";

const targetPath = "./node_modules/@mind";
const destinationPath = "./dist/root/core-mf/";
const bundleZip = "bundle.zip";
const uploadsDir = "uploads";

function printResponse(response) {
  console.info(response);
}

function rimrafNodeModules(path) {
  fs.readdirSync(path).forEach((mf) => {
    if (fs.existsSync(`${path}${mf}/node_modules`)) {
      fs.rmSync(`${path}${mf}/node_modules`, { recursive: true });
    }
  });
}

function cleanup() {
  if (fs.existsSync("dist")) {
    fs.rmSync("dist", { recursive: true });
  }

  if (fs.existsSync(bundleZip)) {
    fs.rmSync(bundleZip);
  }

  if (fs.existsSync(uploadsDir)) {
    fs.rmSync(uploadsDir, { recursive: true });
  }

  console.info(`All clean here`);
}

function requestTgz() {
  const { dependencies } = packageJson;

  if (dependencies) {
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }

    Object.keys(dependencies).forEach((key) => {
      exec(`npm pack ${key}`, packCallback);
    });
  }
}

function packCallback(payload) {
  if (payload == null) {
    exec("mv *.tgz uploads");
    return;
  }

  throw payload;
}

async function run() {
  try {
    // printResponse(await bundle.bundleAndSync(targetPath, destinationPath))
    // printResponse(`Next: clean up all unnecessary node_modules in ${destinationPath}`)
    // rimrafNodeModules(destinationPath)
    // printResponse(await zipper.zip(bundleZip))
    printResponse(requestTgz());
    printResponse(await zipper.zip("uploads.zip", "./uploads"));
  } catch (e) {
    console.error(e);
  }
}

export { cleanup, run };
