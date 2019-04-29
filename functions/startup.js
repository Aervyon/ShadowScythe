const config = require('../config')
const chokidar = require('chokidar');
const create = require('./onCreate');
const clipboard = require('clipboardy')

let useSubDirs = config.useSubDirs && config.useSubDirs === true ? undefined : 0; // Whether or not to use subdirectories
module.exports = {
    startArray () {
        for (let path of config.path) {
            const watcher = chokidar.watch(path, { awaitWriteFinish: true, ignoreInitial: true, disableGlobbing: true, depth: useSubDirs });
        
            watcher.on('add', async (file) => { // When a new file is created
                console.log(`File "${file}" created!`)
        
                // Handle uploading
                let end = await create(file);
                end = JSON.parse(end);
                if (!end) {
                    return;
                }
                if (end.url) { // Copy the url to the clipboard
                    await clipboard.write(end.url);
                }
                // Notify the user of the screenshot
                console.log(`ShadowScythe - Uploaded screenshot`)
                console.log(`URL: ${end.url}\nDeletion URL: ${end.delete_url}\nShort-Name: ${end.shortname}`)
            })
        
            watcher.on('ready', () => { // Notify the user when the app is listening to the directory
                console.log(`ShadowScythe - Watching ${path}`);
            })
        }
    },
    start () {
        const watcher = chokidar.watch(config.path, { awaitWriteFinish: true, ignoreInitial: true, disableGlobbing: true, depth: useSubDirs });
        
        watcher.on('add', async (file) => { // When a new file is created
            console.log(`File "${file}" created!`)
    
            // Handle uploading
            let end = await create(file);
            end = JSON.parse(end);
            if (!end) {
                return;
            }
            if (end.url) { // Copy the url to the clipboard
                await clipboard.write(end.url);
            }
            // Notify the user of the screenshot
            console.log(`ShadowScythe - Uploaded screenshot`)
            console.log(`URL: ${end.url}\nDeletion URL: ${end.delete_url}\nShort-Name: ${end.shortname}`)
        })
        
        watcher.on('ready', () => { // Notify the user when the app is listening to the directory
            console.log(`ShadowScythe - Watching ${config.path}`);
        })
    }
}