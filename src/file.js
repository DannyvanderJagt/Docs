import Fs from 'fs';
import Tags from './tags';
import Util from 'util';

/**
 * Docs
 * @namespace docs
 */
class File{
    constructor(path){
        this.path = path;
        this.contents = '';
        this.comments = [];
        this.namespace = null;
        this.fields = {};
    }
    getContents(){
        this.contents = Fs.readFileSync(this.path, 'utf-8');
        return this;
    }
    getComments(){
        let result = this.contents.match(/\/\*\*\n[^]*?\*\//g);
        this.comments = result || [];
        return this;
    }
    destructComments(){
        this.comments.forEach((comment) => {
            // Split the comment into lines.
            let lines = comment.split(/\n[\s\S]+?\*(.*)/g);
            lines = lines.filter((line)=>{
                return line === '' || line === '/**' || line == '/' ? 0 : 1;
            });

            // Process all the tags.
            let result = this.destructComment(lines);
            
            for(let r in result){
                this.addTagToFields(r, result[r], this.fields);
            }

        });
        console.log(JSON.stringify(this.fields).replace(/\n/,''));
        
    }
    destructComment(comment){
        let fields = {};
        // Process all the tags.
        comment.forEach((line) => {
            fields = Object.assign(fields, this.destructCommentLine(line));
        });
        
        if(fields.param){
            fields = {
                'function': fields
            };
        }

        return fields;
    }
    destructCommentLine(line){
        let fields = {};
        if(!line.match(/^\s*\@/m)){
            // This comment has a title!
            fields.description = line;
        }
        
        let tagCheck = line.match(/^\s*\@([\w]+)/m);
        if(!tagCheck){
            return false;
        }
        
        let tag = tagCheck[1];
        
        if(!Tags[tag]){
            console.log('[NOT SUPPORTED] - The tag ' + tag + ' is not supported!');
            return false;
        }
        
        let result = Tags[tag].process(line);
        
        this.addTagToFields(tag, result, fields);

        return fields;
    }
    addTagToFields(tag, result, fields){
        if(Tags[tag].type === 'array'){
            
            
            if(!fields[tag]){
                fields[tag] = [];
            }
            // console.log("ADD ARRAY",tag,  result);
            if(Util.isArray(result)){
                fields[tag].push(result[0]);
            }else{
                fields[tag].push(result);
            }
        }
        
        if(Tags[tag].type === 'string'){
            if(!fields[tag]){
                fields[tag] = "";
            }
            fields[tag] += result;
        }
        
        if(Tags[tag].type === 'boolean'){
            fields[tag] = result;
        }
        
        if(Tags[tag].type === 'replace'){
            fields[tag] = result;
        }
        
        return fields;
    }
}

export default File;
