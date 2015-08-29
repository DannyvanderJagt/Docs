import Fs from 'fs';

let Template = {
    constructor(){
        this.templateString = this._getTemplate();
        this.template = this._strip(this.templateString);
    },
    fill(data, template){
        Fs.writeFileSync(__dirname+'/data.js', JSON.stringify(data));
        if(!template){
            template = this.template;
        }
        let markdown = [];
        template.forEach((line) => {
            let l = this._fillLine(line, data);
            if(l !== false){
                markdown.push(l);
            }
        });
        return markdown.join('\n');
    },
    _fillLine(line, data){
        if(line.type === 'line'){
            let canBeRemoved = false;
            let lineString = line.content.replace(/\[(\?)?(\w+)\]/g, function(all, mark, name){
                if(data[name]){
                    return data[name];
                }else{
                    if(mark === '?'){
                        canBeRemoved = true;
                    }
                    return '';
                }
            });
            if(canBeRemoved){
                return false;
            }
            if(lineString.match(/\s*\[\@if/)){
                lineString = this._fillIf(lineString, data);
            }
            return lineString;
        }else if(line.type === 'for'){
            return this._fillFor(line, data);
        }else if(line.type === 'if'){
            return this._fillIf(line, data);
        }
    },
    _fillIf(line, data){
        let newLine =  line.replace(/\[@if\s*(\w*)\](.*)\[@endif\]/, function(all, name, string){
            if(data[name]){
                return arguments[2];
            }
            return '';
        });
        return newLine;
    },
    _fillFor(templateLine, data){
        let template = templateLine.content;
        let condition = templateLine.condition;
        let markdown = [];
        
        let match = condition.match(/\[@for\s*(\w+)\s*\|?\s*(\w*)/);
        let name = match[1];
        let sub = match[2];
        
        let forData = data;
        
        if(!forData[name]){
            console.log(name + ' could not be found in data!', forData);
            return '\n-';
        }
        
        forData = forData[name];
        
        if(sub){
            if(!forData[sub]){
                console.log(sub + ' could not be found in data!', forData);
                return '\n-';
            }
            forData = forData[sub];
        }
        
        if(forData.length === 0){
            return '\n-';
        }
        
        forData.forEach((item) => {
            template.forEach((line) => {
                let l = this._fillLine(line, item);
                if(l !== false){
                    markdown.push(l);
                }
            });
        });
        return markdown.join('\n');
    },
    _getTemplate(){
        return Fs.readFileSync(__dirname + '/template.md', 'utf-8');
    },
    _strip(string){
        let lines = string.split(/\n/g);
        
        // Get all the loops.
        let template = [];
        let looking = null;
        let founded = 0;
            
        lines.forEach((line) => {
            if(!line.match(/^\s*\[\@/)){
                if(looking){
                    looking.push(line);
                }else{
                    template.push({
                        type: 'line',
                        content: line
                    });
                }
            }else if(line.match(/^\s*\[\@if/)){
                if(looking){
                    looking.push(line);
                }else{
                    template.push({
                        type: 'if',
                        content: line
                    });
                }
            }else if(line.match(/^\s*\[\@for/)){
                if(!looking){
                    looking = [];
                }
                looking.push(line);
                founded ++;
            }else if(line.match(/^\s*\[\@endfor/)){
                founded --;
                if(founded === 0){
                    looking.push(line);

                    let content = looking.slice(1,looking.length -1);
                    
                    template.push({
                        type: 'for',
                        condition: looking[0],
                        content: this._strip(content.join('\n'))
                    });
                    looking = null;
                }else{
                    looking.push(line);
                }
            }
        });
        
        return template;
    }
};

Template.constructor();


export default Template;
