import fs from "fs";
import archiver from "archiver";

let output = undefined;
let archive = undefined;

const makeZipAndSync = (d) => {
  archive.pipe(output);
  archive.directory(d, false);
  archive.finalize();
};

const zipper = {
  zip(zipName, directory = "./dist") {
    return new Promise((resolve, reject) => {
      if (zipName) {
        output = fs.createWriteStream(zipName);
        archive = archiver("zip");

        output.on("close", () => {
          resolve(`${archive.pointer()} total bytes`);
        });

        archive.on("error", (err) => {
          reject(err);
        });

        makeZipAndSync(directory);
      } else {
        reject(
          new TypeError(`Please pass in a zip name, for example: example.zip`)
        );
      }
    });
  },
};

export default zipper;
