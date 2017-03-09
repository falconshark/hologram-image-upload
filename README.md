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
You should require ReactCrop.css and bootstrap.css (or bootstrap.min.css), the css file of React Image Crop and Bootstrap too.

 ```html
<link rel=stylesheet type="text/css" href="css/ReactCrop.css">
 
<link href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/sandstone/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
 ```

## Props

#### uploader (required)

The post url of your upload handler.

```jsx
<Hologram uploader="upload.php"/>
```

#### style (optional)
Style of dropzone. You can pass a object to setting the style of dropzone.
<br>
The default style of dropzone is:

```js
const style = {
		marginLeft:'auto',
   		marginRight:'auto',
   		width:'50%',
   		padding: '2.5em 0',
   		background: 'rgba(0,0,0,0.5)',
   		textAlign: 'center',
   		color: '#fff'
   }
```


#### cropperConfig (optional)
Config of React Image Crop. 
https://github.com/DominicTobias/react-image-crop

```jsx
var crop = {
	x: 20,
	y: 10,
}

<Hologram uploader="upload.php" cropperConfig={crop} />
```

#### onComplete(uploadResult) (optional)
Callback function which trigger when image uploaded.
It will pass a object which contain http response, you can use it to handler the result of upload.  

## Contributing

You can clone this repository then start develop at sandbox, or feel free to open issue on github.

Build package:

```bash
npm run build
```

Build sandbox:

```bash
webpack
```