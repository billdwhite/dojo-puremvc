define(
    [
        "doh",
        "dojo/_base/declare",
        "org/puremvc/js/multicore/patterns/observer/Notification",
        "org/puremvc/js/multicore/patterns/command/SimpleCommand",
        "org/puremvc/js/multicore/patterns/command/MacroCommand",
        "org/puremvc/js/multicore/patterns/command/MacroCommandTestCommand",
        "org/puremvc/js/multicore/patterns/command/MacroCommandTestSub1Command",
        "org/puremvc/js/multicore/patterns/command/MacroCommandTestSub2Command",
        "org/puremvc/js/multicore/patterns/command/MacroCommandTestVO"
    ],
    function(doh, declare, Notification, SimpleCommand, MacroCommand, MacroCommandTestCommand,
             MacroCommandTestSub1Command, MacroCommandTestSub2Command, MacroCommandTestVO) {
        return doh.register("org.puremvc.js.multicore.patterns.command.MacroCommandTest", [
            function testSubCommandInstances() {
                var ctor = MacroCommandTestSub1Command;
                var obj= new ctor;

                doh.assertTrue(obj instanceof MacroCommandTestSub1Command, "Expected obj to be an instance of MacroCommandTestSub1Command");
                doh.assertTrue(obj instanceof SimpleCommand, "Expected obj to be an instance of SimpleCommand");
            },

            /**
             * Tests operation of a <code>MacroCommand</code>.
             *
             * <P>
             * This test creates a new <code>Notification</code>, adding a
             * <code>MacroCommandTestVO</code> as the body.
             * It then creates a <code>MacroCommandTestCommand</code> and invokes
             * its <code>execute</code> method, passing in the
             * <code>Notification</code>.<P>
             *
             * <P>
             * The <code>MacroCommandTestCommand</code> has defined an
             * <code>initializeMacroCommand</code> method, which is
             * called automatically by its constructor. In this method
             * the <code>MacroCommandTestCommand</code> adds 2 SubCommands
             * to itself, <code>MacroCommandTestSub1Command</code> and
             * <code>MacroCommandTestSub2Command</code>.
             *
             * <P>
             * The <code>MacroCommandTestVO</code> has 2 result properties,
             * one is set by <code>MacroCommandTestSub1Command</code> by
             * multiplying the input property by 2, and the other is set
             * by <code>MacroCommandTestSub2Command</code> by multiplying
             * the input property by itself.
             *
             * <P>
             * Success is determined by evaluating the 2 result properties
             * on the <code>MacroCommandTestVO</code> that was passed to
             * the <code>MacroCommandTestCommand</code> on the Notification
             * body.</P>
             *
             */
            function testMacroCommandExecute() {
                // Create the VO
                var vo = new MacroCommandTestVO(5);

                // Create the Notification (note)
                var note = new Notification('MacroCommandTest', vo);

                // Create the SimpleCommand
                var command = new MacroCommandTestCommand();

                // Execute the SimpleCommand
                command.execute(note);

                // test assertions
                doh.assertEqual(10, vo.result1, "Expecting vo.result1 == 10");
                doh.assertEqual(25, vo.result2, "Expecting vo.result2 == 25");
            }
        ]);
    }
);