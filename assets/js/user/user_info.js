var layer=layui.layer
var form=layui.form
$(function(){
    form.verify({
        nickname:function(value){
            if(value.length>6){
                return "昵称长度必须在1-6个字符之间！"
            }
        }
    })

    initUserInfo()
    // 初始化用户基本信息
    function initUserInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status!=0){
                    return layer.msg('获取用户信息失败！')
                }
                // 为表单赋值
                form.val('formUserInfo',res.data)
            }
        })
    }

    // 实现表单重置效果
    $('#btnReset').on('click',function(e){
        // 阻止重置默认行为
        e.preventDefault();
        initUserInfo()
    })

    // 更新用户信息
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                // 调用父页面中方法，重新渲染用户头像和用户信息
                window.parent.getUserInfo()
            }
        })
    })
})

