import mongoose from 'mongoose';
const { Schema } = mongoose;


let WordSchema = new Schema(
    {
        _id: {type: Schema.ObjectId, auto:true},
        word: String,
        date: Date,
    }
)

const Word = mongoose.model("Word", WordSchema);

export { Word };
