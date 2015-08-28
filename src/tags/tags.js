import param from './param';
import used from './used';
import _private from './private';
import _return from './return';
import name from './name';
import note from './note';
import important from './important';
import deprecated from './deprecated';
import description from './description';
import namespace from './namespace';
import _function from './function';
import _var from './var';

let tags = {
    param, 
    used, 
    name,
    note,
    important,
    deprecated,
    description,
    namespace,
    private: _private,
    return: _return,
    function: _function,
    var: _var
};


export default tags;
