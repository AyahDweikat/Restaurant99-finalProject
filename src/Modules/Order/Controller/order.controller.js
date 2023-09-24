// import { createInvoiceFromOrder } from '../../../Services/orderInvoice.js';
import orderModel from "./../../../../DB/Model/Order.model.js";
import menuItemModel from "./../../../../DB/Model/Item.model.js";

export const addOrder = async (req, res, next) => {
  const {
    items,
    address,
    phoneNumber,
    paymentType,
    placeToEat,
    personsNumber,
    note,
  } = req.body;
  const finalItemstList = [];
  let finalPrice = 0;
  for (let item of items) {
    const checkItem = await menuItemModel.findOne({
      _id: item.itemId,
      isDeleted: false,
      isAvailable: true,
    });
    if (!checkItem) {
      continue;
    }
    item.name = checkItem.name;
    item.description = checkItem.description;
    item.price = checkItem.prices[item.size];
    item.finalPrice = item.price * item.qty;
    finalPrice += item.finalPrice;
    finalItemstList.push(item);
  }
  const order = await orderModel.create({
    userId: req.user._id,
    items: finalItemstList,
    address,
    phoneNumber,
    paymentType,
    finalPrice,
    placeToEat,
    note,
    status: paymentType == "card" ? "approved" : "pending",
    personsNumber,
  });
  // createInvoiceFromOrder(order, req.user)
  return res.status(201).json({ message: "successfully added Order", order });
};

export const updateOrder = async (req, res, next) => {
  const { orderId } = req.params;
  const {
    items,
    address,
    phoneNumber,
    paymentType,
    placeToEat,
    personsNumber,
    note,
  } = req.body;
  const order = await orderModel.findOne({
    _id: orderId,
    userId: req.user._id,
  });
  if (!order) {
    return next(new Error(`Invalid Order`, { cause: 400 }));
  }
  if (items) {
    const finalItemstList = [];
    let finalPrice = 0;
    for (let item of items) {
      const checkItem = await menuItemModel.findOne({
        _id: item.itemId,
        isDeleted: false,
        isAvailable: true,
      });
      if (!checkItem) {
        continue;
      }
      item.name = checkItem.name;
      item.description = checkItem.description;
      item.price = checkItem.prices[item.size];
      item.finalPrice = item.price * item.qty;
      finalPrice += item.finalPrice;
      finalItemstList.push(item);
    }
    order.items = finalItemstList;
    order.finalPrice = finalPrice;
  }
  if (address) order.address = address;
  if (phoneNumber) order.phoneNumber = phoneNumber;
  if (paymentType) order.paymentType = paymentType;

  if (placeToEat) order.placeToEat = placeToEat;
  if (note) order.note = note;
  if (personsNumber) order.personsNumber = personsNumber;
  order.save();
  // createInvoiceFromOrder(order, req.user)
  return res.status(201).json({ message: "successfully added Order", order });
};

export const cancelOrder = async (req, res, next) => {
  const { orderId } = req.params;
  const { reasonRejected } = req.body;
  const order = await orderModel.findOne({
    _id: orderId,
    userId: req.user._id,
  });
  if (!order) {
    return next(new Error(`Invalid Order`, { cause: 400 }));
  }
  if (
    order.status == "approved" ||
    order.status == "onWay" ||
    order.status == "delivered" ||
    order.paymentType !== "cash"
  ) {
    return next(new Error(`Can not cancel this Order`, { cause: 400 }));
  }
  if (order.status == "canceled") {
    return next(new Error(`Order is already canceled`, { cause: 400 }));
  }
  const canceledOrder = await orderModel.updateOne(
    { _id: order._id, userId: req.user._id },
    { status: "canceled", reasonRejected, updatedBy: req.user._id },
    { new: true }
  );
  return res
    .status(201)
    .json({ message: "successfully Order canceled", canceledOrder });
};

export const changeOrderState = async (req, res, next) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const order = await orderModel.findOne({ _id: orderId });
  if (!order || order.status == "delivered") {
    return next(new Error(`Can not change order state`, { cause: 400 }));
  }
  const updatedOrder = await orderModel.updateOne(
    { _id: order._id },
    { status, updatedBy: req.user._id },
    { new: true }
  );
  if (!updatedOrder.modifiedCount)
    return next(new Error(`Fail to change order status`, { cause: 400 }));
  return res
    .status(201)
    .json({ message: `successfully Order status changed to ${status}` });
};
