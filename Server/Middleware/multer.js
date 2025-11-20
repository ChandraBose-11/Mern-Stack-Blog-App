import multer from 'multer';

const storage = multer.memoryStorage(); // store file in memory temporarily
const upload = multer({ storage });

export default upload;