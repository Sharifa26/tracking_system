import attachmentService from "../services/attachmentService.js";
import path from "path";

const attachmentController = {};

attachmentController.addfile = async (req, res) => {
    try {
        if (!req.file) {
            throw new Error("No file uploaded");
        }

        const attachment = await attachmentService.addAttachment(
            req.params.taskId,
            req.file,
            req.user._id
        );

        res.status(201).json({
            message: "File uploaded successfully",
            attachment,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

attachmentController.getFiles = async (req, res) => {
    try {
        const attachments = await attachmentService.getAttachments( req.params.taskId);
        const updated = attachments.map(att => ({
            ...att._doc,
            fileUrl: `${req.protocol}://${req.get("host")}/uploads/${att.filePath}`
        }));

        res.status(200).json({
            message: "Files retrieved successfully",
            totalCount: updated.length,
            attachments: updated
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

attachmentController.deleteFile = async (req, res) => {
    try {
        await attachmentService.deleteAttachment(req.params.attachmentId, req.user._id);
        res.status(200).json({ message: "File deleted successfully" });
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};

export default attachmentController;
