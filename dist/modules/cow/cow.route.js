"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequests_1 = require("../../middleWares/validateRequests");
const cow_validation_1 = require("./cow.validation");
const cow_controller_1 = require("./cow.controller");
const router = express_1.default.Router();
router.post("/cows", (0, validateRequests_1.validateRequest)(cow_validation_1.cowsZodValidataion.createCow), cow_controller_1.cowsController.createCow);
router.get("/cows/:id", cow_controller_1.cowsController.getSingleCow);
router.delete("/cows/:id", cow_controller_1.cowsController.deleteCow);
router.patch("/cows/:id", (0, validateRequests_1.validateRequest)(cow_validation_1.cowsZodValidataion.updateCow), cow_controller_1.cowsController.updateCow);
router.get("/cows", cow_controller_1.cowsController.getAllCows);
exports.CowRoutes = router;
