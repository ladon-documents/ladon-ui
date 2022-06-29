import fs from 'fs';
import archiver from 'archiver';

let output = undefined;
let archive = undefined;

const makeZipAndSync = (directory = './dist') => {
	archive.pipe(output)
	archive.directory(directory, false);
	archive.finalize();
}

const zipper = {
	zip(zipName) {
		return new Promise( (resolve, reject) => {
			if (zipName) {
				output = fs.createWriteStream(zipName);
				archive = archiver('zip');

				output.on('close', () => {
					resolve(`${archive.pointer()} total bytes`)
				});
			
				archive.on('error', (err) => {
					reject(err)
				});

				makeZipAndSync()
			} else {
				reject(new TypeError(`Please pass in a zip name, for example: example.zip`))
			}

		})
	}
}

export default zipper