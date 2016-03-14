AlFehrestNS.Forms.ReadOnly = {};
AlFehrestNS.Forms.ReadOnly = function(options) {
    
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
    var mDomInput = null;
    var mDomVisibleElement = null;
    
    function startup() {
        
        mOptions = $.extend( {}, mOptions, options );

        mDomElement = $('<div >')
            .attr('id', mOptions.id)
            .addClass('form-readonly')
            .addClass(mOptions.css)
            .addClass(mSelf.name.toLowerCase());


        mDomInput = $('<input />')
            .attr('type', 'hidden')
            .val(mOptions.value)
            .change(mOptions.change)
            .attr('name', mOptions.name)
            .addClass(mOptions.css)
            .addClass(mSelf.name.toLowerCase())
            .addClass('hidden-part');

        mDomVisibleElement = $('<div />')
            .html(_(mOptions.value))
            .addClass(mOptions.css)
            .addClass(mSelf.name.toLowerCase())
            .addClass('visible-part');

        mDomElement.append(mDomInput).append(mDomVisibleElement);

    }
    
    function setValue(val){
        mDomInput.val(val);
        mDomVisibleElement.val(_(val));
    }
    
    
    
    mSelf = {
        
        name: "ReadOnly",

        getOptionValue: function(id){
            return mOptions[id];
        },

        getDom: function() {
            return mDomElement;
        },
        
        setValue: setValue,

        getValue: function() {
            return mDomInput.val();
        }

        
    };
    
    startup();
    
    AlFehrestNS.Forms.copyThis(this, mSelf);
    
};
AlFehrestNS.Forms.ReadOnly.prototype = AlFehrestNS.Forms.Base;
