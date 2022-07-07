import Joi from "joi";

function StateValidate(data) {
    const state = Joi.object({
         name: Joi.string().required(),
         capital: Joi.string(),
         unionTerritories: Joi.boolean(),
         language: Joi.string(),
         details: Joi.string(),
         area: Joi.string(),
      })  
  
    return state.validate(data)
  }
  
  export default StateValidate; 