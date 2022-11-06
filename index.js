import fs from 'fs';
import bundle from './bundler.mjs'
import zipper from './zipper.mjs';

const targetPath = './node_modules/@mind';
const destinationPath = './dist/root/core-mf/';
const bundleZip = 'bundle.zip'

function printResponse(response) {
	console.info(response);
}

function rimrafNodeModules(path) {
	fs.readdirSync(path).forEach( mf => {
		if (fs.existsSync(`${path}${mf}/node_modules`)) {
			fs.rmSync(`${path}${mf}/node_modules`, {recursive: true})
		}
	})
}

function cleanup() {
	if (fs.existsSync('dist')) {
		fs.rmSync('dist', {recursive: true})
	}

	if (fs.existsSync(bundleZip)) {
		fs.rmSync(bundleZip)
	}

	console.info(`All clean here`)
}

async function run() {
	try {
		printResponse(await bundle.bundleAndSync(targetPath, destinationPath))
		printResponse(`Next: clean up all unnecessary node_modules in ${destinationPath}`)
		rimrafNodeModules(destinationPath)
		printResponse(await zipper.zip(bundleZip))
	} catch (e) {
		console.error(e)
	}
}

export { cleanup, run }
