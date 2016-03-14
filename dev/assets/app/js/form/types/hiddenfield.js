AlFehrestNS.Forms.HiddenField = {};
AlFehrestNS.Forms.HiddenField = function(options) {
    
    var rand = AlFehrestNS.Forms.getRandomName();
    var mOptions = {
        'id': rand,
        'name': rand,
        'label': 'field_' + rand,
        'value': '',
        'css': '',
        'change': null,
        'validation': null
    };
    
    var mSelf = {};
    var mDomElement = null;
    
    function startup() {
        
        mOptions = $.extend( {}, mOptions, options );

        mDomElement = $('<input />')
            .attr('type', 'hidden')
            .val(mOptions.value)
            .change(mOptions.change)
            .attr('name', mOptions.name)
            .attr('id', mOptions.id)
            .addClass(mOptions.css)
            .addClass(mSelf.name.toLowerCase());
    };
    
    function setValue(val){
        mDomElement.val(val);
    };
    
    
    
    mSelf = {
        
        name: "HiddenField",

        getOptionValue: function(id){
            return mOptions[id];
        },

        getDom: function() {
            return mDomElement;
        },
        
        setValue: function(val) {
            mDomElement.val(val);
        },
        
        getValue: function() {
            return mDomElement.val();
        }

        
    };
    
    startup();
    
    AlFehrestNS.Forms.copyThis(this, mSelf);
    
};
AlFehrestNS.Forms.HiddenField.prototype = AlFehrestNS.Forms.Base;
