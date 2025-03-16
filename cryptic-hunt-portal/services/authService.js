class AuthService {
    constructor(userModel, jwt, bcrypt, constants) {
        this.userModel = userModel;
        this.jwt = jwt;
        this.bcrypt = bcrypt;
        this.constants = constants;
    }

    async register(userData) {
        const hashedPassword = await this.bcrypt.hash(userData.password, 10);
        const newUser = new this.userModel({ ...userData, password: hashedPassword });
        await newUser.save();
        return newUser;
    }

    async login(email, password) {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

        const isMatch = await this.bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        const token = this.generateToken(user._id);
        return { user, token };
    }

    generateToken(userId) {
        return this.jwt.sign({ id: userId }, this.constants.JWT_SECRET, { expiresIn: '1h' });
    }

    async validateToken(token) {
        try {
            const decoded = this.jwt.verify(token, this.constants.JWT_SECRET);
            return decoded;
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
}

export default AuthService;