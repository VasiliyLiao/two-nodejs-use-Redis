# 利用redis溝通兩個nodejs之前的橋樑
利用第一個nodejs端當作底層TCP的傳輸過程，並且把所處理過的資料透過redis給另外一個nodejs使用。
本次測試透過TCP client端發送消息給TCP Server並透過redis溝通另外一個nodejs再把過濾的訊息回傳回來。

## 初始設定
### Running TCP server

###### 1.啟動TCP Server
```shell
  node basic.js
```

###### 2.啟動TCP Client

```shell
  node tcp-client.js
```

###### 3.啟動API Server(後端擴充功能開發)

```shell
  node api.js
```
------
參考:<https://github.com/jigsawye/node-udp-tcp-demo>
