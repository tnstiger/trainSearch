var recognizer = new webkitSpeechRecognition();

$(function() {

    recognizer.continuous = true;
    recognizer.lang = 'cmn-Hant-TW';
    recognizer.interimResults = true;
    recognizer.start();
    recognizer.onresult = function(event) {

        $('#voice').val('');
        for (var i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
                $('#spin_el').spin();
                $('#voice').val($('#voice').val() + event.results[i][0].transcript);
                var voice = $('#voice').val();
                var codes = parseVoice(voice);
                getSearchData(codes, function(data) {
                    $('#spin_el').spin(false);
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
                });
            } else {
                $('#voice').val($('#voice').val() + event.results[i][0].transcript);
            }
        }
    };
})

function voiceReset() {
    $('#spin_el').spin(false);
    $('#voice').val('');
    $('#table').bootstrapTable('destroy');
    recognizer.start();
}

function parseVoice(voice) {
    return voice.split('到').map(function(stationName) {
        return stations[stationName];
    });
}

function getSearchData(codes, callback) {
    var date = moment().format('YYYY/MM/DD');
    var time = moment().format('HHmm');
    var apiUrl = "http://www.madashit.com/api/get-Tw-Railway?date=" + date + "&fromstation=" + codes[0] + "&tostation=" + codes[1] + "&fromtime=" + time + "&totime=2359";
    $.ajax({
        url: apiUrl, // Or your web page link
        type: 'GET',
        success: function(res) {
            var data = JSON.parse(res.responseText.replace('<html><head/><body>﻿ ', '').replace('</body></html>', ''));
            callback(data);
        }
    });
}
