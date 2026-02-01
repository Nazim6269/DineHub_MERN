
import Stripe from "stripe";
import { errorResponse, successResponse } from "../helpers/responseHandler.js";
import { stripeSecretKey, frontendURL } from "../secret.js";

let stripe;

if (stripeSecretKey) {
    stripe = new Stripe(stripeSecretKey);
} else {
    console.error("Stripe secret key is missing. Payment functionality will not work.");
}

export const processPayment = async (req, res, next) => {
    try {
        if (!stripe) {
            return errorResponse(res, {
                statusCode: 500,
                message: "Stripe is not configured on the server."
            });
        }
        const { items } = req.body;

        const lineItems = items.map((item) => {
            // Ensure price is an integer (in cents) for Stripe if using 'usd'. 
            // If using 'bdt' (Bangladesh Taka), Stripe also takes the smallest currency unit (poisha) OR explicit amount.
            // Usually, Stripe amount is in integer cents/poisha. 
            // Tk 1 = 100 poisha.

            // However, based on the Cart.jsx, it seems 'price' is just a number. 
            // Let's assume the price in the DB is in Taka (Main unit).
            // Stripe expects amount in the smallest currency unit. 
            // So we multiply by 100.

            return {
                price_data: {
                    currency: "bdt", // or 'usd', assuming BDT based on 'Tk' in Cart.jsx
                    product_data: {
                        name: item.name,
                        images: [item.img],
                    },
                    unit_amount: Math.round((item.options?.[0] ? Number(Object.values(item.options[0])[0]) : 0) * 100),
                },
                quantity: item.quantity,
            };
        });

        // Add shipping cost as a line item if needed, but Cart.jsx has fixed shipping.
        // Let's add shipping:
        lineItems.push({
            price_data: {
                currency: "bdt",
                product_data: {
                    name: "Shipping Charge",
                },
                unit_amount: 1000, // 10 Tk * 100
            },
            quantity: 1,
        });
        console.log(lineItems);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${frontendURL}/payment/success`,
            cancel_url: `${frontendURL}/payment/failed`,
        });

        return successResponse(res, {
            statusCode: 200,
            message: "Stripe checkout session created successfully",
            payload: {
                id: session.id,
                url: session.url,
            },
        });
    } catch (error) {
        next(error);
    }
};
