export default {
    type: 'array',
    process(line){
        let parts = line.match(/([\!\?]?)\s*\{([\w]+)\}\s*([\w]+)\s*\-\s*(.*)/);
        
        if(!parts){
            return parts;
        }
        
        return {
           type: parts[2],
           name: parts[3],
           description: parts[4]
        };
    }
};
