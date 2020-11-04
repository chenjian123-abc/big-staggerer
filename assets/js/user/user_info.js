$(function () {
    var form = layui.form;
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })
    initUserInfo();
    // 用户的初始基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                console.log(res.data);
                // 调用 form.val() 快速表单赋值
                form.val('formUserInfo', res.data);
            }
        })
    }
    // 重置表单的数据
    $('#btnReset').on('click',function(e){
        // 阻止默认行为
        e.preventDefault();
        initUserInfo();
    })
    // 监听表单的提交事件
    $('.layui-form').on('submit',function(e){
        // 阻止默认行为
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                // 调用页上的方法
                window.parent.getUserInfo()
                
            }
        })
    })
})