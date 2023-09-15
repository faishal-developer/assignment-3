/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from "http-status";
import { IQueryData, Icow } from "./cow.interface";
import { CowModel } from "./cow.model";
import ApiError from "../../errorHandler/ApiError";
import { calcSkip } from "../../shared/commonFunction";
import { SortOrder } from "mongoose";
import { maxNumber } from "../../utils/utils";
import { CowsSearchableFields } from "./cow.constant";
import { userService } from "../user/user.service";
import { User } from "../user/user.model";

const createCow = async (newCow: Icow): Promise<Icow | null> => {
  const id = newCow.seller;
  const user = await User.findById({ _id: id });
  if (user?.role === "buyer") {
    throw new ApiError(httpStatus.NOT_FOUND, "Buyer can't sell a cow");
  }
  if (!user) {
    throw new ApiError(404, "Seller not found");
  }
  const cow = await CowModel.findOne({
    seller: id,
    name: newCow.name,
  });
  if (cow) {
    throw new ApiError(409, "same seller same named cow is not allowed twice");
  }
  const result = await CowModel.create(newCow);
  return result;
};

const getAllCows = async (queryData: Partial<IQueryData>) => {
  const {
    page = "1",
    limit = "10",
    sortBy,
    sortOrder,
    minPrice = 0,
    maxPrice = maxNumber,
    location,
    searchTerm,
  } = queryData;
  const pagination = calcSkip(page, limit);

  //searching
  let query: any = {};
  //pricing
  query.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
  if (location) {
    query.location = location;
  }
  //searchTerm
  if (searchTerm) {
    query["$or"] = CowsSearchableFields.map((field) => ({
      [field]: {
        $regex: searchTerm,
        $options: "i",
      },
    }));
  }

  //sorting condition
  type TSort = "asc" | "desc";
  const sortCondition: { [key: string]: TSort } = {};
  if (sortBy) {
    sortCondition[sortBy] = (sortOrder as TSort) ?? "asc";
  }

  const result = await CowModel.find(query)
    .sort(sortCondition)
    .skip(pagination.skip)
    .limit(pagination.limit);

  const total = await CowModel.countDocuments(query);
  return {
    meta: {
      page: Number(page),
      limit: Number(limit),
      count: total,
    },
    data: result,
  };
};

const getSingleCow = async (id: string): Promise<Icow | null> => {
  const result = await CowModel.findById({ _id: id });
  return result;
};

const updateCow = async (
  id: string,
  data: Partial<Icow>
): Promise<Icow | null> => {
  if (Object.keys(data).length <= 0) {
    throw new ApiError(409, "NO content provided");
  }
  if (data.seller) {
    const user = await User.findById({ _id: id });
    if (user?.role === "buyer") {
      throw new ApiError(httpStatus.NOT_FOUND, "Buyer can't sell a cow");
    }
    if (!user) {
      throw new ApiError(404, "Seller not found");
    }
  }
  const isExist = await CowModel.findById({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Cow not found !");
  }
  if (data.name) {
    const cow = await CowModel.findOne({
      seller: id,
      name: data.name,
    });
    if (cow) {
      throw new ApiError(
        409,
        "same seller same named cow is not allowed twice"
      );
    }
  }

  const result = await CowModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

const deleteCow = async (id: string): Promise<Icow | null> => {
  const result = await CowModel.findByIdAndDelete({ _id: id });
  return result;
};

export const CowService = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
};
