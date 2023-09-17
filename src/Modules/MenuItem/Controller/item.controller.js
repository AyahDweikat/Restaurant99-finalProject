import cloudinary from "./../../../Services/cloudinary.js";
import * as dotenv from "dotenv";
import slugify from "slugify";
import { pagination } from "../../../Services/pagination.js";
import menuItemModel from "../../../../DB/Model/Item.model.js";
import categoryModel from "./../../../../DB/Model/Category.model.js";

export const addItem = async (req, res, next) => {
  const { name, price, discount, categoryId, description, ingredients, size } =
    req.body;
  const checkCategory = await categoryModel.findOne({
    _id: categoryId,
  });
  if (!checkCategory)
    return next(new Error(`Invalid Category`, { cause: 409 }));

  req.body.slug = slugify(name);
  req.body.finalPrice = price * (1 - (discount || 0));
  if (req.files.mainImage) {
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      req.files.mainImage[0].path,
      { folder: `${process.env.APP_NAME}/MenuItem/mainImage` }
    );
    req.body.mainImage = { public_id, secure_url };
  }
  if (req.files.subImages) {
    req.body.subImages = [];
    for (const file of req.files.subImages) {
      const { public_id, secure_url } = await cloudinary.uploader.upload(
        file.path,
        { folder: `${process.env.APP_NAME}/MenuItem/subImages` }
      );
      req.body.subImages.push({ public_id, secure_url });
    }
  }
  req.body.createdBy = req.user._id;
  req.body.updatedBy = req.user._id;
  const newItem = await menuItemModel.create(req.body);
  if (!newItem) next(new Error(`Fail to add New Item`, { cause: 409 }));
  return res
    .status(201)
    .json({ message: "successfully added New Item", newItem });
};
export const updateItem = async (req, res, next) => {
  const { itemId } = req.params;
  const item = await menuItemModel.findOne({ _id: itemId });
  if (!item) return next(new Error(`Invalid Item Id`, { cause: 400 }));

  const { name, price, discount, categoryId, description, ingredients, size } =
    req.body;
  if (categoryId) {
    const checkCategory = await categoryModel.findOne({
      _id: categoryId,
    });
    if (!checkCategory)
      return next(new Error(`Invalid Category`, { cause: 409 }));
    item.categoryId = categoryId;
  }
  if (name) {
    item.name = name;
    item.slug = slugify(name);
  }
  if (req.body.description) {
    item.description = req.body.description;
  }
  if (req.body.ingredients) {
    item.ingredients = req.body.ingredients;
  }
  if (req.body.sizes) {
    item.sizes = req.body.sizes;
  }

  if (price && discount) {
    item.price = price;
    item.discount = discount;
    item.finalPrice = price * (1 - (discount || 0));
  } else if (price) {
    item.price = price;
    item.finalPrice = price * (1 - item.discount);
  } else if (discount) {
    item.discount = discount;
    item.finalPrice = item.price * (1 - discount);
  }
  if (req.files?.mainImage?.length) {
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      req.files.mainImage[0].path,
      { folder: `${process.env.APP_NAME}/MenuItem/mainImage` }
    );
    await cloudinary.uploader.destroy(item.mainImage.public_id);
    item.mainImage.secure_url = secure_url;
    item.mainImage.public_id = public_id;
  }
  if (req.files?.subImages?.length) {
    const subImages = [];
    for (const file of item.subImages) {
      await cloudinary.uploader.destroy(file.public_id);
    }
    for (const file of req.files.subImages) {
      const { public_id, secure_url } = await cloudinary.uploader.upload(
        file.path,
        { folder: `${process.env.APP_NAME}/MenuItem/subImages` }
      );
      subImages.push({ public_id, secure_url });
    }
    item.subImages = subImages;
  }
  item.updatedBy = req.user._id;
  const updatedItem = await item.save();
  if (!updatedItem) next(new Error(`Fail to update Item`, { cause: 409 }));
  return res.json({ message: "Item updated successfully", item });
};

