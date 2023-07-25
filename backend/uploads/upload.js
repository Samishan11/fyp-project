const req = require('express/lib/request');
const multer = require('multer');

// file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./files/properties/images");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+ "_" + file.originalname);
    }
});

// filtering file
const filter = function (req, file, cb) {
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg') {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage
});


module.exports = upload;