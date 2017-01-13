# 台鐵語音查詢
* 請允許麥克風，桌機上可以直接用說的方式輸入，手機必須用打的，或由鍵盤語音輸入。
* 不支援 IE 那個智障兒，語音操作僅支援 chrome。
* 可以自行增加 js/patterns.js 以擴充指令 pattern。

# 台鐵查詢 API
```
{
  "url": "https://nu0poq52hf.execute-api.us-east-1.amazonaws.com/prod/train-api",
  "method": "GET",
  "description": "台鐵火車時刻表 API",
  "queryString": {
    "fromstation": "String (required) 起站. ex.'台北'",
    "tostation": "String (required) 訖站. ex.'桃園'",
    "searchdate": "String (option) 日期. ex.'2017/01/11'",
    "fromtime": "String (option) 搜尋起始時間. ex.'0600'",
    "totime": "String (option) 搜尋結束時間. ex.'2359'"
  }
}
```
