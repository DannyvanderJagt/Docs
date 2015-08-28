import Fs from 'fs';
import Typer, {Type as Type} from 'typer';
import Util from 'util';

import File from './file';

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
     * @var {Array} paths - All the files/paths that are watched.
     */
    _paths:[],
    
    /**
     * @private
     * @var {Object} files - All the file instances.
     */
    _files:{},
    
    /**
     * @private
     * @var {Object} namespaces - All the namespaces.
     */
    _namespaces:{},
    
    /**
     * Compile code file into docs.
     * @name compile
     * @param  {Array<String> | String} paths - The path(s)
     */
    compile(paths){
        Type('String | Array', paths);
        if(Typer.isString(paths)){
            paths = [paths];
        }
        
        this._paths = this._getAllFiles(paths);
        this._files = [];
        
        this._paths.forEach((file) => {
            this._files[file] = new File(file);
        });
    },
    
    /**
     * Get all the files from a path.
     * @private
     * @deprecated 
     * @deprecated description
     * @deprecated v0.2
     * @deprecated v0.2 - description
     * @deprecated cc962c23b5b754ef0a92bfd88619f6bef25bc16ada
     * @deprecated cc962c23b5b754ef0a92bfd88619f6bef25bc16ada - description
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
    }
};

export default Docs;

// Docs.compile(__dirname);
Docs.compile(__dirname+'/index.js');
// Docs.destruct();
// console.log(Docs.namespaces);
