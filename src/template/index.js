import Fs from 'fs';
var total = 0;
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
            // TODO: Duplicate!
            if(line.type === 'line'){
                let lineString = line.content.replace(/\[(\w+)\]/g, function(all, name){
                    if(data[name]){
                        return data[name];
                    }else{
                        return '';
                    }
                });
                markdown.push(lineString);
            }else if(line.type === 'for'){
                markdown.push(this._fillFor(line, data));
            }
        });
        return markdown.join('\n');
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
                
                if(line.type === 'line'){
                    let lineString = line.content.replace(/\[(\w+)\]/g, function(all, name){
                        if(item[name]){
                            return item[name];
                        }else{
                            return '';
                        }
                    });
                    markdown.push(lineString);
                }else if(line.type === 'for'){
                    markdown.push(this._fillFor(line, item));
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
                return false;
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
                    total ++;
                    
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
