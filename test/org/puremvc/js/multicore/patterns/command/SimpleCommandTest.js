define(
    [
        "doh",
        "dojo/_base/declare",
        "org/puremvc/js/multicore/patterns/observer/Notification",
        "org/puremvc/js/multicore/patterns/command/SimpleCommandTestVO",
        "org/puremvc/js/multicore/patterns/command/SimpleCommandTestCommand"
    ],
    function(doh, declare, Notification, SimpleCommandTestVO, SimpleCommandTestCommand) {
        return doh.register("org.puremvc.js.multicore.patterns.command.SimpleCommandTest", [
            /**
             * Tests the <code>execute</code> method of a <code>SimpleCommand</code>.
             *
             * <P>
             * This test creates a new <code>Notification</code>, adding a
             * <code>SimpleCommandTestVO</code> as the body.
             * It then creates a <code>SimpleCommandTestCommand</code> and invokes
             * its <code>execute</code> method, passing in the note.</P>
             *
             * <P>
             * Success is determined by evaluating a property on the
             * object that was passed on the Notification body, which will
             * be modified by the SimpleCommand</P>.
             *
             */
            function testSimpleCommandExecute() {
                var vo = new SimpleCommandTestVO(5);
                var note = new Notification('SimpleCommandTestNote', vo);
                var command = new SimpleCommandTestCommand();

                command.execute(note);

                doh.assertEqual(10, vo.result, "Expected vo.result === 10");
            }
        ]);
    }
);