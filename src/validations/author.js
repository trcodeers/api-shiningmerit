import Joi from "joi";

function AuthorValidate(data) {
    console.log(data)
    const author = Joi.object({
         name: Joi.string().required(),
         userName: Joi.string().required(),
         email: Joi.string().required().email(),
         role: Joi.array().required(),
         password: Joi.string().required(),
      })  
  
    return author.validate(data)
  }
  
  export default AuthorValidate; 