export default {
    type: 'array',
    process(line){
        let parts = line.match(/\@[\w]+\s*(.*)/);
        
        if(!parts){
            return false;
        }
        
        return parts[1];
    }
};
