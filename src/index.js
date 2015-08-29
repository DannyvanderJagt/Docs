import Fs from 'fs';
import Typer, {Type as Type} from 'typer';
import Util from 'util';

import File from './file';
import Namespace from './namespace';

/**
 * @used Typer
 */
Typer.set({throw: true});

/**
 * Docs
 * @namespace docs
 */
let Docs = {
    /**
     * @private
     * @var {Array} _paths - All the files/paths that are watched.
     */
    _paths:[],
    
    /**
     * @private
     * @var {Object} _files - All the file instances.
     */
    _files:{},
    
    /**
     * @private
     * @var {Object} _namespaces - All the namespaces.
     */
    _namespaces:{},
    
    /**
     * Compile code file into docs.
     * @name compile
     * @param  {Array<String> | String} paths - The path(s)
     * @note hoi
     */
    compile(paths){
        Type('String | Array', paths);
        if(Typer.isString(paths)){
            paths = [paths];
        }
        
        this._paths = this._getAllFiles(paths);
        this._files = [];
        
        // Create a file instance for each file.
        this._paths.forEach((file) => {
            this._files[file] = new File(file);
        });
        
        // Generate the markdown files and save them.
        for(let namespace in this._namespaces){
            this._namespaces[namespace].save();
        }
        
    },
    
    /**
     * Get all the files from a path.
     * @private
     * @name _getFiles
     * @param  {String | Array<String>} paths - The path(s)
     * @return {Array<String>} All the founded filepaths.
     */
    _getAllFiles(paths){
        Type('String | Array', paths);
        if(Typer.isString(paths)){
            paths = [paths];
        }
        
        // Get all the files.
        let files = [];
        
        paths.forEach((path) => {
            let type = Fs.lstatSync(path);
            if(type.isDirectory()){
                // Get all the files from the directory.
                let contents = Fs.readdirSync(path).map((content)=>{
                    return path +'/'+ content;
                });
                // Get all the files within sub directories.
                let _files = this._getAllFiles(contents);
                _files.forEach((_file) => {
                    files.push(_file);
                });
            }else if(type.isFile()){
                files.push(path);
            }
        });
        return files;
    },
    
    /**
     * Add a file to a namespace.
     * @name addToNamespace
     * @param {String} file - A file instance.
     */
    addToNamespace(file){
        let namespace = file.namespace;
        
        if(!namespace){
            return false;
        }
        
        // Convert the namespace into a string.
        let namespaceString = namespace.join('/');
        
        if(!this._namespaces[namespaceString]){
            this._namespaces[namespaceString] = new Namespace(namespace);
        }
        
        this._namespaces[namespaceString].addFile(file);
    }
};

export default Docs;

Docs.compile(__dirname);
