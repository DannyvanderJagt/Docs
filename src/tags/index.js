import tags from './tags.js';

let Tags = {
    tags: tags,
    abstract(string){
        let tag = this._abstractTag(string);
        
        if(!this.tags[tag]){
            console.log('The tag @%s is not supported!', tag);
            return false;
        }
        this.tags[tag].process(string);
        // console.log('@'+tag, this.tags[tag].process(string));
        
    },
    _abstractTag(string){
        let match = string.match(/\s*\@([\w]+)/);
        return match ? match[1] : 'description';
    },
    _abstractTypes(typeString){
        return typeString.match(/String|Number|Object|Boolean|Void|Array<[\w]*\>/g);
    }
};


export default Tags;
