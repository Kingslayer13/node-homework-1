require(['js/model/fileList', 'js/view/fileList'],function(FileList, FileListView){

    var list = new FileList();
    new FileListView({
        model: list
    });
    list.fetch();

});


