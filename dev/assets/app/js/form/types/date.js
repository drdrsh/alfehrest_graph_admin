AlFehrestNS.Forms.Date = {};
AlFehrestNS.Forms.Date = function(options) {
    
    var rand = AlFehrestNS.Forms.getRandomName();
    var mOptions = {
        'id': rand,
        'name': rand,
        'label': 'field_' + rand,
        'value': {},
        'css': '',
        'change': null,
        'validation': null
    };
    
    var mModes = {
        'before': 'قبل',
        'after': 'بعد',
        'between': 'ما بين',
        'approx': 'حوالي',
        'exact' : 'تحديدا في'
    };

    var mSelf = {};
    var mDomContainer = null;
    var mDomMode = null;
    var mDomFirstDate = null;
    var mDomSecondDate = null;
    var mDomLabel = null;

    var mDisplayFormat = 'MM d, YY';
    
    function onModeChanged(){
        var val = mDomMode.val();
        if(val == 'between'){
            mDomSecondDate.show();
        } else {
            mDomSecondDate.hide();
        }
    }
    
    function startup() {
        
        mOptions = $.extend( {}, mOptions, options );
        mDomContainer = $('<div />').addClass('form-date');

        mDomMode = $('<select />');
        for(var idx in mModes){
            mDomMode.append($("<option></option>").attr("value", idx).text(mModes[idx]));
        }
        mDomMode.val(mOptions.value.mode);
        mDomMode.change(onModeChanged);
    
        mDomFirstDate = $('<input />')
            .attr('type', 'text')
            .val(mOptions.value.first_date)
            .attr("readonly", "")
            .addClass(mOptions.css)
            .addClass(mSelf.name.toLowerCase());

        mDomSecondDate = $('<input />')
            .attr('type', 'text')
            .val(mOptions.value.second_date)
            .attr("readonly", "")
            .addClass(mOptions.css)
            .addClass(mSelf.name.toLowerCase());

        mDomLabel = $('<label />')
            .html(mOptions.label)
            .attr('id', mOptions.id + '_label');


        mDomContainer.append(mDomLabel).append(mDomMode).append(mDomFirstDate).append(mDomSecondDate);

        onModeChanged();
    
    };
    
    function setValue(val) {
        var calendar = $.calendars.instance('islamic');

        var date = null;
        var first_date = val.first_date;
        var second_date = val.second_date;

        if(first_date != ""){
            try {
                first_date = calendar.formatDate(mDisplayFormat, calendar.fromJD(first_date));
            } catch(e) {
                first_date = "";
            }
        }

        if(second_date != ""){
            try {
                second_date = calendar.formatDate(mDisplayFormat, calendar.fromJD(second_date));
            } catch(e) {
                second_date = "";
            }
        }

        mDomMode.val(val.mode);
        mDomFirstDate.val(first_date);
        mDomSecondDate.val(second_date);
    }
    
    function getValue(){
        var calendar = $.calendars.instance('islamic');
        var date = null;

        date = calendar.parseDate(mDisplayFormat,  mDomFirstDate.val().replace('00',''));
        var first_date = date?date.toJD():"";

        date = calendar.parseDate(mDisplayFormat,  mDomSecondDate.val().replace('00',''));
        var second_date = date?date.toJD():"";

        var value = {
            mode: mDomMode.val(),
            first_date: first_date,
            second_date: second_date
        };
        return value;
    }
    
    
    mSelf = {
        
        name: "Date",
        
        getOptionValue: function(id){
            return mOptions[id];
        },
        
        getDom: function() {
            return mDomContainer;
        },
        
        setValue: setValue,
        getValue: getValue,
        onAfterAdd: function() {
            var calendar = $.calendars.instance('islamic');

            mDomFirstDate.calendarsPicker({
                calendar: calendar,
                minDate: calendar.newDate(-100, 1, 1),
                defaultDate: calendar.newDate(1, 1, 1),
                maxDate: calendar.newDate( 100, 1, 1),
                yearRange: 'c-100:c+100',
                isRTL: true,
                dateFormat: mDisplayFormat
            });
            mDomSecondDate.calendarsPicker({
                calendar: calendar,
                minDate: calendar.newDate(-100, 1, 1),
                defaultDate: calendar.newDate(1, 1, 1),
                maxDate: calendar.newDate( 100, 1, 1),
                yearRange: 'c-100:c+100',
                isRTL: true,
                dateFormat: mDisplayFormat
            });
        }

        
    };
    
    startup();
    
    AlFehrestNS.Forms.copyThis(this, mSelf);    
    
};
AlFehrestNS.Forms.Date.prototype = AlFehrestNS.Forms.Base;
