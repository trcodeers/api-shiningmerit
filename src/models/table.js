import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({}, { strict: false });

const Table = mongoose.model('Tables', tableSchema);

export default Table;