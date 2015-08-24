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
 * @namespace docs/typer
 */
let Docs = {
    /**
     * @var {Array} paths - All the files/paths that are watched.
     */
    paths:[],
    
    /**
     * @var {Array} files - All the file instances.
     */
    files:[],
    
    /**
     * Watch directories and/or files.
     * @param  {String} paths - The path to the directory or file.
     * @return {Array} All the files that are watched.
     */
    watch(paths){
        Type('String', paths);
        if(Typer.isString(paths)){
            paths = [paths];
        }
        
        // Get all the files.
        let files = [];
        paths.forEach((path) => {
            files = files.concat(this.getAllFiles(path));
        });
        
        // Filter.
        files.forEach((file) => {
            if(this.paths.indexOf(file) === -1){
                this.paths.push(file);
            }
        });
        return this.paths;
    },
    
    /**
     * Get all the files within a directory and the sub directorties.
     * @param  {String} directory - The directory
     * @return {Array} the files
     */
    getAllFiles(directory){
        Type('String', directory);
        let files = [];
        if(Fs.lstatSync(directory).isDirectory()){
            files = this.getAllFilesFromDirectory(directory);    
        }else{
            files = [directory];
        }
        return files;
    },
    getAllFilesFromDirectory(directory){
        Type('String', directory);
        let files = [];
        Fs.readdirSync(directory).map((result) => {
            if(result.match(/\..*/g)){
                files.push(directory +'/'+result);
            }else{
                files = files.concat(this.getAllFilesFromDirectory(directory +'/'+result));
            }
        });
        return files;
    },
    destruct(){
        this.paths.forEach((file) => {
            this.destructFile(file);
        });
    },
    destructFile(path){
        Type('String', path);
        console.log('---- ', path);
        let file = new File(path);
        this.files.push(file);
        
        
        file.getContents()
            .getComments()
            .destructComments();
    }
};

export default Docs;

Docs.watch(__dirname);
Docs.destruct();
