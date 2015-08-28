import tags from './tags.js';
import Typer from 'typer';

/**
 * Handles everything where tags are involved.
 * @namespace docs/tags
 */
let Tags = {
    tags: tags,
    /**
     * Abstract the tags and the data from a commentline.
     * @name abstract
     * @param  {String} string - A line of a comment.
     * @return {Object<tag,data>}
     */
    abstract(string){
        let tag = this._abstractTag(string);
        
        if(!this.tags[tag]){
            console.log('The tag @%s is not supported!', tag);
            return false;
        }
        
        return {
            tag: tag, 
            data: this.tags[tag].process(string)
        };    
    },
    
    /**
     * Combine the tag and its result with an object the right way.
     * @name combine
     * @param  {String} tag - The tag.
     * @param  {Any} result - The data/result of the tag.
     * @param  {Object} fields - The object where the tag and its data will be added to.
     * @return {Object} fields
     */
    combine(tag, result, fields){
        if(this.tags[tag].type === 'array'){
           if(!fields[tag]){
               fields[tag] = [];
           }
           if(Typer.isArray(result)){
               result.map((res) => {
                   fields[tag].push(res);
               });
           }else{
               fields[tag].push(result);
           }
       }
       
       if(this.tags[tag].type === 'string'){
           if(!fields[tag]){
               fields[tag] = "";
           }
           fields[tag] += result;
       }
       
       if(this.tags[tag].type === 'boolean'){
           fields[tag] = result;
       }
       
       if(this.tags[tag].type === 'replace'){
           fields[tag] = result;
       }
       
       return fields;    
    },
    /**
     * Abstract a tag from a string.
     * @private
     * @name _abstractTag
     * @param  {String} string - The string / a line of a comment.
     * @return {String} The tag. 
     */
    _abstractTag(string){
        let match = string.match(/\s*\@([\w]+)/);
        return match ? match[1] : 'description';
    },
    /**
     * Abstract types from a part of tag. 
     * @private
     * @name _abstractTypes
     * @param  {String} typeString - The type of a tag string.
     * @return {Array<String>} All the founded types in Array format.
     */
    _abstractTypes(typeString){
        return typeString.match(/String|Any|Number|Object|Boolean|Void|Array<[\w]*\>/g);
    }
};


export default Tags;
