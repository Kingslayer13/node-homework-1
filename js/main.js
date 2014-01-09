jQuery(function($){

    prepareTemplates();

    $.get('/files', addFile);

    $('#files-list').on('click', '.remove', function(event){
        var link = event.currentTarget;

        $.get(link.href)
            .done(removeFile)
            .fail(showResponse)
        ;

        return false;
    });

    $('#add-file-form').submit(function(){
        send(this).done(addFile).fail(showResponse);

        return false;
    });

    //region ================== Utils =====================================

    function prepareTemplates() {
        templates.files = $('#clone').prop('id', '').detach();
    }

    function templates() {

    }

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
        var file;

        if (name instanceof Array) {
            var files = $([]);
            for (var i = 0, len = name.length; i < len; i++) {
                file = addFile(name[i]);
                files = files.add(file);
            }
            return files;
        }

        file = getFile(name);

        if (file.length > 0) return file;

        file = templates.file.clone();

        file.attr('data-name', name);
        file.find('.name').html(name);
        file.find('.remove').prop('href', function(){
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

    function send(form){
        return $.ajax({
            url: form.action,
            type: form.method,
            data: $(form).serialize()
        });
    }

    //endregion ===========================================================
});
