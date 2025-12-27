import path from "path";
import express from "express";
import multer from "multer";
const router = express.Router();

// 1. define the storage location
const storage = multer.diskStorage({
  // takes an object
  // destination - where to save
  destination(req, file, cb) {
    cb(null, "uploads/");
    // null pertains to error so null rn
    // where will uploads go - uploads folder
  },
  filename(req, file, cb) {
    cb(
      null,
      // fieldname - can be anything
      // 'image' will be used
      // - timestamp
      // - file extension - will have validation to
      // determine image ext are passed
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  // Allowed ext names
  const filetypes = /jpg|jpeg|png/;
  // gets the extname
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // mimetype ??
  const mimetype = filetypes.test(file.mimetype);
  // check extname and mimetype to test if they match the regular expression
  if (extname && mimetype) {
    // return null error and return true
    return cb(null, true);
  } else {
    // return error 'Images only!'
    cb("Images only!");
  }
}

const upload = multer({
  storage,
});

// There is a way to pass an array but we are only uploading a single image.
router.post("/", upload.single("image"), (req, res) => {
  res.send({
    message: "Image uploaded",
    image: `/${req.file.path}`,
  });
});

export default router;
