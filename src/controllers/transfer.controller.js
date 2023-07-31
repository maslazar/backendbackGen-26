const Transfer = require("../models/transfer.model");
const User = require("../models/user.model");

exports.accountTransfer = async (req, res, next) => {
  try {
    const { amount, senderUserAccount, receiverUserAccount } = req.body;

    if (senderUserAccount === receiverUserAccount) {
      return res.status(401).json({
        status: "fail",
        message: "Cannot transfer money to yourself",
      });
    }

    //Validamos que el usuario que envía diner exista (senderUserAccount) y que este activo
    const senderUser = await User.findOne({
      where: {
        accountNumber: senderUserAccount,
        status: "active",
      },
    });
    //Validar que el usuario exista
    if (!senderUser) {
      return res.status(401).json({
        status: "fail",
        message: `This number account ${senderUserAccount} sender, do not exist`,
      });
    }
    //Validar que el usuario destinatario exista
    const receiverUser = await User.findOne({
      where: {
        accountNumber: receiverUserAccount,
        status: "active",
      },
    });
    //Validar que el usuario exista
    if (!receiverUser) {
      return res.status(401).json({
        status: "fail",
        message: `This number account ${receiverUserAccount} receiver, do not exist`,
      });
    }

    //Monto disponible del remitente
    const amountSenderUser = senderUser.amount;

    if (amountSenderUser < amount) {
      return res.status(200).json({
        status: "fail",
        message: "You don't have enough amount",
      });
    }

    //Monto actualizado del usuario remitente
    const totalAmountSenderUser = amountSenderUser - amount;
    await senderUser.update({
      amount: totalAmountSenderUser,
    });

    //Monto actualizado del usuario destinatario
    const totalAmountReceiverUser = receiverUser.amount + amount;
    await receiverUser.update({
      amount: totalAmountReceiverUser,
    });

    const transfer = await Transfer.create({
      amount,
      senderUserAccount,
      receiverUserAccount,
    });

    res.status(200).json({
      status: "success",
      message: "Successful transfer",
      transfer,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
