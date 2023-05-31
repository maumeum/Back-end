<<<<<<< HEAD
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
const __dirname = path_1.default.resolve();
app.use('/', express_1.default.static(path_1.default.join(__dirname, 'public')));
const DB_URL = process.env.MONGODB_URL ||
    'MongoDB 서버 주소가 설정되지 않았거나, env 파일도 필요합니다.\n';
mongoose_1.default.connect(DB_URL, { dbName: 'maum' });
const db = mongoose_1.default.connection;
db.on('connected', () => console.log('정상적으로 MongoDB 서버에 연결되었습니다.  ' + DB_URL));
db.on('error', (error) => console.error('\nMongoDB 연결에 실패하였습니다...\n' + DB_URL + '\n' + error));
=======
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const __dirname = path.resolve();
app.use('/', express.static(path.join(__dirname, 'public')));
const DB_URL = process.env.MONGODB_URL ||
    'MongoDB 서버 주소가 설정되지 않았거나, env 파일도 필요합니다.\n';
mongoose.connect(DB_URL, { dbName: 'maum' });
const db = mongoose.connection;
db.on('connected', () => console.log('정상적으로 MongoDB 서버에 연결되었습니다.  ' + DB_URL));
db.on('error', (error) => console.error('\nMongoDB 연결에 실패하였습니다...\n' + DB_URL + '\n' + error));
export { app };
>>>>>>> feature-schema-hanna
