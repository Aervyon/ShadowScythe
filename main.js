console.log('ShadowScythe is starting....');

const config = require('./config');
const startup = require('./functions/startup');

if (Array.isArray(config.path)) {
    startup.startArray();
} else {
    startup.start()
}
