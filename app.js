//引入http模块
let http = require('http');

//引入路径
let path = require('path');

//引入文件
let fs = require('fs');

  //配置网站根目录
  let rootPath = path.join(__dirname,'www');
  console.log(rootPath);
//开启服务
http.createServer((request,response)=>{
    // console.log('请求来了');
  //生成的相对路径拼接成绝对路径(根据请求的url 生成静态资源服务器中的绝对路径)
  let fielPath = path.join(rootPath,request.url);
  console.log(fielPath);
//判断访问的这个文件目录是否存在
 let isExist = fs.existsSync(fielPath);

 if(isExist) {
//存在才继续走  
//生成文件例表
fs.readdir(fielPath,(err,files)=>{
    //如果是文件
    if(err){
        //读取文件   返回读取的文件
        fs.readFile(fielPath,(err,data)=>{
            response.end(data);
        });
    }
    //如果是文件夹
    else{
        // console.log(files);
        //直接判断是否存在首页
        if (files.indexOf("index.html") != -1) {
            //有首页 读取首页
        fs.readFile(path.join(fielPath,'index.html'),(err,data)=>{
            if(err){
                //错误
                // console.log(err);
            }else{
                //正确,响应
                response.end(data);
            }
        })
        }
        //如果没有首页
        else {
        //点哪个文件就跳转哪个
            let backData = "";
            for (let i=0;i<files.length;i++) {
                backData += `<h2><a href="${request.url == "/>"? "":request.url}/${files[i]}">${files[i]}</a></h2>`
            }
            //响应头格式
            response.writeHead(200,{
                'content-type':'text/html;charset=utf-8'
            });

            response.end(backData);
        }
    }
})
 }
 //如果不存在  返回404
 else {
     response.writeHead(404,{
         'content-type':'text/html;charset=utf-8'
     });
     response.end(`
     <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
     <html><head>
     <title>404 Not Found</title>
     </head><body>
     <h1>Not Found</h1>
     <p>The requested URL /index.hththt was not found on this server.</p>
     </body></html>
     `);
 }
}).listen(80,'127.0.0.1',()=>{
    console.log('开始监听 127.0.0.1:80');
})