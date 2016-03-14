AlFehrestNS.Forms.TextField = {};
AlFehrestNS.Forms.TextField = function(options) {
    
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

        mDomContainer = $('<div />').addClass('form-textfield');

        mDomElement = $('<input />')
            .attr('type', 'text')
            .val(mOptions.value)
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
        
    };
    
    
    
    mSelf = {
        
        name: "TextField",

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
AlFehrestNS.Forms.TextField.prototype = AlFehrestNS.Forms.Base;
