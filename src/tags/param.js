import Tags from './index.js';

export default {
    type: 'array',
    process(line){
        let parts = line.match(/(\??)\s*\{([\w\>/<\|\s]+)\}\s*([\w]*)\s*\-\s*(.*)/);
        
        if(!parts){
            return false;
        }
        
        return {
            required: parts[0] === '?' ? false : true,
            type: Tags._abstractTypes(parts[2]),
            name: parts[3] || '',
            description: parts[4] || ''
        };
    }
};
