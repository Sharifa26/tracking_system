import aiService from "../services/aiService.js";

const aiController = {};

aiController.generateTaskDescription = async (req, res) => {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const description = await aiService.generateDescription(title);

        res.status(200).json({
            message: "Task description generated successfully",
            description,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default aiController;
