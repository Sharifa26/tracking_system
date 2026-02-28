import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";


const authService = {};

authService.register = async (name, email, password) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    return user;
};

authService.login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Invalid credentials: Email not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials: Password does not match");
    }

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    return { user, token };
};

authService.getAllUsers = async () => {
    const users = await User.find();
    return users;
};

authService.getUserById = async (id) => {
    const user = await User.findById(id);
    if (!user) {
        throw new Error("User not found");
    }
    return user;
};

authService.updateUser = async (id, name, email, password) => {
    const user = await User.findById(id);
    if (!user) {
        throw new Error("User not found");
    }

    if (name) {
        user.name = name;
    }

    if (email) {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("Email already registered provide a different email");
        }
        user.email = email;
    }

    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
    }

    await user.save();

    return user;
};

export default authService;
