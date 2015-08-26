/**
 * Tags
 * @namespace docs/tags
 */
var Tags = {
    used:{
        type: 'array',
        process(line){
            // Format: @used The name
            let parts = line.match(/\@[\w]+\s*(.*)/);
            return parts[1];
        }
    },
    param:{
        type: 'array',
        process(line){
            // Format: @param !/? {type} title - description
            // Params are required by default, add ? to make the param optional.
            let parts = line.match(/([\!\?]?)\s*\{([\w]+)\}\s*([\w]+)\s*\-\s*(.*)/);
            return {
                required: parts[1] === '?'  ? false : true,
                optional: parts[1] === '?' ? true : false,
                type: parts[2],
                name: parts[3],
                description: parts[4]
            };
        }
    },
    return:{
        type: 'array',
        process(line){
            // Format: @param {type} title - description
            // Optional: title and description
            let parts = line.match(/\{([\w]+)\}\s*(.*)?/);
            return {
                type: parts[1],
                description: parts[2]
            };
        }
    },
    'var':{
        type: 'array',
        process(line){
            // Format: @param !/? {type} title - description
            // Params are required by default, add ? to make the param optional.
            let parts = line.match(/([\!\?]?)\s*\{([\w]+)\}\s*([\w]+)\s*\-\s*(.*)/);
            return {
                type: parts[2],
                name: parts[3],
                description: parts[4]
            };
        }
    },
    name:{
        type: 'string',
        process(line){
            // Format: @name The name
            let parts = line.match(/\@[\w]+\s*(.*)/);
            return parts[1];
        }
    },
    namespace:{
        type: 'replace',
        process(line){
            // Format: @element The name
            let parts = line.match(/\@[\w]+\s*([\w\/\.]+)/);
            if(!parts){
                return false;
            }
            return parts[1].split(/[\/\./]+/);
        }
    },
    description:{
        type: 'string',
        process(line){
            // Format: @description The description
            let parts = line.match(/\@[\w]+\s*(.*)/);
            return parts[1];
        }
    },
    note:{
        type: 'string',
        process(line){
            // Format: @note The description
            let parts = line.match(/\@[\w]+\s*(.*)/);
            return parts[1];
        }
    },
    warning:{
        type: 'string',
        process(line){
            // Format: @warning The description
            let parts = line.match(/\@[\w]+\s*(.*)/);
            return parts[1];
        }
    },
    deprecated:{
        type: 'string',
        process(line){
        // Format: @deprecated The description
            let parts = line.match(/\@[\w]+\s*(.*)/);
            return parts[1];
        }
    },
    'function':{
        type: 'array',
        process(line){
            return true;
        }
    },
    line:{
        type: 'replace', 
        process(line){
            return line;
        }
    },
    file:{
        type: 'string', 
        process(line){
            return line;
        }
    }
};

export default Tags;
