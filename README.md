# Upload asset to Acoustic Content - Chrome extension

This sample Chrome extension illustrates how to call Acoustic Content (formerly Watson Content Hub or WCH) APIs from client JavaScript.

The extension uses pure JavaScript to append an additional item onto the context-menu if the user right-clicks on an image in the Chrome web-browser. If the user selects this context-menu item, the image clicked will be automatically uploaded as an asset to WCH.

**Note**: The extension only uploads the asset if the image's `src` value uses the `https` scheme.

This sample shows:
* Authenticating to the WCH and calling APIs that require authentication.
* Using the authoring services to upload a resource and create an asset.

### Copyright ownership of images

Please be aware when using this tool that images uploaded to WCH are automatically published to Akamai and immediately available publicly.

When uploading images be sure that you are not violating any copyright laws.

### Running the sample

#### 1. Download the files

Download the extension files from the `public` folder into any folder on your workstation.

#### 2. Update the user credentials

This sample uses hard-coded user name and password set in the `background.js` file. Update the username and password values in that file.

To avoid putting credentials in the source you could change the extension to provide browser inputs for username and password.

#### 3. Load the extension into Chrome

* More tools -> Extensions
* Enable `Developer mode` checkbox
* Load unpacked extension
* Browse to the folder containing the extension files

#### 4. Extension in use

Navigate to a web-page containing an image you would like to upload to WCH.

![Alt text](/docs/screenshot1.png?raw=true "Browse to image on site")

Right-click on image, select `Upload asset to Watson Content Hub` from context-menu.

![Alt text](/docs/screenshot2.png?raw=true "Selecting upload context menu item")

Notification shown as feedback.

![Alt text](/docs/screenshot3.png?raw=true "Notification being displayed")

Asset available in WCH.

![Alt text](/docs/screenshot4.png?raw=true "Asset availble in WCH")

## Resources

Acoustic Content developer documentation: https://developer.goacoustic.com/acoustic-content/docs

Acoustic Content API reference documentation: https://developer.goacoustic.com/acoustic-content/reference

Acoustic Content Samples Gallery: https://content-samples.goacoustic.com/
