define(
    [
        "dojo/_base/declare",
        "org/puremvc/js/multicore/patterns/command/SimpleCommand"
    ],
    function(declare, SimpleCommand) {
        var ControllerTestCommand2 = declare("org.puremvc.js.multicore.core.ControllerTestCommand2", SimpleCommand, {
            /**
             * @constructor
             * @extends {SimpleCommand}
             */
            constructor: function() {
            },

            /** @override */
            execute: function(note) {
                var vo = note.getBody();
                console.log("vo.result was " + vo.result);
                vo.result = vo.result + (2 * vo.input);
                console.log("vo.result is now " + vo.result + " (a difference of " + vo.input + ")");
            }
        });

        return ControllerTestCommand2;
    }
);