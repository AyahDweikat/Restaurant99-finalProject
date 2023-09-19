import * as dotenv from "dotenv";
import tableModel from "../../../../DB/Model/Table.model.js";

export const addTable = async (req, res, next) => {
  const newTable = await tableModel.create({
    ...req.body,
    createdBy: req.user._id,
    updatedBy: req.user._id,
  });
  return res.status(201).json({
    message: "successfully added Table",
    newTable
  });
};

export const updateTableInfo = async (req, res, next) => {
  const { tableId } = req.params;
  const table = await tableModel.findOneAndUpdate(
    { _id: tableId },
    {...req.body, updatedBy: req.user._id},
    { new: true }
  );
  if (!table) return next(new Error(`Invalid Table Id`, { cause: 400 }));
  return res.status(201).json({
    message: "successfully updated Table",
    table,
  });
};

export const reserveTable = async (req, res, next) => {
  const { tableId } = req.params;
  const table = await tableModel.findOneAndUpdate(
    { _id: tableId },
    {isReserved: true, reservedTo: req.user._id, updatedBy: req.user._id,},
    { new: true }
  );
  if (!table) return next(new Error(`Invalid Table Id`, { cause: 400 }));
  return res.status(201).json({
    message: "successfully reserved Table",
    table,
  });
};

export const removeReservation = async (req, res, next) => {
  const { tableId } = req.params;
  const table = await tableModel.findOneAndUpdate(
    { _id: tableId },
    {isReserved: false, reservedTo: req.user._id, updatedBy: req.user._id,},
    { new: true }
  );
  if (!table) return next(new Error(`Invalid Table Id`, { cause: 400 }));
  return res.status(201).json({
    message: "successfully remove reservation from Table",
    table,
  });
};

export const deleteTable = async (req, res, next) => {
  const { tableId } = req.params;
  const deletedTable = await tableModel.findOneAndDelete({ _id: tableId });
  if (!deletedTable) return next(new Error(`Can't delete this table`, { cause: 400 }));
  return res.status(201).json({
    message: "successfully deleted Table",
    deletedTable,
  });
};

export const getTableInfo = async (req, res, next) => {
  const { tableId } = req.params;
  const table = await tableModel
    .findOne({ _id: tableId })
  if (!table) return next(new Error(`Invalid Table Id`, { cause: 400 }));
  return res.status(201).json({
    message: "successfully get Branch Info",
    table,
  });
};

export const getTablesInBranch = async (req, res, next) => {
  const {branchId} = req.params;
  const allTables = await tableModel.find({branchId}).select("tableNumber isReserved")
  if (!allTables) return next(new Error(`Error Getting All Tables`, { cause: 400 }));

  return res.status(201).json({
    message: "successfully get All Tables",
    allTables,
  });
};
