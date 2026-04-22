import multer from "multer";
import fs from "fs";
import path from "path";

const tempUploadDir = path.resolve(process.cwd(), "public/temp");

if (!fs.existsSync(tempUploadDir)) {
  fs.mkdirSync(tempUploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempUploadDir);
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    const baseName = path
      .basename(file.originalname, extension)
      .replace(/[^a-zA-Z0-9-_]/g, "-");
    cb(null, `${Date.now()}-${baseName}${extension}`);
  },
});

export const upload = multer({ storage: storage });
