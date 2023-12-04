export default class UserDTO{
    constructor(user){
        this._id = user._id || null
        this.name = user.name || ''
        this.email = user.email || ''
        this.tickets = this.tickets || []
    }
}