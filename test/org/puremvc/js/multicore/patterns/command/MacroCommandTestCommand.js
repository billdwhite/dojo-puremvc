define(
    [
        "dojo/_base/declare",
        "org/puremvc/js/multicore/patterns/command/MacroCommand",
        "org/puremvc/js/multicore/patterns/command/MacroCommandTestSub1Command",
        "org/puremvc/js/multicore/patterns/command/MacroCommandTestSub2Command"
    ],
    function(declare, MacroCommand, MacroCommandTestSub1Command, MacroCommandTestSub2Command) {
        var MacroCommandTestCommand = declare("org.puremvc.js.multicore.patterns.command.MacroCommandTestCommand", MacroCommand, {

            /**
             * @constructor
             * @extends {MacroCommand}
             */
            constructor: function() {
                MacroCommand.call(this);
            },

            /** @override */
            initializeMacroCommand: function() {
                this.addSubCommand(MacroCommandTestSub1Command);
                this.addSubCommand(MacroCommandTestSub2Command);
            }
        });

        return MacroCommandTestCommand;
    }
);