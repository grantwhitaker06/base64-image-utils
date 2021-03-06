var base64ImageToRGBMatrix = function(base64, callback, options) {
  var opts = options || {};

  var img = new window.Image();
  img.onload = function onImageLoad() {
    var canvas = document.createElement("canvas");
    var ctx;
    var data;
    var result;

    var resizeRatio = 1;
    if (opts.size) {
      resizeRatio = opts.size / Math.max(img.width, img.height);
    }

    if (opts.maxSize) {
      if (img.width > opts.maxSize || img.height > opts.maxSize) {
        resizeRatio = opts.maxSize / Math.max(img.width, img.height);
      }
    }

    var imageWidth = Math.floor(img.width * resizeRatio);
    var imageHeight = Math.floor(img.height * resizeRatio);

    canvas.width = imageWidth;
    canvas.height = imageHeight;

    ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, imageWidth, imageHeight);

    data = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height).data;

    result = [];
    for (var y = 0; y < canvas.height; y++) {
      result[y] = [];
      for (var x = 0; x < canvas.width; x++) {
        result[y][x] = {
          r: data[y * canvas.width * 4 + x * 4],
          g: data[y * canvas.width * 4 + x * 4 + 1],
          b: data[y * canvas.width * 4 + x * 4 + 2],
          a: data[y * canvas.width * 4 + x * 4 + 3]
        };
      }
    }

    callback(null, result);
  };
  img.src = base64;
};

module.exports = base64ImageToRGBMatrix;
