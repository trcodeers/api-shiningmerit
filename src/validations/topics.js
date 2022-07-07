import Joi from "joi";

function TopicValidation(data) {
    const subTopic = Joi.object({
         subTopic: Joi.string().required()
      })  
  
    return subTopic.validate(data)
  }
  
  export default TopicValidation; 