const Product = require("../model/product");

const { StatusCodes } = require("http-status-codes/build/cjs/status-codes");
const cryptoJS = require("crypto-js");

//CREATE NEW PRODUCT
exports.createNewProduct = async (req, res) => {
  const product = Product(req.body);

  try {
    const newProduct = await product.save();
    res.status(StatusCodes.OK).json(product);
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json(err);
  }
};

// //GET ALL
// exports.getAllUsers = async (req, res) => {
//   try {
//     const getAllUser = await User.find();
//     console.log(getAllUser);
//     return res.status(StatusCodes.OK).json(getAllUser);
//   } catch (err) {
//     res.status(StatusCodes.NOT_FOUND).json(err);
//   }
// };

//UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(StatusCodes.OK).json(updatedProduct);
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json(err);
  }
};

// //DELETE USER
// exports.deleteUser = async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.params.id);
//     res.status(StatusCodes.ACCEPTED).json("deleted successfully!");
//   } catch (err) {
//     res.status(StatusCodes.NOT_FOUND).json(err);
//   }
// };

// //GET ONE USER
// exports.getuser = async (req, res) => {
//   try {
//     const getUser = await User.findById(req.params.id);
//     const { password, ...user } = getUser._doc;
//     return res.status(StatusCodes.OK).json(user);
//   } catch (err) {
//     res.status(StatusCodes.NOT_FOUND).json(err);
//   }
// };

// //STATS
// exports.getStat = async (req, res) => {
//   const date = new Date();
//   const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

//   try {
//     const data = await User.aggregate([
//       { $match: { createdAt: { $gte: lastYear } } },
//       {
//         $project: {
//           month: { $month: "$createdAt" },
//         },
//       },
//       {
//         $group: {
//           _id: "$month",
//           total: { $sum: 1 },
//         },
//       },
//     ]);
//     res.status(StatusCodes.OK).json(data);
//   } catch (err) {
//     res.status(StatusCodes.NOT_FOUND).json(err);
//   }
// };
