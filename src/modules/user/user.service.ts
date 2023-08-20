import { Types,ObjectId } from "mongoose";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import ApiError from "../../errorHandler/ApiError";
import httpStatus from "http-status";


const createUser= async(user:IUser):Promise<IUser|null>=>{
    const result = await User.create(user);
    return result;
}

const getAllUser = async (): Promise<IUser[] | null> => {
  const result = await User.find({});
  return result;
};

const getSingleUser = async (id:string): Promise<IUser | null> => {
    const result = await User.findById({_id:id});
    return result;
};

const updateUser=async(id:string,data:Partial<IUser>):Promise<IUser | null>=>{
  const isExist = await User.findById({ _id:id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found !");
  }
  const result = await User.findOneAndUpdate({ _id:id }, data, {
    new: true,
  });
  return result;
};

const deleteUser=async(id:string):Promise<IUser | null>=>{
  const result = await User.findByIdAndDelete({_id:id});
  return result;

}
export const userService = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser
};