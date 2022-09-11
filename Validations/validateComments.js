const validator = require('validator');
const validText = require('./validText');

module.exports.validateCommentInput = async(data)=>{
    let errors = {};

    data.text = validText(data.text) ? data.text : '';

    if(!validator.isLength(data.text, {min : 1, max: 300})){
        errors.text = 'Comment must be between 1 and 300 characters!';
    }

    if(validator.isEmpty(data.text)){
        errors.text = 'Comment cannot  be empty';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }

}