// 不能用ES6来写，要用CJS来写，因为这个文件不是给前端执行的，而是给webpack的
// webpack里面都是node.js用的都是CJS，common js，其是一种全段模块化的规范，例如node用的就是commonjs，浏览器是browserify
// 文件名不能变，建立代理


//这个中间件，在webpack里面有
//其实你在package.json里配置单独代理，用的也是这个中间件
const proxy = require('http-proxy-middleware')

module.exports = function(app){
    app.use(
        // 带有这种前缀，会发给target
        proxy('/api1',{ //遇见/api1前缀的请求，就会触发该代理配置
            target:'http://localhost:5001',//请求转发给谁
            //尽量写成true，加不加没有太大的影响
            //如果不把changeOrigin改为true，服务器是知道请求是从哪里过来的
	        //如果加上了true，就能欺骗服务器，就会觉得是自己发的
	        // console.log('请求来自于',request.get('Host'))
            changeOrigin: true,//控制服务器收到的请求头中Host字段中的值。


            //重写请求路径
            //人家服务器能给你响应的是/student，不是/api1/student
            //所以你必须把你的api前缀给它去掉
            pathRewrite:{'^/api1':''} 

        }),
        proxy('/api2',{
            target:'http://localhost:5002',
            //尽量写成true
            changeOrigin: true,
            
            pathRewrite:{'^/api2':''}

        })
    )
}