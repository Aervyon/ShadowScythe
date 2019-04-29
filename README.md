# ShadowScythe

An auto uploader for elixi.re. 

Automatically uploads files created in a directory to elixi.re and copies the url returned.

# Set up

Install dependencies. `yarn install` or `npm install` will work.

Then set your config up. See keys below.

Finally run the app. `npm start` if you are not using pm2, or `npm run pm2start` if you want to.

# Config keys

key (key type) - definition

- token (String) - The token used to authenticate with elixi.re
- path (String or Array) - The path(s) to listen to file creations in. Must be absolute!
- useSubDirs (Boolean) - Whether or not to use subdirectories. If ommited will default to false (dont use subdirs.)

# This is not a official elixi.re app.

ShadowScythe is made by Null.