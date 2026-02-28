import authService from "../services/authService.js";

const authController = {};

authController.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await authService.register(name, email, password);

        res.status(201).json({
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

authController.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const { user, token } = await authService.login(email, password);

        res.status(200).json({
            message: "Login successful",
            token
        });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

authController.getAllUsers = async (req, res) => {
    try {
        const users = await authService.getAllUsers();
        res.status(200).json({
            message: "All users fetched successfully",
            users,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

authController.getUserById = async (req, res) => {
    try {
        const id = req.user._id;
        const user = await authService.getUserById(id);
        res.status(200).json({
            message: "User fetched successfully",
            user,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

authController.updateUser = async (req, res) => {
    try {
        const id = req.user._id;
        const { name, email, password } = req.body;

        const user = await authService.updateUser(id, name, email, password);

        res.status(200).json({
            message: "User updated successfully",
            user,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default authController;
