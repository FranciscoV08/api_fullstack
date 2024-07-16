// Necesitamos crear un modelo para almacenar datos de mongodb.
import mongoose from "mongoose";
// 
const userSchema = new mongoose.Schema({
    username: {type:String, require:true, trim: true},
    email:    {type:String, require:true, unique: true},
    password: {type:String, require:true}
    
},
{
    timestamps: true
}
)
export default mongoose.model('User', userSchema)