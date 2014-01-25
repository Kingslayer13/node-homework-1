define(['js/model/file'], function(File){

    var FileList = Backbone.Collection.extend({
        model: File,
        url: '/files'
    });

    return FileList;


});