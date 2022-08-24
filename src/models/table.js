import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
    textToSearch: {
        type: String,
        required: true,
        trim: true
    }
}, { strict: false });

const Table = mongoose.model('Tables', tableSchema);

export default Table;