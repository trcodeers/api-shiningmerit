import Joi from "joi";

function MCQValidate(data) {
    const mcq = Joi.object({
         question: Joi.string().required(),
         options: Joi.array().length(4).required,
         rightAnswer: Joi.number().required(),
         tags: Joi.array(),
      })  
  
    return mcq.validate(data)
  }
  
export default MCQValidate; 