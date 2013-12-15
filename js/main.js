jQuery(function($){

    var liClone = $('#clone'),
        list = liClone.parent();

    liClone.detach();

    $.get('/files', function(files){
        for(var i = 0; i < files.length; i++){
            var li = liClone.clone();

            li.find('span').html(files[i]);

            li.appendTo(list);
        }
    });

    list.on('click', '.trash', function(event){
        $(event.target).closest('li').remove();

        // event.preventDefault();
        // event.stopPropagation();
        return false;
    });

    // TODO create form
});
