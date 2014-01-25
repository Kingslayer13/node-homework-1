define(['js/view/file'], function(FileView){

    var FileListView = Backbone.View.extend({
        initialize: function(){
            this.$el = $('#files-list');
            this.listenTo(this.model, "add", this.renderFile);
            this.listenTo(this.model, "remove", this.removeFile);
        },
        renderFile: function(file){
            var fileView = new FileView({
                model: file
            });

            this.$el.append(fileView.$el);

            file._viewForFileList = fileView;
        },
        removeFile: function(file){
            var li = file._viewForFileList.$el;
            li.slideUp(function(){
                li.remove();
            });
        }
    });

    return FileListView;

});