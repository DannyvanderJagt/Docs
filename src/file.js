import Fs from 'fs';
import Tags from './tags';
import Util from 'util';
import Docs from './index';

/**
 * File
 * @namespace docs/file
 */
class File{
    constructor(path){
        this.path = path;
        this.contents = '';
        this.comments = [];
        this.namespace = null;
        this.fields = {};
    }
    /**
     * Get the contents of the file.
     * @return {scope}
     */
    getContents(){
        this.contents = Fs.readFileSync(this.path, 'utf-8');
        return this;
    }
    /**
     * Get the comments of the file contents.
     * @private
     * @return {scope}
     */
    getComments(){
        let result = this.contents.match(/\/\*\*\n[^]*?\*\//g);
        if(result){
            this.getLineNumber(result[0]);
        }
        this.comments = result || [];
        return this;
    }
    getLineNumber(comment){
        let start = this.contents.indexOf(comment);
        let length = comment.length;
        let lines = this.contents.substr(0, start+length).match(/[\n\r]/g).length + 2;
        return lines;
    }
    destructComments(){
        this.comments.forEach((comment) => {
            // Split the comment into lines.
            let lines = comment.split(/\n[\s\S]+?\*(.*)/g);
            lines = lines.filter((line)=>{
                return line === '' || line === '/**' || line == '/' ? 0 : 1;
            });

            // Process all the tags.
            let result = this.destructComment(comment, lines);
            
            for(let r in result){
                Docs.addTagToFields(r, result[r], this.fields);
            }

        });
        this.fields.file = this.path;
        if(this.comments[0]){
            this.fields.line = this.getLineNumber(this.comments[0]);    
        }
        if(this.fields.namespace){
            Docs.fillNamespace(this.fields.namespace, this.fields);
        }
    }
    destructComment(comment, lines){
        let fields = {};
        // Process all the tags.
        lines.forEach((line) => {
            let results = this.destructCommentLine(line);
            for(let tag in results){
                Docs.addTagToFields(tag, results[tag], fields);
            }
        });
        
        fields.line = this.getLineNumber(comment);
        
        if(fields.param || fields.return){
            fields = {
                'function': fields
            };
        }
        if(fields.var){
            fields.var = fields.var.map((v) => {
                v.line = fields.line;
                v.private = fields.private ? true : false;
                return v;
            });
            delete fields.private;
        }

        return fields;
    }
    destructCommentLine(line){
        let fields = {};

        if(line.match(/^\s*\@/m) === null){
            // This comment has a title!
            fields.description = line;
            return fields;
        }
        
        let tagCheck = line.match(/^\s*\@([\w]+)/m);
        if(!tagCheck){
            return fields;
        }
        
        let tag = tagCheck[1];
        
        if(!Tags[tag]){
            console.log('[NOT SUPPORTED] - The tag ' + tag + ' is not supported!');
            return false;
        }
        
        let result = Tags[tag].process(line);
        
        Docs.addTagToFields(tag, result, fields);

        return fields;
    }
}

export default File;
