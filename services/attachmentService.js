import Attachment from "../models/attachment.js";
import Task from "../models/task.js";

const attachmentService = {};

attachmentService.addAttachment = async (taskId, file, userId) => {
    const task = await Task.findById(taskId);
    if (!task) throw new Error("Task not found");

    const attachment = await Attachment.create({
        taskId,
        fileName: file.originalname,
        filePath: file.path,
        fileSize: file.size,
        fileType: file.mimetype,
        uploadedBy: userId,
    });

    return attachment;
};

attachmentService.getAttachments = async (taskId) => {
    return await Attachment.find({ taskId })
        .populate("uploadedBy", "name email")
        .sort({ createdAt: -1 });
};

attachmentService.deleteAttachment = async (attachmentId, userId) => {
    const attachment = await Attachment.findById(attachmentId);
    if (!attachment) throw new Error("Attachment not found");

    if (attachment.uploadedBy.toString() !== userId.toString()) {
        throw new Error("Not authorized to delete this attachment");
    }

    await attachment.deleteOne();
};

export default attachmentService;
