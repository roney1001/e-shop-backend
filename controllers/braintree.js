const User = require('../model/user');
const braintree = require('braintree');
const dotenv = require('dotenv');
dotenv.config();

// connecting to braintree
const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox, // Production
    merchantId: '9wjqwcd7sqzprcyk',
    publicKey: '75g5h8kxd5xbcvt5',
    privateKey: '7d73a560a8ac834a65ba5dbfb31db1a0'
  }); 

// we are using gateway to generate token
exports.generateToken = (req, res) => {
    gateway.clientToken.generate({}, function(err, response) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(response);
        }
    });
};

exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromTheClient = req.body.amount;
    // charge
    let newTransaction = gateway.transaction.sale(
        {
            amount: amountFromTheClient,
            paymentMethodNonce: nonceFromTheClient,
            options: {
                submitForSettlement: true
            }
        },
        (error, result) => {
            if (error) {
                res.status(500).json(error);
            } else {
                res.json(result);
            }
        }
    );
};
