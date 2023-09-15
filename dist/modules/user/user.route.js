"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequests_1 = require("../../middleWares/validateRequests");
const user_zod_1 = require("./user.zod");
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post("/auth/signup", (0, validateRequests_1.validateRequest)(user_zod_1.userZodValidataion.createUser), user_controller_1.userController.createUser);
router.get("/users/:id", user_controller_1.userController.getSingleUser);
router.delete("/users/:id", user_controller_1.userController.deleteUser);
router.patch("/users/:id", (0, validateRequests_1.validateRequest)(user_zod_1.userZodValidataion.updateUser), user_controller_1.userController.updateUser);
router.get("/users", user_controller_1.userController.getAllUser);
exports.UserRoutes = router;
