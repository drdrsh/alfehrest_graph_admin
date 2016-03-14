AlFehrestNS.Forms.MultiL = {};
AlFehrestNS.Forms.MultiL = function(options) {
    
    var rand = AlFehrestNS.Forms.getRandomName();
    var mOptions = {
        'id': rand,
        'name': rand,
        'label': 'field_' + rand,
        'value': [],
        'css': '',
        'change': null,
        'delete': null,
        'add': null,
        'save': null,
        'validation': null
    };
    
    var mInternalCounter = 0;
    var mSelf = {};
    var mDomContainer = null;
    var mDomTitle = null;
    var mDomList = null;
    var mDomRows = [];
    var mDomHeaders = [];
    
    var mInputs = [];
    
    function getAllInputs(){
        return mInputs;
    }
    
    function getOneInput(id){
        return mInputs[id];
    }
    
    function getAllValues() {
        var values = [];
        for(var i=0;i<mInputs.length;i++){
            var val = mInputs[i].val();
            if(val.length != 0){
                values.push(mInputs[i].val());
            }
        }
        return values;
    }
    
    function getOneValues(id) {
        return mInputs[id].val();
    }
    

    function getRowId(idx){
        return mOptions.id + '_row_' + idx;
    }
    

    function addRow(value, rowId){
        
        if(typeof rowId === "undefined"){
            rowId = mInternalCounter++;
        }
        if(typeof value === "undefined"){
            value = "";
        }
        var idx1 = rowId;
        var row = $('<li />').attr('id', getRowId(idx1))

        mInputs[idx1] = new AlFehrestNS.Forms.TextField({
            value: value,
            id: mOptions.name + "_" + rowId,
            name: mOptions.name + "[]",
            label: ""
        });
        mInputs[idx1].append(row);

        row.append(
            $('<button />')
            .addClass('deleteBtn')
            .attr('data-id', idx1)
            .html('Delete')
            .click(onDeleteClicked)
        );
        /*
        row.append(
            $('<button />')
            .addClass('saveBtn')
            .attr('data-id', idx1)
            .html('Save')
            .click(onSaveClicked)
        );
        */
        mDomList.append(row);

    }
    
    function startup() {
        mOptions = $.extend( {}, mOptions, options );

        mDomContainer = $('<div />').addClass('form-multil');

        mDomTitle = $('<h2 />').html(mOptions.label).append($("<button class='addBtn'>Add</button>"));
        mDomList = $('<ol />').addClass(mSelf.name).addClass(name);

        mDomTitle.find('.addBtn').click(function(){
            if(typeof mOptions['add'] === 'function'){
                if(mOptions['add'](mInputs)){
                    addRow();
                    return;
                }
            }
            addRow();
        });

        mDomContainer.append(mDomTitle).append(mDomList);

    };

    function disableRow(id){
        var row = $('#' + getRowId(id));
        $('button', row).attr('disabled', '');
    }
    
    function enableRow(id){
        var row = $('#' + getRowId(id));
        $('button', row).removeAttr('disabled');
    }
    
    function onSaveClicked(){
        var rowId = $(this).attr('data-id');
        disableRow(rowId);
        if(typeof mOptions['save'] === 'function'){
            mOptions['save'](getOneValues(rowId))
            .done(function(){
                enableRow(rowId);
                //Show visual indicator of saved
            })
            .fail(function(){
                enableRow(rowId);
                //Show visual indicator of not-saved
            });
        } else {
            enableRow(rowId);
        }    
    }
    
    function onDeleteClicked(){
        var rowId = $(this).attr('data-id');
        disableRow(rowId);

        if(typeof mOptions['delete'] === 'function'){
            mOptions['delete'](getOneValues(rowId))
            .done(function(){
                $('#' + getRowId(rowId)).remove();
                mInputs.splice(rowId, 1);
            })
            .fail(function(){
                enableRow(rowId)
            });
        } else {
            $('#' + getRowId(rowId)).remove();
            mInputs.splice(rowId, 1);
        }
    }
    
    
    
    mSelf = {
        
        name: "MultiL",
        
        getOptionValue: function(id){
            return mOptions[id];
        },

        getDom: function() {
            return mDomContainer;
        },
        
        setValue: function(val) {
            if(!Array.isArray(val)){
                val = val.split(',');
            }
            for(var i=0;i<val.length;i++){
                addRow(val[i]);
            }
        },
        
        getValue: function() {
            return getAllValues();
        },
        
        toString: function(){
        
        }
        
    };
    
    
    startup();

    AlFehrestNS.Forms.copyThis(this, mSelf);    

    
};
AlFehrestNS.Forms.MultiL.prototype = AlFehrestNS.Forms.Base;