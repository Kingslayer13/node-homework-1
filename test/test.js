define(['jquery', 'chai', 'sinon','../js/model/fileList'], function($, chai, sinon, FileList){
    var expect = chai.expect;

    describe('Model fetch test', function() {
        var model,
            server;

        beforeEach(function() {
            server = sinon.fakeServer.create();
            return model = new FileList;
        });

        afterEach(function () {
            server.restore();
        });

        it('should return json string when model calls fetch()', function() {
            server.respondWith('GET', '/files', JSON.stringify( [{"name": "test.txt"},{"name":"file.txt"}] ));
            model.fetch();
            server.respond();

            expect(model.length).to.be.equal(2);
            expect(model.models[0].id).to.be.equal("test.txt");
        });

        it('server should return model name when model created', function() {
            var name = "new";

            server.respondWith('PUT', '/files/'+name, JSON.stringify( [{"name": name}] ) );
            model.create({"name": "new", "content": "someText"});
            server.respond();

            expect(server.requests[0].responseText).to.be.equal(JSON.stringify([{"name":"new"}]));
        });

        it("server should return model name when model deleted", function() {
            var name = "last";

            server.respondWith('PUT', '/files/'+name, JSON.stringify( [{"name": name}] ) );
            model.create({"name": name, "content": "someText"});
            server.respond();

            server.respondWith("DELETE", "/files/"+name, JSON.stringify( [{"name": name}] ) );
            model.models[0].destroy();
            server.respond();

            expect(server.requests[1].responseText).to.be.equal(JSON.stringify([{"name":"last"}]));
        });
    });
});

