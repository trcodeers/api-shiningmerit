import Joi from "joi";

function DaysValidate(data) {
    const day = Joi.object({
        title: Joi.string().required(),
        month: Joi.number().max(12).min(1).required(),
        day: Joi.number().max(31).min(1).required(),
        details: Joi.string(),
    })  
  
    return day.validate(data)
  }
  
  export default DaysValidate; 