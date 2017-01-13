/*
 * Patterns parser
 * return 5 parameters,
 *    fromstation (required), format String
 *    tostation (required), format String
 *    searchdate, format 'YYYY/MM/dd', default today
 *    fromtime, format 'HHmm', default now
 *    totime, format 'HHmm', default '2359'
 */


var patterns = [{
        regex: '(.+)到(.+)',
        pattern: '[車站]<span class="pattern">到</span>[車站]',
        sample: '台北<span class="pattern">到</span>台南',
        parse: function(matchs) {
            return {
                fromstation: matchs[0],
                tostation: matchs[1],
                searchdate: '',
                fromtime: '',
                totime: '',
            }
        },
    },
    {
        regex: '(昨天|今天|明天|後天|大後天)(早上|上午|中午|下午|傍晚|晚上)(.+)到(.+)',
        pattern: '[哪天][時段][車站]<span class="pattern">到</span>[車站]',
        sample: '明天早上台北<span class="pattern">到</span>台南',
        parse: function(matchs) {
            var searchdate = '';
            switch (matchs[0]) {
                case '今天':
                    break;
                case '明天':
                    searchdate = moment().add(1, 'day').format('YYYY/MM/DD');
                    break;
                case '後天':
                    searchdate = moment().add(2, 'day').format('YYYY/MM/DD');
                    break;
                case '大後天':
                    searchdate = moment().add(3, 'day').format('YYYY/MM/DD');
                    break;
            }

            var fromtime = '';
            var totime = '';
            switch (matchs[1]) {
                case '早上':
                case '上午':
                    fromtime = '0600';
                    totime = '1200';
                    break;
                case '中午':
                    fromtime = '1100';
                    totime = '1400';
                    break;
                case '下午':
                    fromtime = '1200';
                    totime = '1800';
                    break;
                case '傍晚':
                    fromtime = '1500';
                    totime = '1900';
                    break;
                case '晚上':
                    fromtime = '1800';
                    totime = '2359';
                    break;
            }

            return {
                fromstation: matchs[2],
                tostation: matchs[3],
                searchdate: searchdate,
                fromtime: fromtime,
                totime: totime,
            }
        },
    },
    {
        regex: '(\\d+)月(\\d+)(號|日)(.+)到(.+)',
        pattern: '[幾月幾號][車站]<span class="pattern">到</span>[車站]',
        sample: '12月31號台北<span class="pattern">到</span>台南',
        parse: function(matchs) {
            var searchdate = moment(moment().year()+'/'+matchs[0]+'/'+matchs[1], "YYYY-MM-DD").format('YYYY/MM/DD');
            return {
                fromstation: matchs[3],
                tostation: matchs[4],
                searchdate: searchdate,
                fromtime: '',
                totime: '',
            }
        },
    },
    {
        regex: '(\\d+)月(\\d+)(號|日)(早上|上午|中午|下午|傍晚|晚上)(.+)到(.+)',
        pattern: '[幾月幾號][時段][車站]<span class="pattern">到</span>[車站]',
        sample: '12月31號早上台北<span class="pattern">到</span>台南',
        parse: function(matchs) {
            var searchdate = moment(moment().year()+'/'+matchs[0]+'/'+matchs[1], "YYYY-MM-DD").format('YYYY/MM/DD');

            var fromtime = '';
            var totime = '';
            switch (matchs[3]) {
                case '早上':
                case '上午':
                    fromtime = '0600';
                    totime = '1200';
                    break;
                case '中午':
                    fromtime = '1100';
                    totime = '1400';
                    break;
                case '下午':
                    fromtime = '1200';
                    totime = '1800';
                    break;
                case '傍晚':
                    fromtime = '1500';
                    totime = '1900';
                    break;
                case '晚上':
                    fromtime = '1800';
                    totime = '2359';
                    break;
            }

            return {
                fromstation: matchs[4],
                tostation: matchs[5],
                searchdate: searchdate,
                fromtime: fromtime,
                totime: totime,
            }
        },
    },
];
