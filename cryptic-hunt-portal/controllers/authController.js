class AuthController {
    constructor(authService) {
        this.authService = authService;
    }

    async signup(req, res) {
        try {
            const user = await this.authService.signup(req.body);
            res.status(201).json({ message: 'User created successfully', user });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async login(req, res) {
        try {
            const { token, user } = await this.authService.login(req.body);
            res.status(200).json({ message: 'Login successful', token, user });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }

    async authenticate(req, res, next) {
        try {
            const user = await this.authService.authenticate(req.headers.authorization);
            req.user = user;
            next();
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }
}

export default AuthController;