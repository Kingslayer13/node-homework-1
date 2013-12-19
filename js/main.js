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
        var link = event.currentTarget;
        /**
         * $.get() reutrns jqXHR
         * @link http://api.jquery.com/jQuery.ajax/#jqXHR
         */
        $.get(link.href)
            .done(function(){
                $(link).closest('li').remove();
            })
            .fail(function(result){
                alert('Error: ' + result.responseText);
            })
        ;

        return false;
    });

    // TODO create form
});
