import Fs from 'fs';
import Util from 'util';
import Docs from './index';
import Tags from './tags';

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
        this.path = path;
        
        // Get file.
        this.contents = this._getFile(this.path);
        
        // Get all the comments.
        this.comments = this._getComments(this.contents);
        
        // Process each comment.
        this.comments.forEach((comment) => {
            this._processComment(comment);
        });
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
        let comment = this.cleanCommentString(string);
        let type = null;
        let tags = {};
        
        // Abstract all the tags from the comments.
        comment.forEach((line) => {
            Tags.abstract(line);
        });
        
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
}

export default File;
