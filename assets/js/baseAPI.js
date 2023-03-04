$(function(){
    $.ajaxPrefilter(function(option){
        var baseAPI="http://www.liulongbin.top:3007"
        option.url=baseAPI+option.url
        console.log(option.url);
    })
})