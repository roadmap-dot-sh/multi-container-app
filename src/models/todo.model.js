import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    completed: { type: Boolean, default: false },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

todoSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

export default mongoose.model("Todo", todoSchema)