import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        taskId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
        },
        type: {
            type: String,
            enum: ["task_assigned", "task_updated", "comment_added"],
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Notification", notificationSchema);