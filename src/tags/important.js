export default {
    type: 'string',
    process(line){
       let parts = line.match(/\@[\w]+\s*(.*)/);
       
       if(!parts){
           return parts;
       }
       
       return parts[1];
    }
};
