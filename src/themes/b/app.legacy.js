define([
    './../../javascript/module.legacy.js',
    './styles.legacy.scss',
    './styles.legacy.rtl.scss',
], function(foo) {
    return function() {
        console.log('I AM LEGACY - THEME B');
        foo();
    }
});
