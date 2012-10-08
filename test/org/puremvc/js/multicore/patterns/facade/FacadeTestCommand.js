define(
    [
        "dojo/_base/declare",
        "org/puremvc/js/multicore/patterns/command/SimpleCommand"
    ],
    function(declare, SimpleCommand) {
        var FacadeTestCommand = declare("org.puremvc.js.multicore.patterns.facade.FacadeTestCommand",SimpleCommand, {
            /**
             * @constructor
             * @extends {SimpleCommand}
             */
            constructor: function() {
                this.executed= false;
                //console.log("this.execute= " + this.execute);
            },

            /** @override */
            execute: function(note) {
                var vo = note.getBody();
                this.executed = true;
                // fabricate a result
                vo.result = (2 * vo.input);
            },

            executed: false
        });

        return FacadeTestCommand;
    }
);