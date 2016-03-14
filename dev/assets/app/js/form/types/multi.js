AlFehrestNS.Forms.Multi = {};
AlFehrestNS.Forms.Multi = function(options) {
    
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
        'validation': null,
        'elements' : {
        }
    };
    
    var mInternalCounter = 0;
    var mSelf = {};
    var mDomContainer = null;
    var mDomTable = null;
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
            var valSet = {};
            for(var idx in mInputs[i]){
                valSet[idx] = mInputs[i][idx].val();
            }
            values.push(valSet);
        }
        return values;
    }
    
    function getOneValues(id) {
        valSet = {};
        for(var idx in mInputs[id]){
            valSet[idx] = mInputs[id][idx].val();
        }
        return valSet;
    }
    
    function createElement(elm, value, idx1, idx2){
        var newEl = {
            value: value,
            id: idx2 + '_' + idx1,
            name: elm.name + "[]",
            label: ""
        };
        
        if(!mInputs[idx1]){
            mInputs[idx1] = {};
        }

        mInputs[idx1][idx2] = new AlFehrestNS.Forms[elm.type](newEl);
        return mInputs[idx1][idx2];
    }
    
    function getRowId(idx){
        return mOptions.id + '_row_' + idx;
    }
    
    function getCellId(idx1, idx2){
        return mOptions.id + '_cell_' + idx1 + '_' + idx2;
    }
    
    function addRow(values, rowId){
        
        if(typeof rowId === "undefined"){
            rowId = mInternalCounter++;
        }
        if(typeof values === "undefined"){
            values = {};
        }
        var idx1 = rowId;
        var row = $('<tr />').attr('id', getRowId(idx1));
        var firstCell = $('<td />')
        row.append(firstCell);
        
        for(var idx2 in mOptions.elements){
            var domCell = $('<td />');
            var elm = mOptions.elements[idx2];
            var val = values[idx2] || elm.defaultValue;
            var formElm = createElement(elm, values[idx2], idx1, idx2);
            if(elm.type == 'HiddenField'){
                formElm.append( firstCell );
            } else {
                formElm.append( domCell );
                row.append(domCell)
            }
        }
        
        firstCell.append(
            $('<button />')
            .addClass('deleteBtn')
            .attr('data-id', idx1)
            .html('Delete')
            .click(onDeleteClicked)
        );
        /*
        firstCell.append(
            $('<button />')
            .addClass('saveBtn')
            .attr('data-id', idx1)
            .html('Save')
            .click(onSaveClicked)
        )
        */
            
        mDomTable.append(row);

    }
    
    function startup() {
        
        mOptions = $.extend( {}, mOptions, options );

        mDomContainer = $('<div />').addClass('form-multi');

        mDomTable = $('<table />').addClass(mSelf.name).addClass(name);
 
        var tableHeading = $('<tr />');
        mDomTable.append(tableHeading.html('<th><button class="addBtn">Add</button></th>'));
        for(var idx in mOptions.elements){
            var elm = mOptions.elements[idx];
            if(elm.type == 'HiddenField'){
                continue;
            }
            tableHeading.append($('<th>' + elm.label + '</th>'));
        }

        for(var idx1 in mOptions.value){
            values = mOptions.value[idx1];
            addRow(values, idx1);
            mInternalCounter = idx1;
        }
        
        mDomTable.find('.addBtn').click(function(){
            if(typeof mOptions['add'] === 'function'){
                if(mOptions['add'](mInputs)){
                    addRow();
                    return;
                }
            }
            addRow();
        });

        mDomContainer.append(mDomTable);
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
        
        name: "Multi",
        
        getOptionValue: function(id){
            return mOptions[id];
        },

        getDom: function() {
            return mDomContainer;
        },
        
        setValue: function(val) {
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
AlFehrestNS.Forms.Multi.prototype = AlFehrestNS.Forms.Base;