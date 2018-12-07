layui.use(['rate'], function(){
    let rate = layui.rate;
    //基础效果
    rate.render({
        value:5,
        elem: '#test1'
    })
});