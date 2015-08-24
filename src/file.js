import Fs from 'fs';
import TagDestructor from './tagdestructor';

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
            // console.log('---> comment');
            // console.log(lines);
            
            // Process all the tags.
            // this.fields = Object.assign(this.fields, this.destructComment(lines));
            console.log( this.destructComment(lines));
        });
        console.log(this.fields);
    }
    destructComment(comment){
        let fields = {};
        // Process all the tags.
        comment.forEach((line) => {
            fields = Object.assign(fields, this.destructCommentLine(line));
        });

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
        
        if(!TagDestructor[tag]){
            console.log('[NOT SUPPORTED] - The tag ' + tag + ' is not supported!');
            return false;
        }
        
        if(!fields[tag]){
            fields[tag] = [];
        }
        fields[tag].push(TagDestructor[tag](line));
        
        return fields;
    }
}

export default File;
