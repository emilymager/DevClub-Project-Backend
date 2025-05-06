import User from './user.model.js';

export async function createUser(req, res) {
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

export async function getAllUsers(req, res) {
    try {
        const limit = parseInt(req.query.limit);
        const page = parseInt(req.query.page);

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {};

        if(startIndex > 0)
        {
            results.prev = {
                page: page - 1,
                limit: limit
            }
        }

        const totalUsers = await User.countDocuments();

        if(endIndex < totalUsers)
            {
                results.next = {
                    page: page + 1,
                    limit: limit
                }
            }

        results.results =  await User.find().limit(limit).skip(startIndex);
        
        res.status(200).json(results);
    } 
    
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
}

export async function getUserById(req, res) {
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

export async function updateUser(req, res) {
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

export async function deleteUser(req, res) {
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