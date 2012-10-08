define(
    [
        "doh",
        "dojo/_base/declare",
        "org/puremvc/js/multicore/patterns/observer/Notification",
        "org/puremvc/js/multicore/patterns/observer/Observer"
    ],
    function(doh, declare, Notification, Observer) {
        /**
         * @type {number}
         * @private
         */
        var observerTestVar = 0;

        /**
         * @param {Object} note
         * @return {void}
         * @private
         */
        var observerTestMethod = function(note) {
            this.observerTestVar = note.getBody();
        };

        return doh.register("org.puremvc.js.multicore.patterns.observer.ObserverTest", [
            /**
             * Tests observer class when initialized by accessor methods.
             */
            function testObserverAccessors() {
                // Create observer with null args, then use accessors to set notification method and context
                var observer = new Observer(null,null);
                observer.setNotifyContext(this);
                observer.setNotifyMethod(observerTestMethod);
                // create a test event, setting a payload value and notify
                // the observer with it. since the observer is this class
                // and the notification method is observerTestMethod,
                // successful notification will result in our local
                // observerTestVar being set to the value we pass in
                // on the note body.
                var note = new Notification('ObserverTestNote',10);
                observer.notifyObserver(note);
                // test assertions
                doh.assertEqual(10, this.observerTestVar, "Expecting observerTestVar = 10");
            },
                
            /**
             * Tests observer class when initialized by constructor.
             */
            function testObserverConstructor() {
                // Create observer passing in notification method and context
                var observer = new Observer(observerTestMethod,this);
                // create a test note, setting a body value and notify
                // the observer with it. since the observer is this class
                // and the notification method is observerTestMethod,
                // successful notification will result in our local
                // observerTestVar being set to the value we pass in
                // on the note body.
                var note = new Notification('ObserverTestNote',5);
                observer.notifyObserver(note);
                // test assertions
                doh.assertEqual(5, this.observerTestVar, "Expecting observerTestVar = 5");
            },
                
            /**
             * Tests the compareNotifyContext method of the Observer class
             */
            function testCompareNotifyContext() {
                // Create observer passing in notification method and context
                var observer = new Observer(observerTestMethod, this);
                var negTestObj = new Object();
                // test assertions
                doh.assertFalse(observer.compareNotifyContext(negTestObj), "Expecting observer.compareNotifyContext(negTestObj) == false");
                doh.assertTrue(observer.compareNotifyContext(this), "Expecting observer.compareNotifyContext(this) == true");
            }
        ]);
    }
);