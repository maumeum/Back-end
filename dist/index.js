"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_js_1 = require("./src/App.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT;
const url = process.env.URL;
App_js_1.app.get('/', (req, res) => {
    res.send('aaaaaaTypescript + Node.js + Express Server');
});
App_js_1.app.listen(port, () => {
    console.log(`[server]:서버가 ${url}:${port} 에서 실행되고 있습니다. `);
});
