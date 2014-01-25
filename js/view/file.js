define([], function(){

    var fileTemplate = $('.template-file').detach();

    var FileView = Backbone.View.extend({
        initialize: function(){
            this.$el = fileTemplate.clone();
            this.$el.find('.name').html(this.model.get('name'));
        },
        events: {
            "click .remove": "remove"
        },
        remove: function(){
            this.model.destroy();

            return false;
        }
    });

    return FileView;

});