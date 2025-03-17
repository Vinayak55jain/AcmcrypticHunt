const admin = (req, res, next) => {
    // Check if the user has admin privileges
    if (req.user && req.user.role === 'admin') {
        next(); // User is an admin, proceed to the next middleware
    } else {
        res.status(403).json({ message: 'Access denied. Admins only.' }); // User is not an admin
    }
};
export default admin;