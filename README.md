# Hologram Image Upload

React image uploader with dropzone and cropper function, which used [React Dropzone](https://github.com/okonet/react-dropzone) and [React Image Crop](https://github.com/DominicTobias/react-image-crop).

This project still under active development, please feel free to open issues or pull request. 

[![npm]( 	http://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/hologram-image-upload)


## Features
- Using dropzone to upload multiple image files
- Crop and preview image  

## Installation
```bash
npm install hologram-image-upload --save
```

## Usage
```js
import Hologram from 'hologram-image-upload';
```
You should require ReactCrop.css, the css file of React Image Crop too.

 ```html
 <link rel=stylesheet type="text/css" href="css/ReactCrop.css">
 ```

## Props

#### uploader (required)

The post url of your upload handler.

```jsx
<Hologram uploader="upload.php"/>
```

#### cropperConfig (optional)
Config of React Image Crop. 
https://github.com/DominicTobias/react-image-crop

```jsx
var crop = {
	x: 20,
	y: 10,
}

<Hologram uploader="upload.php" crop={crop} />
```

#### onComplete(uploadResult) (optional)
Callback function which trigger when image uploaded.
It will pass a object which contain http response, you can use it to handler the result of upload.  

## Contributing

You can clone this repository then start develop with these command:

Build package:
```bash
npm run build
```