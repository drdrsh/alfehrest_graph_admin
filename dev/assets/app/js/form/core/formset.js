AlFehrestNS.Forms.FormSet = function(options) {
    
    
    var mOptions = {
        'formTemplates': {},
        'domContainer': null
    };
    mOptions = $.extend( {}, mOptions, options );
    
    var mForms = {};
    var mDomLists = [];
    var mFormSelectionPath = mOptions.selectPath.split('.');
    //$("<select>").append("<option value='0'>"+mOptions.listText+"</option>");
    var mDomFieldset = null;
    var mDomFormsContainer = null;

    fetchChildren(mFormSelectionPath, mOptions.formTemplates);

    mDomFormsContainer = $("<div />").addClass('forms-container');
    mDomFieldset = $("<fieldset />")
        .append($("<legend>").html(mOptions.titleText))
        .append($("<label>").html(mOptions.listText))
        .append(mDomLists)
        .append($("<button>").html(mOptions.buttonText).click(onAddClicked))
        .append(mDomFormsContainer);

    mOptions.domContainer.append(mDomFieldset);
  

    
    function fetchChildren(partsArray, currentObject, currentNode, $list, level) {
        
        if(typeof currentNode == "undefined") {
            currentNode = {};
        }
        
        if(typeof $list == "undefined") {
            $list = $("<select>")
                .attr('data-level', 0)
                .append("<option value='0'>Please Select</option>")
                .change(OnNestedListChanage)
                .addClass("nested-level-0")
                .addClass("active");
                
        }
        
        if(typeof level == "undefined") {
            level = 0;
        }
        var part = partsArray[0];
        
        if(part != "*") {
            currentObject = currentObject[part];
        }

        mDomLists.push($list);
        for(var idx in currentObject) {
        
            currentNode[idx] = {
                label: currentObject[idx].label,
            };
            var lbl = currentObject[idx].label || idx;
            $list.append( $("<option value='"+idx+"'>" + _(lbl) + "</option>") );

            $newList = $("<select>")
                        .attr('data-level', 1)
                        .attr('data-parent', idx)
                        .append("<option value='0'>Please Select</option>")
                        .addClass("nested-level-" + (level+1))
                        .addClass("parent-" + idx + "-" +  (level+1))
                        .change(OnNestedListChanage)
                        .hide();

            maxNestedLevel = level + 1;
            if(partsArray.length != 1) {
                currentNode[idx].items = {};
                fetchChildren(partsArray.slice(1), currentObject[idx], currentNode[idx].items, $newList, (level+1));
            }
        }
        
        return currentNode;
    
    }
    
    function getCurrentNestedSelection() {

        var result = [];
        for(var i=0; i<maxNestedLevel; i++) {
            var val = $(".nested-level-"+i+".active").val();
            if(!val || parseInt(val, 10) == 0){
                continue;
            }
            result.push(val);
        }
        return result;
    }
    
    function OnNestedListChanage() {
        
        var $list = $(this);
        var currentLevel = parseInt($list.attr('data-level'), 10);
        var parentOptionId = $list.attr('data-parent');
            
        var $nextLevelLists = $('.nested-level-' + (currentLevel+1));
        $nextLevelLists.removeClass('active');
        $nextLevelLists.hide();
        
        var $selectedList = $(".parent-" + $list.val() + "-" +  (currentLevel+1))
        $selectedList.addClass('active');
        $selectedList.show();
        
    }  
    
    function getFormFromType(type) {
        
        var selection = type.split('.');
        var currentObject = mOptions.formTemplates;
        for(var i=0; i<mFormSelectionPath.length; i++) {
            var part = mFormSelectionPath[i];
            if(part == '*') {
                currentObject = currentObject[selection[i]];
            } else {
                currentObject = currentObject[part][selection[i]];
            }
            if(typeof currentObject === 'undefined') {
                return [];
            }
        }
        return currentObject.fields;
        
    }
    
    function onAddClicked(){
        
        var selection = getCurrentNestedSelection();
        if(selection.length  != 2){
            return;
        }
        selection = selection.join('.');
        
        addEntry(selection, null);

    }
    
    function disableForm(id){
        var row = $('#nested_form_' + id);
        $('button', row).attr('disabled', '');
    }
    
    function enableForm(id){
        var row = $('#nested_form_' + id);
        $('button', row).removeAttr('disabled');
    }

    
    function onSaveClicked(){
        var rowId = $(this).attr('data-id');
        disableForm(rowId);
        if(typeof mOptions['save'] === 'function'){
            mOptions['save'](mForms[rowId].type, mForms[rowId].form.getData())
            .done(function(){
                enableForm(rowId);
                //Show visual indicator of saved
            })
            .fail(function(){
                enableForm(rowId);
                //Show visual indicator of not-saved
            });
        } else {
            enableForm(rowId);
        }    
    }
    
    function onDeleteClicked(){
        var rowId = $(this).attr('data-id');
        disableForm(rowId);

        if(typeof mOptions['delete'] === 'function'){
            mOptions['delete'](mForms[rowId].type, mForms[rowId].form.getData())
            .done(function(){
                $('#nested_form_' + rowId).remove();
                delete mForms[rowId];
            })
            .fail(function(){
                enableForm(rowId)
            });
        } else {
            $('#' + getRowId(rowId)).remove();
        }    
    }

    function addEntry(type, data) {
        
        var rand = AlFehrestNS.Forms.getRandomName();
        var container = $("<div />").addClass("nested-form").attr('id', 'nested_form_' + rand);
        var elms = getFormFromType(type);
        delete elms.type;

        var elements = {};
        elements['type'] = {
            name: "type",
            type: "ReadOnly",
            value: type
        };
        //Assumes objects have ordered keys, bad assumption but works, I am lazy!
        for(var idx in elms) {
            elements[idx] = elms[idx];
        }

        mForms[rand] = {
            'type': type,
            'form': new AlFehrestNS.Forms.Form({elements: elements})
        };
        mForms[rand].form.append(container);
        if(data){
            mForms[rand].form.setData(data);
        }
        container.append(
            $('<button />')
            .addClass('deleteBtn')
            .attr('data-id', rand)
            .html('Delete')
            .click(onDeleteClicked)
        );
        mDomFormsContainer.append(container);
    }
    
    var es = mOptions.elements;
    mOptions.elements = {};
    
    for(var idx in es){
        var elm = es[idx];
        if(elm.type){
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
        var data = [];
        for(var idx in mForms) {
            data.push(mForms[idx].form.getData());
        }
        return data;
    };
    
    this.setData = function(data) {
        for(var i=0;i<data.length;i++) {
            addEntry(data[i].type, data[i]);
        }
    };
        
    
};
