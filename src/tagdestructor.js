var TagDestructor = {
    used(line){
        // Format: @used The name
        let parts = line.match(/\@[\w]+\s*(.*)/);
        return parts[1];
    },
    param(line){
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
    },
    return(line){
        // Format: @param {type} title - description
        // Optional: title and description
        let parts = line.match(/\{([\w]+)\}\s*([\w]+)?\s*\-?\s*(.*)?/);
        return {
            type: parts[1],
            name: parts[2],
            description: parts[3]
        };
    },
    object(line){
        // Format: @object
        return true;
    },
    'var'(line){
        // Format: @param !/? {type} title - description
        // Params are required by default, add ? to make the param optional.
        let parts = line.match(/([\!\?]?)\s*\{([\w]+)\}\s*([\w]+)\s*\-\s*(.*)/);
        return {
            type: parts[2],
            name: parts[3],
            description: parts[4]
        };
    },
    name(line){
        // Format: @name The name
        let parts = line.match(/\@[\w]+\s*(.*)/);
        return parts[1];
    },
    namespace(line){
        // Format: @element The name
        let parts = line.match(/\@[\w]+\s*([\w\/\.]+)/);
        if(!parts){
            return false;
        }
        return parts[1].split(/[\/\./]+/);
    },
    description(line){
        // Format: @description The description
        let parts = line.match(/\@[\w]+\s*(.*)/);
        return parts[1];
    },
    'function'(line){
        // Format: @function name
        let parts = line.match(/\@[\w]+\s*(.*)/);
        return parts[1];
    },
    note(line){
        // Format: @note The description
        let parts = line.match(/\@[\w]+\s*(.*)/);
        return parts[1];
    },
    warning(line){
        // Format: @warning The description
        let parts = line.match(/\@[\w]+\s*(.*)/);
        return parts[1];
    },
    deprecated(line){
        // Format: @deprecated The description
        let parts = line.match(/\@[\w]+\s*(.*)/);
        return parts[1];
    }
};

export default TagDestructor;
