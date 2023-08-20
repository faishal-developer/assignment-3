import { NextFunction, Request, Response } from "express";
import { catchAsync, sendResponse } from "../../shared/catchAsync";
import { userService } from "./user.service";
import { ObjectId } from "mongoose";
import { User } from "./user.model";
import { IUser } from "./user.interface";
import httpStatus from "http-status";

const createUser = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const userData = req.body;
    const result = await userService.createUser(userData);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "user created successfully",
      data: result,
    });
})

const getAllUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    const result = await userService.getAllUser();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "user created successfully",
      data: result,
    });
  }
);

const getSingleUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id;
    const result = await userService.getSingleUser(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: result==null ? "Failed to get" : "user retrived successfully",
      data: result,
    });
  }
);

const updateUser=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
  const id = req.params.id;
  const updatedData = req.body;
  const result = await userService.updateUser(id,updatedData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated succefully",
    data: result,
  });
});

const deleteUser= catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
  const id= req.params.id;
  const result = await userService.deleteUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student deleted successfully!",
    data: result,
  });
})

export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser
};