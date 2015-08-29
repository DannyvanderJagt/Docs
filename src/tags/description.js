export default {
    type: 'string',
    process(line){
        let parts = line.match(/(\@[\w]+)?\s*(.*)/);
        
        if(!parts){
            return false;
        }
        
        return parts[2];
    }
};
