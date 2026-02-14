import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        otp: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 300, // 5 minutes (TTL index)
        },
    },
    {
        collection: "Saraha_otps",
        timestamps: true,
    },
);

export const OtpModel = mongoose.models.Otp || mongoose.model("Otp", otpSchema);
