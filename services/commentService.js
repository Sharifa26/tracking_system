import Comment from "../models/comment.js";
import Task from "../models/task.js";

const commentService = {};

commentService.addComment = async (taskId, message, userId) => {
    const task = await Task.findById(taskId);
    if (!task) throw new Error("Task not found");

    const comment = await Comment.create({
        taskId,
        message,
        userId,
    });

    return comment;
};

commentService.getComments = async (taskId) => {
    return await Comment.find({ taskId })
        .populate("userId", "name email")
        .sort({ createdAt: -1 });
};

commentService.editComment = async (commentId, message, userId) => {
    const comment = await Comment.findById(commentId);
    if (!comment) throw new Error("Comment not found");

    if (comment.userId.toString() !== userId.toString()) {
        throw new Error("Not authorized to edit this comment");
    }

    Object.assign(comment, { message });
    await comment.save();

    return comment;
};

commentService.deletecomment = async (commentId, userId) => {
    const comment = await Comment.findById(commentId);
    if (!comment) throw new Error("Comment not found");

    if (comment.userId.toString() !== userId.toString()) {
        throw new Error("Not authorized to delete this comment");
    }

    await comment.deleteOne();
};

export default commentService;