$(function(){
    $.ajaxPrefilter(function(option){
        var baseAPI="http://www.liulongbin.top:3007"
        option.url=baseAPI+option.url
        if(option.url.indexOf('/my')!=-1){
            option.headers={
                Authorization:localStorage.getItem('token')||''
            }
        }

        // 全局挂载complete
        option.complete=function(res){
                 // 控制用户访问权限
            if(res.responseJSON.status==1&&res.responseJSON.message=='身份认证失败！'){
                localStorage.removeItem('token')
                location.href='/login.html'
            }
        }
    })
})