define([], function(){

    var File = Backbone.Model.extend({
        idAttribute: 'name',
        collection: 'files'
    });

    return File;


});