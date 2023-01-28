const { StatusCodes } = require("http-status-codes/build/cjs/status-codes");
const Order = require("../model/order");

//CREATE NEW ORDER
exports.createNewOrder = async (req, res) => {
  const order = Order(req.body);

  try {
    const newOrder = await order.save();
    res.status(StatusCodes.OK).json(newOrder);
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json(err);
  }
};

// //GET ALL ORDER
exports.getAllOrder = async (req, res) => {
  try {
    const allOrder = await Order.find();
    res.status(StatusCodes.ACCEPTED).json(allOrder);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json(err);
  }
};

// //UPDATE CART
exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(StatusCodes.OK).json(updatedOrder);
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json(err);
  }
};

// //DELETE CART
exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.ACCEPTED).json("deleted successfully!");
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json(err);
  }
};

//GET ONE CART
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.find({ userId: req.params.userId });
    return res.status(StatusCodes.OK).json(order);
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json(err);
  }
};
//GET MONTHLY INCOME
exports.getStats = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: $createdAt },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(StatusCodes.OK).json(income);

  
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json(err);
  }
};
