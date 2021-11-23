$(function() {
    //点击“去注册账号”的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide() //隐藏
        $('.reg-box').show() //显示
    })

    //点击“去注册账号”的链接
    $('#link_login').on('click', function() {
        $('.login-box').show() //显示
        $('.reg-box').hide() //隐藏
    })

    //自定义效验规则   从layui中获取foem对象
    //导入layui的js文件 就可以访问到layui
    var form = layui.form
    var layer = layui.layer
        //通过form.verify()函数自定义效验规则 数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    form.verify({
        //自定义了一个pwd的效验规则
        'pwd': [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //效验两次密码是否一致的规则
        repwd: function(value) {
            //通过形参可以拿到确认密码框中的内容还需要密码框中的内容然后进行比较 判断失败则return一个提示消息
            //通过属性查找元素
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })

    //监听注册表单提交事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault() //阻止表单默认提交行为
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                //layer.msg 表示提示消息  使用之前必须先导入layer才可以使用layer.msg方法
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
                // 模拟人的点击行为
            $('#link_login').click()
        })
    })

    //监听登录表单的提交事件
    $('#form_login').on('submit', function(e) {
        e.preventDefault() //阻止表单默认提交行为
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                    // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })



})