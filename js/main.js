var recognizer = new webkitSpeechRecognition();
var vue_pattern;

$(function() {
    voiceInit();
    patternInit();
    recognizer.onresult = function(event) {
        $('#voice').val('');
        for (var i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
                $('#voice').val($('#voice').val() + event.results[i][0].transcript);
                parseVoice();
            } else {
                $('#voice').val($('#voice').val() + event.results[i][0].transcript);
            }
        }
    };
})


function patternInit() {
    if (patterns === undefined) throw 'Must include patterns.js';
    vue_pattern = new Vue({
        el: '#pattern_list',
        data: {
            patterns: patterns,
            params: {},
            selectedPattern: -1,
        }
    })
}

function voiceInit() {
    // recognizer.continuous = true;
    recognizer.lang = 'cmn-Hant-TW';
    recognizer.interimResults = true;
    recognizer.start();
}

function voiceReset() {
    // clear fields
    $('#spin_el').spin(false);
    $('#voice').val('');
    $('#table').bootstrapTable('destroy');
    $('#error_msg').hide(100);
    vue_pattern.selectedPattern = -1;

    // restart the recognizer
    try{
        recognizer.abort();
        recognizer.start();
    }catch(e){}

}

function noMatchPattern() {
  $('#pattern_list').spin(false);
  $('#error_msg').show(100);
}

function parseVoice() {
    recognizer.abort();
    $('#pattern_list').spin();
    var voice = $('#voice').val();
    var parseResult = {
        selectedPattern: -1,
    };
    patterns.forEach(function(obj, index) {
        if (new RegExp(obj.regex, 'i').test(voice)) {
            var matchs = voice.match(obj.regex);
            matchs.shift();
            parseResult.selectedPattern = index;
            parseResult.params = obj.parse(matchs);
            return;
        }
    })

    if (parseResult.selectedPattern === -1) noMatchPattern();
    else {
        vue_pattern.selectedPattern = parseResult.selectedPattern;
        vue_pattern.params = parseResult.params;

        getSearchData(parseResult.params, function(data) {
            $('#pattern_list').spin(false);
            setupResultTable(data);
        });
    }
}

function getSearchData(params, callback) {
    var apiUrl = "https://nu0poq52hf.execute-api.us-east-1.amazonaws.com/prod/train-api?fromstation=" + params.fromstation + "&tostation=" + params.tostation;
    if (params.searchdate !== undefined) apiUrl = apiUrl + "&searchdate=" + params.searchdate;
    if (params.fromtime !== undefined) apiUrl = apiUrl + "&fromtime=" + params.fromtime;
    if (params.totime !== undefined) apiUrl = apiUrl + "&totime=" + params.totime;
    $.ajax({
        url: apiUrl,
        type: 'GET',
        success: function(data) {
            callback(data);
        }
    });
}

function setupResultTable(data) {
    $('#table').bootstrapTable('destroy');
    $('#table').bootstrapTable({
        data: data,
        columns: [{
            field: '開車時間',
            title: '開車時間',
            sortable: true,
        }, {
            field: '到達時間',
            title: '到達時間',
            sortable: true,
        }, {
            field: '行駛時間',
            title: '行駛時間',
            sortable: true,
        }, {
            field: '車種',
            title: '車種',
            sortable: true,
        }, {
            field: '車次',
            title: '車次'
        }, {
            field: '票價',
            title: '票價',
            sortable: true,
        }],
    });
}
