jQuery(function($){

    var fileTemplate = $('#clone'),
        filesList = fileTemplate.parent();

    fileTemplate.prop('id', '').detach();

    $.get('/files', addFile);

    filesList.on('click', '.remove', function(event){
        var link = event.currentTarget;

        $.get(link.href)
            .done(removeFile)
            .fail(showResponse)
        ;

        return false;
    });

    $('#add-file-form').submit(function(){
        $.ajax({
            url: this.action,
            type: this.method,
            data: $(this).serialize(),
            success: addFile,
            error: showResponse
        });

        return false;
    });

    //=====================================================================

    /**
     * @param name
     * @returns {jQuery}
     */
    function getFile(name){
        return filesList.find('[data-name="'+ name +'"]')
    }

    /**
     * @param name
     * @returns {jQuery}
     */
    function addFile(name){
        if (name instanceof Array) {
            for (var i = 0, len = name.length; i < len; i++) {
                addFile(name[i]);
            }
        }

        var file = getFile(name);

        if (file.length > 0) return file;

        file = fileTemplate.clone();

        file.attr('data-name', name);
        file.find('.name').html(name);
        file.find('.remove').prop(function(){
            return this.href.replace(':fileName', name);
        });

        return file.appendTo(filesList);
    }

    /**
     * @param name
     * @returns {jQuery}
     */
    function removeFile(name){
        return getFile(name).remove();
    }

    /**
     * @param {XMLHttpRequest} response
     */
    function showResponse(response){
        alert(response.responseText);
    }
});
