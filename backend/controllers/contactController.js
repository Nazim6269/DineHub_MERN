
import { Contact } from "../models/contactModel.js";
import { successResponse, errorResponse } from "../helpers/responseHandler.js";

// Create a new inquiry
export const createInquiry = async (req, res, next) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return errorResponse(res, {
                statusCode: 400,
                message: "All fields are required",
            });
        }

        const newInquiry = await Contact.create({
            name,
            email,
            subject,
            message,
        });

        return successResponse(res, {
            statusCode: 201,
            message: "Your message has been sent successfully!",
            payload: newInquiry,
        });
    } catch (error) {
        next(error);
    }
};
