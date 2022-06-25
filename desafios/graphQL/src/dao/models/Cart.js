import mongoose from "mongoose";

export default class Cart {
    constructor(data) {
        this.data = data;
    }

    static get model() {
        return "Carts";
    }

    static get schema() {
        return {
            productos: {type: Array, required: true},
            userId: {type: mongoose.Schema.Types.ObjectId, required: true},
        };
    }
}
