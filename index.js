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

  if (fs.existsSync("tgz.zip")) {
    fs.rmSync("tgz.zip");
  }

  if (fs.existsSync(uploadsDir)) {
    fs.rmSync(uploadsDir, { recursive: true });
  }

  exec("rm *.zip");
  exec("rm *.tgz");

  console.info(`All clean here`);
}

function requestTgz() {
  const promises = [];
  const { dependencies } = packageJson;

  if (dependencies) {
    Object.entries(dependencies).forEach(([key, value]) => {
      promises.push(
        new Promise((resolve, reject) => {
          exec(`npm pack ${key}@${value.slice(1)}`, (payload) => {
            if (payload == null) {
              resolve(payload);
            }

            reject(payload);
          });
        })
      );
    });

    return promises;
  }

  return promises;
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
    await Promise.all(requestTgz());
    exec(`zip ui.zip *.tgz`);
  } catch (e) {
    console.error(e);
  }
}

export { cleanup, runNodeModules, runTgz };
