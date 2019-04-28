const fs = require('fs');
const request = require('superagent');
const config = require('../config');
const { promisify } = require('util');
const readFile = promisify(fs.readFile)

async function creation (file) {
    // Get the file extension and buffer
    const ext = file.split('.')[1];
    const eFile = await readFile(file);
    if (!eFile) {
      console.log('ShadowScythe - Error reading file. Nothing was returned.');
      return null;
    }
    try { // Try to upload the file to elixi.re
        const endOutput = await request.post(`https://elixi.re/api/upload`).attach('f', eFile, `file.${ext}`)
          .set('Authorization', config.token);

          // Handle the returned result
        let result = endOutput
        if (result.text) {
            result = result.text;
        }
        return result;
    } catch (err) { // Handle errors
        const er = err.message ? err.message : err
        if (er === 'Payload Too Large') {
            console.log(`ShadowScythe - Error - Could not upload screenshot! Screenshot was too big!`);
            return null;
        }
        console.log(`ShadowScythe - Error - ${er}`);
        return null;
    }
}

module.exports = creation;
