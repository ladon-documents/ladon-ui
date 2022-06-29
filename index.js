import bundle from './bundler.mjs'
import zipper from './zipper.mjs';

const targetPath = './node_modules/@mind';
const destinationPath = './dist/root/core-mf/';
const bundleZip = 'bundle.zip'

function printResponse(response) {
	console.info(response);
}

try {
	printResponse(await bundle.bundleAndSync(targetPath, destinationPath))
	printResponse(await zipper.zip(bundleZip))
} catch (e) {
	console.error(e)
}
