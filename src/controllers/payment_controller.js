const field =require('../utils/field');

const PUBLISHABLE_KEY = "pk_test_51JJsGnAcPpPvEDJIpDiXcoKfOM7Ma3GnTYRjTzDr7yytk7jYsZbSKvWoAJSb5sesaY0SgjV7hxyM1LcnLMwVWY0I00NZ92toF6";
const SECRET_KEY = "sk_test_51JJsGnAcPpPvEDJI71Kowe7iwaPjldZ7dBKhVlOHGgEfnJaSznIpXl9dyy7jH7PYkfgeddO4nFStbMiAcLq6ye4j00ZLbELeUn";
const Stripe =require("stripe");

const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });


const createPayment = async(req,res)=>{
    try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: 1099, 
          currency: "usd",
          payment_method_types: ["card"], 
        });
    
        const clientSecret = paymentIntent.client_secret;
    
        res.json({
          clientSecret: clientSecret,
        });
      } catch (e) {
        console.log(e.message);
        res.json({ error: e.message });
      }
}

module.exports = {
    createPayment,
    
  };
  