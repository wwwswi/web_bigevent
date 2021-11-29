$(function() {
    //调用 getUserInfo 获取用户基本信息
    getUserInfo()
        //点击按钮实现退出功能
    var layer = layui.layer

    $('#btuLongout').on('click', function() {
        // console.log('ok');
        //提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            //退出时 需要清空本地存储中的token
            localStorage.removeItem('token')
                //重新跳转到登录页面
            location.href = '/login.html'
            layer.close(index); //关闭confirm询问框
        });
    })
})


//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //headers就是请求头配置对象
        success: function(res) {
            //console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            //调用renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        },
        //不论失败或成功， 最终都会调用complete回调函数

    })
}
//渲染用户的头像
function renderAvatar(user) {
    //获取用户的名称
    var name = user.nickname || user.username
        //设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        //按需渲染用户的头像
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //渲染文字头像
        $('.layui-nav-img').hide()
            //获取用户名的第一个字符 并且转为大写
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}