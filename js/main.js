jQuery(function($){

    var liClone = $('#clone'),
        list = liClone.parent();

    liClone.detach();

    $.get('/files', function(files){
        for(var i = 0; i < files.length; i++){
            var li = liClone.clone();

            li.html(files[i]);
            li.appendTo(list);
        }
    });
});
