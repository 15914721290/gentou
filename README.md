#express-multipage 多页面应用
###express+nodejs+less+html5+css3+webpack+jquery+lazyload
<br><br>

##1、克隆项目代码:
###$ git clone https://github.com/womendi/express-multipage.git
<br><br>

##2、cd到项目根目录:
###$ cd express-multipage
<br><br>

##服务器布署方式
####(忽略以上序号1和2,只执行序号3、4、5、6中命令)
####(以下序号3、4、5、6中命令均在根目录执行)
<br><br>

##3,安装依赖:
###$ npm install
###或者 $ npm install -g cnpm --registry=https://registry.npm.taobao.org
###然后 $ cnpm install
<br><br>

##4,webpack打包css,js:
###$ npm run build
<br><br>

##5,启动应用配置服务器信息:
###1,测试环境:
####请将变量svurl中'name=测试环境'的url改成测试环境对应的Ip(url=''为使用本地ip)
####请将变量apiurl中'name=测试环境'的url改成测试环境对应的Ip
####serverId=0改成serverId=1
###2,生产环境:
####请将变量svurl中'name=生产环境'的url改成生产环境对应的Ip(url=''为使用本地ip)
####请将变量apiurl中'name=生产环境'的url改成生产环境对应的Ip
####serverId=0改成serverId=2
###3,布署服务器时记得必须执行过一次 ($ npm install和$ npm run build)
###4,建议服务器部署时修改端口3007为其他,修改位置./build/www(可不修改)
<br><br>

##6,启动应用
###$ npm start 或者(让nodejs在linux后台运行则npm start改成pm2 start ./build/www)
###让nodejs在linux后台运行则$ npm start改成$ pm2 start ./build/www(若pm2没安装，请先npm install -g pm2)
####1,看到 Listening on port http://具体ip:3007 ,Run successfully,表示运行成功
####2,打开应用:http://具体ip:3007查看是否运行正常
####3,http://具体ip:3007中具体ip为本机ip  http://localhost:3007也可以打开
<br><br>

##7、兼容性:
###1,兼容ie8:
####测试了win10中的ie11浏览器选用文档模式为IE8正常、win7中IE8浏览器正常;
####IETester0.5.4(按钮新建IE各版本)测试只有ie10与默认版本正常
###2,兼容百度浏览器:
####测试了win10中的百度浏览器版本8.7正常
###3,兼容QQ浏览器:
####测试了win10中的QQ浏览器版本9.7正常
###4,兼容firefox:
####测试了win10中的firefox浏览器版本号57.0正常
###5,兼容chrome:
####测试了win10中的chrome浏览器版本号62正常