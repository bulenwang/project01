$(function(){
    // 去注册账号
    $('#link_reg').on('click',function(){
        $('.login_box').hide();
        $('.reg_box').show();
    })
    // 去登录
    $('#link_login').on('click',function(){
        $('.reg_box').hide();
        $('.login_box').show();
    })

    var form=layui.form
    var layer=layui.layer
    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
          repwd:function(value){
              let mm=$('.reg_box [name=password]').val()
              if(mm!==value){
                  return '密码不一致'
              }
          }
    })
    
    $('#form_reg').on('submit',function(e){
        e.preventDefault();
        var data={
            username:$('#form_reg [name=username]').val(),
            password:$('#form_reg [name=password]').val()
        }
        $.post('/api/reguser',data,function(res){
            if(res.status!=0){
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            $('#link_login').click()
        })
    })

    $('#form_login').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            url:"/api/login",
            method:"POST",
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                localStorage.setItem('token',res.token)
                location.href='/index.html'
            }
        })
    })
})