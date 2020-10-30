$(function () {
    // 点击注册事件
    $('#link_reg').on('click', function () {
        // 隐藏登录框
        $('.login-box').hide()
        // 显示注册框
        $('.reg-box').show()
    })
    // 点击登录事件
    $('#link_login').on('click', function () {
        //隐藏注册
        $('.login-box').show()
        // 显示登录
        $('.reg-box').hide()
    })
    // 自定义校验规则
    let form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })
    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        // 阻止默认行为
        e.preventDefault();
        //发起POST请求
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        };
        $.post('http://ajax.frontend.itheima.net/api/reguser', data, function (res) {
            if (res.status !== 0) {
                //注册失败
                return layer.msg(res.message)
            }
            layer.msg('注册成功！')
            // 主动触发点击事件
            $('#link_login').click()
        })
    })
    // 监听登录表单提交事件
    $('#form_login').submit(function (e) {
        // 阻止默认提交行为
        e.preventDefault()
        console.log("ok");
        $.ajax({
            url: 'http://ajax.frontend.itheima.net/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                // 将登录成功得到 token 字符串 保存在localStorage中
                localStorage.setItem('token', res.token)
                // 跳转到后台
                location.href = '/index.html'
            }
        })
    })
})

