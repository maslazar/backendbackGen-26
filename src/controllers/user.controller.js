const User = require("../models/user.model");
const Transfer = require("../models/transfer.model");
const { generateAccountNumber } = require("../utils/generateAccount");
const bcrypt = require("bcryptjs");

exports.createAccount = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    const accountNumber = generateAccountNumber();

    const salt = await bcrypt.genSalt(12);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      password: encryptedPassword,
      accountNumber,
    });
    res.status(200).json({
      status: "success",
      message: "The user has been created",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { accountNumber, password } = req.body;

    const user = await User.findOne({
      where: {
        accountNumber,
      },
    });
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: `User with account number: ${accountNumber} not found`,
      });
    }
    if (user.status == "inactive") {
      return res.status(401).json({
        status: "fail",
        message: `User with account number: ${accountNumber} is inactive`,
      });
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        status: "fail",
        message: "Password or account number is wrong",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Valid user",
      user: {
        id: user.id,
        name: user.name,
        accountNumber: user.accountNumber,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

exports.getAllTransferHistory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id,
        status: "active",
      },
    });

    const transfers = await Transfer.findAll({
      where: {
        senderUserAccount: user.accountNumber,
      },
    });

    if (!transfers.length) {
      return res.status(401).json({
        status: "fail",
        message: `This user with account number: ${user.accountNumber} has not made transfers`,
      });
    }
    res.status(200).json({
      status: "success",
      transfers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
};
