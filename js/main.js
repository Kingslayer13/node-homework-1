jQuery(function($){

    function getMeta(name){
        var arr = getMeta.names || (getMeta.names = {});

        if (arr[name]) return arr[name];
        //...
        arr[name] = asdsad;
        return arr[name];
    }

    prepareTemplates();

    send('/files').done(addFiles);

    '#files-list'.on('click', '.remove', function(event){
        var link = event.currentTarget;
        send(link).done(removeFile);

        return false;
    });

    '#add-file-form'.on('submit', function(){
        send(this).done(addFile);

        return false;
    });

    //region ================== Utils =====================================

    function prepareTemplates() {
        String.prototype.on = function() {
            var node = $(this.valueOf());
            return node.on.apply(node, arguments);
        };

        $('[class^="template-"], [class*=" template-"]').each(function () {
            var name = this.className.match(/\btemplate-(\w+)/)[1];
            templates[name] = $(this).detach();
        });
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

    function addFiles(names) {
        var files = $([]);
        for (var i = 0, len = names.length; i < len; i++) {
            file = addFile(names[i]);
            files = files.add(file);
        }
        return files;
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

    /**
     * @param {HTMLFormElement|HTMLAnchorElement|String} target
     * @returns {jqXHR}
     */
    function send(target){
        if (target instanceof HTMLAnchorElement) {
            target = target.href;
        }

        if (target instanceof String) {
            return $.get(target).fail(showResponse);
        }

        return $.ajax({
            url:  target.action,
            type: target.method,
            data: $(target).serialize()
        }).fail(showResponse);
    }

    //endregion ===========================================================
});
