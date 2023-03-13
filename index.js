import fs from "fs";
import bundle from "./bundler.mjs";
import zipper from "./zipper.mjs";
import packageJson from "./package.json" assert { type: "json" };
import { exec } from "child_process";

const targetPath = "./node_modules/@mind";
const destinationPath = "./dist/root/core-mf/";
const bundleZip = "bundle.zip";
const uploadsDir = "upload";

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

  exec("rm *.zip");

  console.info(`All clean here`);
}

async function requestTgz() {
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
    exec(`mv *.tgz ${uploadsDir}`);
    return;
  }

  throw payload;
}

async function runNodeModules() {
  try {
    printResponse(await bundle.bundleAndSync(targetPath, destinationPath));
    printResponse(
      `Next: clean up all unnecessary node_modules in ${destinationPath}`
    );
    rimrafNodeModules(destinationPath);
    printResponse(await zipper.zip(bundleZip));
  } catch (e) {
    console.error(e);
  }
}

async function runTgz() {
  try {
    printResponse(await requestTgz());
    printResponse(await zipper.zip("upload.zip", uploadsDir));
  } catch (e) {
    console.error(e);
  }
}

export { cleanup, runNodeModules, runTgz };
