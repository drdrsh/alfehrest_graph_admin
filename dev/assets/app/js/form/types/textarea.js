AlFehrestNS.Forms.TextArea = {};
AlFehrestNS.Forms.TextArea = function(options) {
    
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
    var mDomContainer = null;
    var mDomElement = null;
    var mDomLabel = null;
    
    function startup() {
        
        mOptions = $.extend( {}, mOptions, options );

        mDomContainer = $('<div />').addClass('form-textarea');

        mDomElement = $('<textarea />')
            .attr('type', 'text')
            .html(mOptions.value)
            .change(mOptions.change)
            .attr('name', mOptions.name)
            .attr('id', mOptions.id)
            .addClass(mOptions.css)
            .addClass(mSelf.name.toLowerCase());
        
        mDomLabel = $('<label />')
            .html(mOptions.label)
            .attr('for', mOptions.id)
            .attr('id', mOptions.id + '_label');

        mDomContainer.append(mDomLabel).append(mDomElement);

    }
    
    function setValue(val){
        mDomElement.val(val);
    };
    
    function getValue(){
        return mDomElement.val();
    };
    
    
    mSelf = {
        
        name: "TextArea",

        getOptionValue: function(id){
            return mOptions[id];
        },

        getDom: function() {
            return mDomContainer;
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
AlFehrestNS.Forms.TextArea.prototype = AlFehrestNS.Forms.Base;
