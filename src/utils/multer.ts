import express, { Request, Response, NextFunction } from 'express';
import multer, { FileFilterCallback } from 'multer';
import fs from 'fs';
import { error } from 'console';
import path from 'path';

if (!fs.existsSync('public/images')) {
  fs.mkdirSync('public/images');
}

// 파일 타입 및 파일 크기 제한 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// 파일 필터링 함수 정의
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  const allowedFileTypes = ['.jpg', '.jpeg', '.png'];
  const ext = path.extname(file.originalname).toLowerCase();
  const maxSize = 10 * 1024 * 1024;

  if (allowedFileTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('올바른 파일 형식 및 크기를 선택하세요.'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

const imageUploader = (req: Request, res: Response, next: NextFunction) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(400).json({ error: err.message });
    } else {
      next();
    }
  });
};

export { imageUploader };
