import bcrypt from "bcrypt";

const hash = async(password) => {
    const salt = await bcrypt.genSalt(5)   
    const hasedPassword = await bcrypt.hash(password, salt)
    return hasedPassword
}

export default hash;