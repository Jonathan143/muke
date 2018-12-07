layui.use(['laypage', 'layer'], function(){
    var laypage = layui.laypage
        ,layer = layui.layer;

    //总页数低于页码总数
    laypage.render({
        elem: 'demo0'
        ,count: 50 //数据总数
    });

    //总页数大于页码总数
    laypage.render({
        elem: 'demo1'
        ,count: 70 //数据总数
        ,jump: function(obj){
            // console.log(obj)
        }
    });

    //自定义样式
    laypage.render({
        elem: 'demo2'
        ,count: 100
        ,theme: '#1E9FFF'
    });
    laypage.render({
        elem: 'demo2-1'
        ,count: 100
        ,theme: '#FF5722'
    });
    laypage.render({
        elem: 'demo2-2'
        ,count: 100
        ,theme: '#FFB800'
    });

    //自定义首页、尾页、上一页、下一页文本
    laypage.render({
        elem: 'demo3'
        ,count: 100
        ,first: '首页'
        ,last: '尾页'
        ,prev: '<em>←</em>'
        ,next: '<em>→</em>'
    });

    //不显示首页尾页
    laypage.render({
        elem: 'demo4'
        ,count: 100
        ,first: false
        ,last: false
    });

    //开启HASH
    laypage.render({
        elem: 'demo5'
        ,count: 500
        ,curr: location.hash.replace('#!fenye=', '') //获取hash值为fenye的当前页
        ,hash: 'fenye' //自定义hash值
    });

    //只显示上一页、下一页
    laypage.render({
        elem: 'demo6'
        ,count: 50
        ,layout: ['prev', 'next']
        ,jump: function(obj, first){
            if(!first){
                layer.msg('第 '+ obj.curr +' 页');
            }
        }
    });

    //完整功能
    laypage.render({
        elem: 'demo7'
        ,count: 100
        ,layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip']
        ,jump: function(obj){
            // console.log(obj)
        }
    });

    //自定义排版
    laypage.render({
        elem: 'demo8'
        ,count: 1000
        ,layout: ['limit', 'prev', 'page', 'next']
    });
    laypage.render({
        elem: 'demo9'
        ,count: 1000
        ,layout: ['prev', 'next', 'page']
    });
    laypage.render({
        elem: 'demo10'
        ,count: 1000
        ,layout: ['page', 'count']
    });

    //自定义每页条数的选择项
    laypage.render({
        elem: 'demo11'
        ,count: 1000
        ,limit: 100
        ,limits: [100, 300, 500]
    });


    //将一段数组分页展示

    //测试数据

});