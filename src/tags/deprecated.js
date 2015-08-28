export default {
    type: 'string',
    process(line){
        line = line.split(/@[\w]+\s*/)[1];
        
        if(line.length === 0){
            return {
                description: undefined,
                since: undefined
            };
        }
        
        let parts = line.match(/^((v[0-9\.]+)|(c[0-9\w]+))?\s*\-?\s*(.*)/);
        return {
           description: parts[4] || '',
           since: parts[1] || undefined
        };
    }
};
