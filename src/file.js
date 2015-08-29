import Fs from 'fs';
import Util from 'util';
import Docs from './index';
import Tags from './tags';
import uuid from 'uuid';

/**
 * File
 * @namespace docs/file
 */
class File{
    /**
     * Stores and prepares.
     * @name constructor
     * @param  {String} path - The path to the file.
     * @return {void}
     */
    constructor(path){
        this.id = uuid();
        this.path = path;
        this.namespace = null;
        
        // Get file.
        this.contents = this._getFile(this.path);
        
        // Get all the comments.
        this.commentStrings = this._getComments(this.contents);
        
        // Process each comment.
        this.comments = this.commentStrings.map((comment) => {
            comment = this._processComment(comment);

            // Check for namespace.
            if(this.namespace === null && comment.namespace){
                this.namespace = comment.namespace;
            }
            return comment;
        }) || [];
        
        // Get the namespace.
        if(this.namespace){
            Docs.addToNamespace(this);
        }
    }
    
    /**
     * Get the contents of a file.
     * @private
     * @name _getFile
     * @param  {String} path - The path to the file.
     * @return {String} The contents of the file.
     */
    _getFile(path){
        return Fs.readFileSync(path, 'utf-8');
    }
    
    /**
     * Abstract all the comments from the contents of the file.
     * @private
     * @param  {String} contents - The contents of the file.
     * @return {Array<Array>} The comments.
     */
    _getComments(contents){
        return contents.match(/\/\*\*\n[^]*?\*\//g) || [];
    }
    
    /**
     * Process each comment and abstract everything we want to know.
     * @param  {String} string - The comment.
     */
    _processComment(string){
        let lines = this.cleanCommentString(string);
        let type = null;        
        let comment = {};
        
        // Abstract all the tags from the comments.
        lines.forEach((line) => {
            let lineData = Tags.abstract(line);
            
            if(lineData.tag === 'var'){
                comment.var = true;
            }
            
            Tags.combine(lineData.tag, lineData.data, comment);
        });
        
        // Get the type.
        comment.meta = {
            id: this.id,
            type: this.getCommentType(comment),
            line: this.getLineNumber(string),
            path: this.path
        };
        
        return comment;
    }
    /**
     * Remove any noise from comment string and split the comment into an array.
     * @param  {String} string - The comment.
     * @return {Array} The comment which is cleaned up and splitted by linebreak.
     */
    cleanCommentString(string){
        let lines = string.split(/\n[\s\S]+?\*(.*)/g) || [];
        lines = lines.filter((line)=>{
            return line === '' || line === '/**' || line == '/' ? 0 : 1;
        });
        return lines;
    }
    getCommentType(tags){
        if(tags.param && !tags.var){
            return 'function';
        }else if(tags.var){
            delete tags.var;
            return 'variable';
        }else if(tags.description && !this.param && !this.var){
            return 'description';
        }else if(tags.used && !tags.param && !tags.var){
            return 'used';
        }
        return 'generic';        
    }
    getLineNumber(commentString){
        let start = this.contents.indexOf(commentString);
        let length = commentString.length;
        let lines = this.contents.substr(0, start+length).match(/[\n\r]/g).length + 2;
        return lines;
    }
}

export default File;
