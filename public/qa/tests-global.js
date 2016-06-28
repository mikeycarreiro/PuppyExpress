suite('Global Tests', function() {
    test('page has a valid title', function() {
        assert(document.title && document.title.match(/\S/) &&
               document.title.toUpperCase() !== 'TODO');
    });
});

suite('"Home" Page Tests', function() {
    test('page should contain link to home page', function() {
        assert($('a[href="/"]').length);
    });
});

suite('"About" Page Tests', function() {
    test('page should contain link to about page', function() {
        assert($('a[href="/about/"]').length);
    });
});

suite('"Cats" Page Tests', function() {
    test('page should contain link to gross cat page', function() {
        assert($('a[href="/cats/"]').length);
    });
});