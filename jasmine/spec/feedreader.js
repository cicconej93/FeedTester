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
    describe('RSS Feeds', () => {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        it('have a non-empty URL', () => {
            allFeeds.forEach((feed) => { 
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /*
        * This test loops through each feed in allFeeds to ensure that
        * a name is defined, and is not empty
        */
        it('have a non-empty name', () => {
            allFeeds.forEach((feed) => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });


    });


    //Test suite for the menu
    describe('The menu', () => {
        /**
        *  This test ensures that the menu is hidden by default
        */

        let menu;

        beforeEach(() => {
            menu = document.querySelector("body");
        });

        it('is hidden by default', () => {
            expect(menu.classList.contains("menu-hidden")).toBe(true);
        });

        /**
        * Test to ensure menu visibility changes when icon is clicked.
        */

        it('is visible when icon clicked, if previously not visible', () => {
           //select our menuIcon
           let menuIcon = document.querySelector(".menu-icon-link");

           //when the menu is currently not visible
           menuIcon.click();
           expect(menu.classList.contains("menu-hidden")).not.toBe(true);
           //when menu is currently visible
           menuIcon.click();
           expect(menu.classList.contains("menu-hidden")).toBe(true);
        });
    });

    /* Test suite for the Initial Entries */
    describe('Initial Entries', () => {
        /**
        * Tests to ensure there is at least a single entry
        * when the loadFeed function is called.
        */

        //call the loadFeed function and let it complete before running test
        //done is passed as a callback function here
        beforeEach((done) => {
            loadFeed(0, done);          
        });

        it('should exist and contain at least 1 entry', () => {
            let entry = document.querySelectorAll('.feed .entry');
           
            expect(entry).toBeDefined();
            expect(entry.length).toBeGreaterThan(0);
           
        });

    });

    /* Test for the selecting a new feed*/
    describe('New Feed Selection', () => {
        /**
         * Tests that ensures a new feed is loaded, i.e. the content
         * actually changes once loadFeed function is called.
         */

        const feed = document.querySelector('.feed');
        let firstFeed, secondFeed;

        beforeEach( (done) => {
            //get first feed loaded, store URL feed is pulling from
            //tried to incorporate arrow functions here as practice.
            loadFeed(0, () => {
                firstFeed = feed.innerText;
                
                //get second feed loaded, store URL feed is pulling from
                //each arrow function is a callback function in the loadFeed function
                loadFeed(1, () => {
                    secondFeed = feed.innerText;
                    done();
                });
            });
    
        });

        //test to check that feeds are changing once selected
        it('loads a new feed and pulls from different feed URL', () => {
            expect(firstFeed).not.toEqual(secondFeed);
        });
    
    });

    
    
}());


