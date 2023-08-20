"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequests_1 = require("../../middleWares/validateRequests");
const order_validation_1 = require("./order.validation");
const orders_controller_1 = require("./orders.controller");
const router = express_1.default.Router();
router.post("/orders", (0, validateRequests_1.validateRequest)(order_validation_1.orderZodValidation.createOrder), orders_controller_1.ordersController.createOrder);
router.get("/orders", orders_controller_1.ordersController.getAllOrders);
exports.OrderRoutes = router;
