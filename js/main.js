jQuery(function($){

    var liClone = $('#clone'),
        list = liClone.parent();

    liClone.detach();

    $.get('/files', function(files){
        for(var i = 0; i < files.length; i++){
            var li = liClone.clone();

            li.find('span').html(files[i]);
            li.find('a').prop('href', '/files/delete/' + files[i]); // REST API

            li.appendTo(list);
        }
    });

    list.on('click', 'a', function(event){


        $.get(event.currentTarget.href, function(isSuccess){
            if (isSuccess){
                $(event.target).closest('li').remove();
            }
            else{
                alert('error');
            }
        });

        return false;
    });

    // TODO create form
});
