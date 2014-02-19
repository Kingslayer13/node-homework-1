/**
 * Created by Kingslayer on 19.02.14.
 */
require.config({
    baseUrl: '/node-homework-1/',
    paths:{
        jquery: 'js/lib/jquery/jquery',
        mocha: 'js/lib/mocha/mocha',
        chai: 'js/lib/chai/chai',
        sinon: 'js/lib/sinonjs/sinon',
        backbone: 'js/lib/backbone/backbone',
        underscore: 'js/lib/underscore/underscore'
    },
    shim:{
        jquery:{
            exports: 'jQuery'
        },
        mocha:{
            exports: 'mocha'
        },
        sinon: {
            exports: 'sinon'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        }
    }
});

tests = [
    'test'
];

tests = tests.map(function(test){
    return 'test/' + test;
});

require (['mocha'], function(mocha){
    mocha.setup('bdd');

    require (tests, function(){
        mocha.run()
    });
});

