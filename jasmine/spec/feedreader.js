/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have URLs defined which are not empty', function() {
             for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
             }
         });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have names defined which are not empty', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
         });
    });

    /* A new test suite named "The menu" */
    describe('The menu', function() {
        /* A test that ensures the menu element is
         * hidden by default.
         */
         it('is hidden by default', function() {
            expect($('body').attr('class')).toBeDefined();
            expect($('body').attr('class')).toContain('menu-hidden');
         });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('shows when the menu icon is clicked, then hides when the menu icon is clicked again', function() {
              $('.menu-icon-link').click();
              expect($('body').attr('class')).not.toContain('menu-hidden');
              $('.menu-icon-link').click();
              expect($('body').attr('class')).toContain('menu-hidden');
          });
    });

    /* A new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

         // wait two seconds before testing, to give the app ample time to load the initial entries
         beforeEach(function(done) {
            setTimeout(function() {
                done();
            }, 2000);
         });

         it('have at least one entry', function() {
            expect($('.feed').children('.entry-link').length).toBeTruthy();
         });
    });

    /* A new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* Contains a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

         // wait two seconds, giving the app ample time to load the initial feed HTML
         beforeEach(function(done) {
            setTimeout(function() {
                done();
            }, 2000);
         });

         it('actually changes the content', function() {
            var initialHTML = $('.feed').html();
            $('.menu-icon-link').click(); // click to open the menu
            expect($('body').attr('class')).not.toContain('menu-hidden'); // make sure the menu is now open
            $('.feed-list').children('li').last().children('a').click(); // click the last feed entry in the menu
            // wait two seconds, giving the app time to load the new feed
            setTimeout(function() {
                expect($('.feed').html()).not.toEqual(initialHTML); // compare the feed's HTML from before and after clicking a menu item
            }, 2000);
         });
    });
}());
