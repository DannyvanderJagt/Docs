import Tags from './index.js';

export default {
    type: 'array',
    process(line){
        let parts = line.match(/\{([\w\>/<\|\s]+)\}\s*(.*)?/);
        
        if(!parts){
            return false;
        }
        
        return {
            type: Tags._abstractTypes(parts[1]),
            description: parts[2]
        };
    }
};
