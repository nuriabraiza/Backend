export default class User {
    constructor(data) {
        this.data = data;
    }

    static get model() {
        return "Users";
    }

    static get schema() {
        return {
            name: {type: String, required: true},
            surname: {type: String, required: true},
            email: {type: String, required: true, unique: true},
            password: {type: String},
            username: {type: String, required: true, unique: true},
            phoneNumber: {type: String, required: true},
            role: {type: String, required: true, default: "user"},
            avatar: {
                type: String,
                required: true,
                default: "https://avatars.dicebear.com/api/identicon/default.png",
            },
            age: {type: Number, required: true, default: 0},
            address: {type: String, required: true},
        };
    }
}
