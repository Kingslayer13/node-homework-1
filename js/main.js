jQuery(function($){

    var liClone = $('#clone'),
        list = liClone.parent();

    liClone.detach();

    $.get('/files', function(files){
        for(var i = 0; i < files.length; i++){
            addFile(files[i]);
        }
    });

    list.on('click', 'a', function(event){
        var link = event.currentTarget;

        $.get(link.href)
            // $.get() returns jqXHR object
            // http://api.jquery.com/jQuery.ajax/#jqXHR
            .done(function(){
                $(link).closest('li').remove();
            })
            .fail(function(result){
                alert(result.responseText);
            })
        ;

        return false;
    });

    $('#add-file').submit(function(){
        $.ajax({
            url: this.action,
            type: this.method,
            data: $(this).serialize(),
            success: function(result){
                addFile(result);
            },
            error: function(result){
                alert(result.responseText);
            }
        });

        return false;
    });

    //=====================================================================

    function addFile(name){
        var li = liClone.clone();

        li.find('span').html(name);
        li.find('a').prop('href', '/files/delete/' + name); // REST API

        li.appendTo(list);
    }
});
