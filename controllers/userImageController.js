const UserImage = require('../models/UserImage');

const sharp = require('sharp'); // Import sharp for image resizing

const insertImage = async (req, res) => {
    try {
        // Extract userId from the token (assuming you have middleware to do this)
        const userId = req.userId;

        // Extract imageData from the request body
        const { imageData } = req.body;

        // Decode the Base64 image data
        const buffer = Buffer.from(imageData, 'base64');

        // Resize the image to limit size to 70KB
        const resizedBuffer = await sharp(buffer)
            .resize({ width: 500 }) // Resize the image to a width of 500px (adjust as needed)
            .jpeg({ quality: 70 }) // Set JPEG quality to reduce file size
            .toBuffer();

        // Generate a unique filename
        const filename = Date.now() + '.jpg';

        // Save the image to the database
        const image = await UserImage.create({
            userId,
            imgurl: filename, // Assuming you're saving the filename to the database
        });

        res.status(200).json({ success: true, message: 'Image saved successfully', data: image });
    } catch (error) {
        console.error('Error while saving image: ', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = {
    insertImage,
};
