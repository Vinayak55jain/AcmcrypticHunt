class UserService {
    constructor(UserModel) {
        this.UserModel = UserModel;
    }

    async createUser(userData) {
        const user = new this.UserModel(userData);
        return await user.save();
    }

    async getUserById(userId) {
        return await this.UserModel.findById(userId);
    }

    async updateUser(userId, updateData) {
        return await this.UserModel.findByIdAndUpdate(userId, updateData, { new: true });
    }

    async deleteUser(userId) {
        return await this.UserModel.findByIdAndDelete(userId);
    }

    async getAllUsers() {
        return await this.UserModel.find();
    }
}

export default UserService;