define(['backbone'], function(Backbone){

    var File = Backbone.Model.extend({
        idAttribute: 'name',
        collection: 'files'
    });

    return File;


});