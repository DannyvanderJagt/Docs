import Template from '../template';
import Paths from 'path';
import Fs from 'fs';

class Namespace{
    constructor(namespace){
        this.namespace = namespace;
        this.files = {};
    }
    addFile(file){
        this.files[file.path] = file;
    }
    generateMarkdown(){
        // Combine all the comments.
        let comments = [];
        for(let file in this.files){
            file = this.files[file];
            comments = comments.concat(file.comments);
        }
        
        let data = {
            functions: {
                public: [],
                private: []
            },
            variables: {
                public: [],
                private: []
            },
            used: [],
            generic:[],
            description: [],
            name: this.namespace[0],
            namespace: this.namespace
        };
        
        comments.forEach((comment) => {
            if(comment.meta.type === 'function'){
                if(comment.private){
                    data.functions.private.push(comment);
                }else{
                    data.functions.public.push(comment);
                }
            }else if(comment.meta.type === 'variable'){
                if(comment.private){
                    data.variables.private.push(comment);
                }else{
                    data.variables.public.push(comment);
                }
            }else if(comment.meta.type === 'used'){
                data.used.push(comment);
            }else if(comment.meta.type === 'description'){
                data.description.push(comment);
            }else if(comment.meta.type === 'generic'){
                data.generic.push(comment);
            }
        });
        
        let markdown = Template.fill(data);
        return markdown;
    }
    save(){
        // Generate markdown.
        let markdown = this.generateMarkdown();
        // Store the markdown file.
        let path = Paths.join(__dirname,'../../','docs');
        let filename = path + '/' + (this.namespace.join('-')+'.md');
    
        Fs.writeFileSync(filename, markdown);
    }
}

export default Namespace;
