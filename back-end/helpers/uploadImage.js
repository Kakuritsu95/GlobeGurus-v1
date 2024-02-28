const { v2: cloudinary } = require("cloudinary");
function uploadImage(foldername, imageFile) {
  return new Promise((res, rej) => {
    cloudinary.uploader
      .upload_stream({ folder: foldername }, (error, uploadResult) => {
        if (error) {
          rej({ message: "Could not upload the image" });
        } else {
          const imageUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/v1709050242/${uploadResult.public_id}.jpg`;
          res(imageUrl);
        }
      })
      .end(imageFile.buffer);
  });
}

module.exports = uploadImage;
