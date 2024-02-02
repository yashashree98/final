import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true},
        slug: { type: String, required: true, unique: true},
        image: { type: String, required: true},
        price: { type: Number, required: true},
        countInStock: { type: Number, required: true},
        description: { type: String, required: true},
    },
    {
        timestamps: true
    }
);

const Service = mongoose.model('Service', serviceSchema);

export default Service;
