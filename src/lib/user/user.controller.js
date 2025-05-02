const User = require('./user.model');

console.log("djf");
async function createUser(req, res) {
    console.log("Hi");
    try {
        const { email, password } = req.body;

        const user = new User({
            email,
            password
        });

        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    } 
    
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create user' });
    }
}

async function getAllUsers(req, res) {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } 
    
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
}

async function getUserById(req, res) {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) 
            return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);
    } 
    
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch user' });
    }
}

async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { email, password} = req.body;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (email) 
            user.email = email;
        
        if (password) 
            user.password = password;
        
        await user.save();

        res.status(200).json({ message: 'User updated successfully', user });
    } 
    
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update user' });
    }
}

async function deleteUser(req, res) {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);

        if (!user) 
            return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ message: 'User deleted successfully' });
    } 
    
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete user' });
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};