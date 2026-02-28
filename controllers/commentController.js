import commentService from "../services/commentService.js";

const commentController = {};

commentController.addComment = async (req, res) => {
    try {
        const comment = await commentService.addComment(
            req.params.taskId,
            req.body.message,
            req.user._id
        );

        res.status(201).json({
            message: "Comment added successfully",
            comment,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

commentController.getComments = async (req, res) => {
    try {
        const comments = await commentService.getComments(req.params.taskId);
        res.status(200).json({
            message: "Comments retrieved successfully",
            totalCount: comments.length,
            comments
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

commentController.editComment = async (req, res) => {
    try {
        const comment = await commentService.editComment(
            req.params.commentId,
            req.body.message,
            req.user._id
        );

        res.status(200).json({
            message: "Comment updated successfully"
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

commentController.deleteComment = async (req, res) => {
    try {
        await commentService.deletecomment(req.params.commentId, req.user._id);
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};

export default commentController;
