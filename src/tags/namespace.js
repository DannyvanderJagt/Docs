export default {
    type: 'replace',
    process(line){
        let parts = line.match(/\@[\w]+\s*([\w\/\.]+)/);
        
        if(!parts){
           return false;
        }
        
        return parts[1].split(/[\/\./]+/);
    }
};
