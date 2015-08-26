import Fs from 'fs';
import Typer, {Type as Type} from 'typer';
import Util from 'util';

import File from './file';
import Namespace from './namespace';
import Tags from './tags';

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
     * @var {Array} paths - All the files/paths that are watched.
     */
    paths:[],
    
    /**
     * @var {Array} files - All the file instances.
     */
    files:[],
    
    /**
     * @var {Object} namespaces - All the namespaces.
     */
    namespaces:{},
    
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
    
    /* File related stuff */
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
    },
    
    /* Namespaces related stuff */
    fillNamespace(namespaces, data){
        Type('Array', namespaces);
        Type('Object', data);
        
        let name = namespaces.join('/');
        
        // First.
        if(!this.namespaces[name]){
            this.namespaces[name] = {
                sub:[]
            };
        }
        
        let obj = this.namespaces[name];
        
        if(namespaces.length > 1){
            for(let i = 1; i < namespaces.length; i++){
                if(!obj.sub){
                    obj.sub = [];
                }
                obj.sub.push(namespaces.join('/'));
            }
        }

        for(let tag in data){
            this.addTagToFields(tag, data[tag],obj);
        }
    },
    addTagToFields(tag, result, fields){
        if(Tags[tag].type === 'array'){
            if(!fields[tag]){
                fields[tag] = [];
            }
            if(Util.isArray(result)){
                result.map((res) => {
                    fields[tag].push(res);
                });
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
};

export default Docs;

// Docs.watch(__dirname);
Docs.watch(__dirname+'/index.js');
Docs.destruct();
console.log(Docs.namespaces);
