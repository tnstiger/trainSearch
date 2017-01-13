/*
 * Patterns parser
 * return 5 parameters,
 *    fromstation (required), format String
 *    tostation (required), format String
 *    searchdate, format 'YYYY/MM/dd', default today
 *    fromtime, format 'HHmm', default now
 *    totime, format 'HHmm', default '2359'
 */


var patterns = [
  {
    regex: '(.+)到(.+)',
    pattern: 'XX<span class="pattern">到</span>XX',
    sample: '台北<span class="pattern">到</span>台南',
    parse: function(matchs){
      return {
        fromstation: matchs[0],
        tostation: matchs[1],
        searchdate: '',
        fromtime: '',
        totime: '',
      }
    },
  },
];
