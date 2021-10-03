import { KeystoneContext } from "@keystone-next/keystone/types";
import stripeConfig from "../utils/stripe";


interface Arguments {
    token: string,
}

async function checkout(
    root: any,
    { token }: Arguments,
    context: KeystoneContext
  ): Promise<Boolean> {

    const userId = context.session.itemId;

    if(!userId){
        throw new Error("You must be signed in to subscribe");
    }
    console.log("FIRST STEP IS CLEARED ************** ", userId);
    // query current user
    const user = await context.lists.User.findOne({
        where: {id: userId},
        query: `
            id
            name
            email
            isSubscribed
            subscription{
                price
            }
        `
    });

    // Create payment with Stripe
    const charge = await stripeConfig.paymentIntents.create({
        amount: parseInt(process.env.SUBSCRIPTION_CHARGE || ""),
        currency: "INR",
        confirm: true,
        payment_method: token
    }).catch(err => {
        console.log(err);
        throw new Error(err.message);
    })

    console.log("CHARGE ********* : ",charge);

    console.log("Check this :::: ",user);

    // create subscription and make isSubscibed to yes.
    const subscription = await context.lists.Subscription.createOne({
        data: {
            price: charge.amount,
            chargeId: charge.id,
            user: {connect: {id: userId}}
        }
    }).catch(err => {
        console.log(err);
        throw new Error(err.message)
    })

    await context.lists.User.updateOne({
        where: {id: userId},
        data: {
            isSubscribed: true
        }
    }).catch(err => {
        console.log(err);
        throw new Error(err.message)
    })

    return true;
  }

  export default checkout;