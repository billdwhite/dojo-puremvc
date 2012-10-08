define(
    [
        "dojo/_base/declare"
    ],
    function(declare) {
        var ViewTestConstants = declare("org.puremvc.js.multicore.core.ViewTestConstants", null, {});

        /**
         * An enumeration of constants in use by test cases.
         * Due to JsTestDriver, its not possible to make these constants
         * available to test code without defining the TestCase in longhand
         * prototype code
         */
        ViewTestConstants.NOTE1 = "Notification1";
        ViewTestConstants.NOTE2 = "Notification2";
        ViewTestConstants.NOTE3 = "Notification3";
        ViewTestConstants.NOTE4 = "Notification4";
        ViewTestConstants.NOTE5 = "Notification5";
        ViewTestConstants.NOTE6 = "Notification6";

        return ViewTestConstants;
    }
);
