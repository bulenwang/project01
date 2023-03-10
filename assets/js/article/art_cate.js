$(function(){

    var layer=layui.layer
    var form=layui.form
    initArtCateList()

    // 获取文章分类的列表
    function initArtCateList(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                var htmlStr=template('tpl-table',res)
                $('tbody').html(htmlStr)
            }
        })
    }

    var indexAdd=null
    // 为添加类别按钮绑定点击事件
    $('#btnAddCate').on('click',function(){
        indexAdd=layer.open({
            type:1,
            area:['500px','250px'],
            title:'添加文章分类',
            content:$('#dialog-add').html()
        })
    })

    // 因为表单是js动态生成，所以将form-add绑定在body上，添加submit事件
    $("body").on('submit','#form-add',function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res){
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                  }
                  initArtCateList()
                  layer.msg('新增分类成功！')
                  // 根据索引，关闭对应的弹出层
                  layer.close(indexAdd)
            }
        })
    })

    var indexEdit=null
    // 通过代理方式，为编辑按钮绑定点击事件
    $('tbody').on('click','.btn-edit',function(){
        indexEdit=layer.open({
            type:1,
            area:['500px','250px'],
            title:'添加文章分类',
            content:$('#dialog-edit').html()
        })
        var id=$(this).attr('data-id')
        $.ajax({
            method:"GET",
            url:"/my/article/cates/"+id,
            success:function(res){
                form.val('form-edit',res.data)
            }
        })
    })

    $('body').on('submit','#form-edit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!=0){
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })

    $('body').on('click','.btn-delete',function(){
        var id = $(this).attr('data-id')
        // 提示用户是否要删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index){
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                  if (res.status !== 0) {
                    return layer.msg('删除分类失败！')
                  }
                  layer.msg('删除分类成功！')
                  layer.close(index)
                  initArtCateList()
                }
              })
        })
    })
})