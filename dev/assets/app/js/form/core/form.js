AlFehrestNS.Forms.Form = function(options) {
    
    
    var mOptions = {
        'elements': {
        }
    };
    
    mOptions = $.extend( {}, mOptions, options );

    var es = mOptions.elements;
    mOptions.elements = {};
    
    for(var idx in es){
        var elm = es[idx];
        if(elm.type){
            elm.id = elm.id || idx;
            elm.name = elm.name || idx;
            elm = new AlFehrestNS.Forms[elm.type](elm);
        }
        mOptions.elements[elm.getOptionValue('id')] = elm;
    }

    this.append = function(target) {
        for(var idx in mOptions.elements) {
            mOptions.elements[idx].append(target);
        }
    };
    
    this.getData = function() {
        var data = {};
        for(var idx in mOptions.elements) {
            data[idx] = mOptions.elements[idx].val();
        }
        return data;
    };
    
    this.setData = function(data){
        for(var idx in data){
            if(!mOptions.elements[idx]){
                continue;
            }
            mOptions.elements[idx].val(data[idx]);
        }
    };
        
    
};
