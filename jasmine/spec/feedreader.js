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


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have a non-empty URL', function(){
            allFeeds.forEach ( feed => { 
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /*
        * This test loops through each feed in allFeeds to ensure that
        * a name is defined, and is not empty
        */
        it('have a non-empty name', function(){
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            })
        })


    });


    //Test suite for the menu
    describe('The menu', function(){
        let menu;

        beforeEach(function(){
            menu = document.querySelector("body");
        });
         /**
          *  This test ensures that the menu is hidden by default
          */
         it('is hidden by default', function(){
             expect(menu.classList.contains("menu-hidden")).toBe(true);
         });

         /**
          * Test to ensure menu visibility changes when icon is clicked.
          */

         it('is visible when icon clicked, if previously not visible', function(){
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
    describe('Initial Entries', function(){

        /**
        * Tests to ensure there is at least a single entry
        * when the loadFeed function is called.
        */

        //call the loadFeed function and let it complete before running test
        //done is passed as a callback function here
        beforeEach(function(done){
            loadFeed(0, done);
           
        });

        it('should exist and contain at least 1 entry', function(){
            let entryLink = document.querySelector('.entry-link');
            
            expect(entryLink).toBeDefined();
            expect(entryLink.childElementCount).toBeGreaterThan(0);
           
        });

    });

    /* Test for the selecting a new feed*/
    describe('New Feed Selection', function(){
        const feed = document.querySelector('.feed');
        let firstFeed, secondFeed;

        /**
         * Tests that ensures a new feed is loaded, i.e. the content
         * actually changes once loadFeed function is called.
         */
        beforeEach(done => {
            //get first feed loaded, store URL feed is pulling from
            //tried to incorporate arrow functions here as practice.
            loadFeed(0, () => {
                firstFeed = feed.innerText;
                console.log(firstFeed);
                
                //get second feed loaded, store URL feed is pulling from
                //each arrow function is a callback function in the loadFeed function
                loadFeed(1, () => {
                    secondFeed = feed.innerText;
                    done();
                });
            });
    
        });

        //test to check that feeds are changing once selected
        it('loads a new feed and pulls from different feed URL', function() {
            expect(firstFeed).not.toEqual(secondFeed);
        });
    
    });

    
    
}());


