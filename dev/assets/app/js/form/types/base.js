AlFehrestNS.Forms.Base = {
        
    append: function(parent) {
        $(parent).append(this.getDom());
        if(this.onAfterAdd) {
            this.onAfterAdd();
        }
    }, 
    
    setValue: function(param){
        
    },
    
    getValue: function() {
        return null;
    },
    
    val: function(param) {
        if(typeof param === "undefined") {
            return this.getValue();
        } else {
            this.setValue(param);
            return this;
        }
    },
    
    fromString: function(str){
        try {
            this.val(JSON.parse(str));
        } catch(e) {
            this.val(str);
        }
    },
    
    toString: function(){
        var val = this.val();
        if(typeof val === "number" || typeof val === "string"){
            return val;
        }
        return JSON.stringify(val);
    }
};
