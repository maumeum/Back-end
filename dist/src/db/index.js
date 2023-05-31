"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VolunteerCommentModel = exports.UserModel = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const userSchema_js_1 = require("./schemas/userSchema.js");
const volunteerCommentSchema_js_1 = require("./schemas/volunteerCommentSchema.js");
//tsconfig.json의 moduleResolution이 nodenext면 확장자 필요
const UserModel = (0, typegoose_1.getModelForClass)(userSchema_js_1.User);
exports.UserModel = UserModel;
const VolunteerCommentModel = (0, typegoose_1.getModelForClass)(volunteerCommentSchema_js_1.VolunteerComment);
exports.VolunteerCommentModel = VolunteerCommentModel;
