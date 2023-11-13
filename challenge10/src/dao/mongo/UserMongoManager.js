import Users from "./models/userModel.js";

class UsersMongoManager {

    async saveUsers (user) {
        try {
            const usersCreated = await Users.create(user)
            return usersCreated;

        } catch (error) {
            throw error
        }
    }


    async getUserById (userId){
        try {

            const user = await Users.findById(userId).lean();
            return user;
            
        } catch (error) {
            throw error
        }
    }


    async getByEmail (userEmail) {
        try {
            const user = await Users.findOne({email:userEmail}).lean();
            if(user){
                return user;
            } else {
                return null
            }
        } catch (error) {
            throw error
        }
    }
}


export {UsersMongoManager as UsersMongoManager}