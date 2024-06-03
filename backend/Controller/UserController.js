import { User } from "../Schema/Schema.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const saveUser = async (req, res) => {
    const { name, email, password } = req.body;  // Menggunakan req.body bukan req.query
    
    // Check if all required fields are provided
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Nama, email, dan password diperlukan" });
    }

    try {
        // Generate salt
        const salt = await bcrypt.genSalt(10);

        // Hash password
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new User instance with hashed password
        const user = new User({ name, email, password: hashedPassword });

        // Save user to database
        const insertedUser = await user.save();

        res.status(201).json(insertedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deletedUser = async (req, res) => {
    try {
        const deleteduser = await User.deleteOne({_id:req.params.id});
        res.status(201).json(deleteduser);
    } catch (error) {
        res.status(400).json({ message: error.message }); //400, kesalahan dari sisi user
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body; // Mengambil email dan password dari body permintaan

    // Validasi input
    if (!email || !password) {
        return res.status(400).json({ message: "Email dan password diperlukan" });
    }

    try {
        // Temukan pengguna dengan email yang diberikan
        const user = await User.findOne({ email });

        // Jika pengguna tidak ditemukan
        if (!user) {
            return res.status(404).json({ message: "Pengguna tidak ditemukan" });
        }

        // Cocokkan kata sandi
        const isPasswordMatch = await user.comparePassword(password);

        // Jika kata sandi cocok
        if (isPasswordMatch) {
            res.status(200).json({ message: "Login berhasil", user: user });
        } else {
            res.status(401).json({ message: "Kombinasi email dan password tidak valid" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}