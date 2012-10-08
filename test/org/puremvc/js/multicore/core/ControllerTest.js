define(
    [
        "doh",
        "dojo/_base/declare",
        "org/puremvc/js/multicore/patterns/observer/Notification",
        "org/puremvc/js/multicore/core/View",
        "org/puremvc/js/multicore/core/Controller",
        "org/puremvc/js/multicore/core/ControllerTestCommand",
        "org/puremvc/js/multicore/core/ControllerTestCommand2",
        "org/puremvc/js/multicore/core/ControllerTestVO"
    ],
    function(doh, declare, Notification, View, Controller, ControllerTestCommand, ControllerTestCommand2, ControllerTestVO) {
        doh.register('org.puremvc.js.multicore.core.ControllerTest', [

            /**
            * Tests the Controller Multiton Factory Method
            */
            function testGetInstance() {
                var controller = Controller.getInstance("ControllerTestKey1");

                doh.assertTrue(controller != null, "Expecting instance not null");
                doh.assertTrue(controller instanceof Controller, "Expecting instance implements IController");
            },

            /**
             * Tests Command registration and execution.
             *
             * <P>
             * This test gets a Multiton Controller instance
             * and registers the ControllerTestCommand class
             * to handle 'ControllerTest' Notifications.<P>
             *
             * <P>
             * It then constructs such a Notification and tells the
             * Controller to execute the associated Command.
             * Success is determined by evaluating a property
             * on an object passed to the Command, which will
             * be modified when the Command executes.</P>
             */
            function testRegisterAndExecuteCommand() {
                var controller = Controller.getInstance("ControllerTestKey2");
                controller.registerCommand("ControllerTest", ControllerTestCommand);

                var vo = new ControllerTestVO(12);
                var note = new Notification("ControllerTest", vo);

                controller.executeCommand(note);

                doh.assertTrue(vo.result == 24, "Expected vo.result == 24");
            },

            /**
             * Tests Command registration and removal.
             *
             * <P>
             * Tests that once a Command is registered and verified
             * working, it can be removed from the Controller.</P>
             */
            function testRegisterAndRemoveCommand() {
                var controller = Controller.getInstance("ControllerTestKey3");
                controller.registerCommand("ControllerRemoveTest", ControllerTestCommand);

                var vo = new ControllerTestVO(12);
                var note = new Notification("ControllerRemoveTest", vo);

                controller.executeCommand(note);

                doh.assertTrue(vo.result == 24, "Expected vo.result == 24");

                vo.result= 0;

                controller.removeCommand("ControllerRemoveTest");

                controller.executeCommand(note);

                doh.assertTrue(vo.result == 0, "Expecting vo.result == 0");
            },

            /**
             * Tests has command method
             */
            function testHasCommand() {
                var controller = Controller.getInstance("ControllerTestKey4");
                controller.registerCommand("hasCommandTest", ControllerTestCommand);

                doh.assertTrue(controller.hasCommand("hasCommandTest") == true, "Expecting controller.hasCommand('hasCommandTest') == true");

                controller.removeCommand("hasCommandTest");

                doh.assertTrue(controller.hasCommand("hasCommandTest") == false, "Expecting controller.hasCommand('hasCommandTest') == false");
            },

            /**
             * Tests Removing and Reregistering a Command
             *
             * <P>
             * Tests that when a Command is re-registered that it isn't fired twice.
             * This involves, minimally, registration with the controller but
             * notification via the View, rather than direct execution of
             * the Controller's executeCommand method as is done above in
             * testRegisterAndRemove. The bug under test was fixed in AS3 Standard
             * Version 2.0.2. If you run the unit tests with 2.0.1 this
             * test will fail.</P>
             */
            function testReregisterAndExecuteCommand () {
                var controller = Controller.getInstance("ControllerTestKey5");
                controller.registerCommand("ControllerTest2", ControllerTestCommand2);

                controller.removeCommand("ControllerTest2");

                controller.registerCommand("ControllerTest2", ControllerTestCommand2);

                var vo = new ControllerTestVO(12);
                var note = new Notification("ControllerTest2", vo);
                var view = View.getInstance("ControllerTestKey5");

                doh.assertEqual(0, vo.result, "Expecting vo.result == 0");
                doh.assertEqual(12, vo.input, "Expecting vo.input == 12");

                view.notifyObservers(note);

                doh.assertEqual(24, vo.result, "Expecting vo.result == 24");

                view.notifyObservers(note);

                doh.assertEqual(48, vo.result, "Expecting vo.result == 48");
            }
        ]);
    }
);