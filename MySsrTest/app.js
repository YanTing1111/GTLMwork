const Vue = require('vue')
const server = require('express')()

const renderer = require('vue-server-renderer').createRenderer({
    // template: require('fs').readFileSync('./temp.html', 'utf-8')
  })


//供temp.html用来渲染
const context = {
 title: 'hello'
}



const mocktitle = '我爱吃的水果';
const mockdata = ['香蕉', '苹果', '橘子'];


server.get('*', (req, res) => {
    const app = new Vue({
        //data数据供下面的template模板渲染使用
        data: {
            url: req.url,
            data: mockdata,
            title: mocktitle
        },
        template: `<div>The visited URL is: {{ url }}
                    <h3>{{title}}</h3>
                    <p v-for='item in data'>{{item}}</p>
                </div>`
    });

    renderer.renderToString(app, context, (err, html) => {
        if (err) {
            res.status(500).end('Internal Server Error')
            return
        }
        res.writeHead(200,{
            "Content-Type":"text/html;charset=UTF-8" //不写会乱码
        })
        res.end(html)
    })
})



server.listen(8060)