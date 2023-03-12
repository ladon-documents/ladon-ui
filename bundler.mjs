import fse from "fs-extra";

const bundle = {
  bundleAndSync(targetPath, destinationPath) {
    return new Promise(async (resolve, reject) => {
      await fse.copy(targetPath, destinationPath, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(
            `Great, you successfully bundled from ${targetPath} -> ${destinationPath}`
          );
        }
      });
    });
  },
};

export default bundle;