export const changeToUnAvailable = async (req, res, next) => {
  const { itemId } = req.params;
  const item = await menuItemModel.findOneAndUpdate(
    { _id: itemId, isDeleted: false, isAvailable: true },
    { isAvailable: false },
    { new: true }
  );
  if (!item) {
    return next(new Error(`Fail to make Item unavailable`, { cause: 409 }));
  }
  return res.json({ message: "Success make Item unavailable", item });
};
export const changeToAvailable = async (req, res, next) => {
  const { itemId } = req.params;
  const item = await menuItemModel.findOneAndUpdate(
    { _id: itemId, isDeleted: false, isAvailable: false },
    { isAvailable: true },
    { new: true }
  );
  if (!item) {
    return next(new Error(`Fail to make Item available`, { cause: 409 }));
  }
  return res.json({ message: "Success make Item available", item });
};

export const softDeleteItem = async (req, res, next) => {
  const { itemId } = req.params;
  const item = await menuItemModel.findOneAndUpdate(
    { _id: itemId, isDeleted: false },
    { isDeleted: true },
    { new: true }
  );
  if (!item) {
    return next(new Error(`Fail to delete Item`, { cause: 409 }));
  }
  return res.json({ message: "Success Soft Delete For Item", item });
};
export const forceDeleteItem = async (req, res, next) => {
  const { itemId } = req.params;
  const item = await menuItemModel.findOneAndDelete({
    _id: itemId,
    isDeleted: true,
  });
  if (!item) {
    return next(new Error(`Fail to delete Item`, { cause: 409 }));
  }
  return res.json({ message: "Success Delete for Item", item });
};
export const restoreDeletedItem = async (req, res, next) => {
  const { itemId } = req.params;
  const item = await menuItemModel.findOneAndUpdate(
    { _id: itemId, isDeleted: true },
    { isDeleted: false },
    { new: true }
  );
  if (!item) {
    return next(new Error(`Fail to restore Item`, { cause: 409 }));
  }
  return res.json({ message: "Success to restore Item", item });
};

export const getSoftDeletedItems = async (req, res, next) => {
  const items = await menuItemModel.find({ isDeleted: true });
  if (!items) {
    return next(new Error(`Error to get Soft Deleted Items`, { cause: 409 }));
  }
  return res.json({ message: "Success to get Soft Deleted Items", items });
};
export const getItemInfo = async (req, res, next) => {
  const { itemId } = req.params;
  const item = await menuItemModel.findOne({ _id: itemId }).populate("reviews");
  if (!item) {
    return next(new Error(`Error to get Item`, { cause: 409 }));
  }
  return res.json({ message: "Success to get Item", item });
};
export const getItemsFormCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  const items = await menuItemModel.findOne({ categoryId, isDeleted:false });
  if (!items) {
    return next(new Error(`Error to get Items`, { cause: 409 }));
  }
  return res.json({ message: "Success to get Items", items });
};
export const getAllItems = async (req, res, next) => {
  let { page, size } = req.query;
  const { skip, limit } = pagination(page, size);
  const excQueryParams = ["page", "size", "sort", "search"];
  const filterQuery = { ...req.query };
  excQueryParams.filter((params) => {
    delete filterQuery[params];
  });
  const query = JSON.parse(
    JSON.stringify(filterQuery).replace(
      /(gt|lt|gte|lte|in|nin|neq)/g,
      (match) => `$${match}`
    )
  );

  const mongoQuery = menuItemModel
    .find({ isDeleted: false, query })
    .limit(limit)
    .skip(skip)
    .sort(req.query?.sort?.replaceAll(",", " "));

  let allItems = req.query.search
    ? await mongoQuery.find({
        $or: [
          { name: { $regex: req.query?.search, $options: "i" } },
          { description: { $regex: req.query?.search, $options: "i" } },
        ],
      })
    : await mongoQuery;

  if (!allItems) {
    return next(new Error(`Error to get All Items`, { cause: 409 }));
  }
  return res.json({ message: "Success to get All Items", allItems });
};
