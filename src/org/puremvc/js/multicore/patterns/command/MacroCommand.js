define(
    [
        "dojo/_base/declare",
        "org/puremvc/js/multicore/patterns/observer/Notifier"
    ],
    function(declare, Notifier) {
        var MacroCommand = declare("org.puremvc.js.multicore.patterns.command.MacroCommand", Notifier, {
            /**
             * @class org.puremvc.js.multicore.patterns.command.MacroCommand
             * @extends org.puremvc.js.multicore.patterns.observer.Notifier
             *
             * A base command implementation that executes other commands, such as
             * {@link org.puremvc.js.multicore.patterns.command.SimpleCommand SimpleCommand}
             * or {@link org.puremvc.js.multicore.patterns.command.MacroCommand MacroCommand}
             * subclasses.
             *
             * A MacroCommand maintains an list of command constructor references called *SubCommands*.
             *
             * When #execute is called, the MacroCommand
             * instantiates and calls #execute on each of its *SubCommands* in turn.
             * Each *SubCommand* will be passed a reference to the original
             * {@link org.puremvc.js.multicore.patterns.observer.Notification Notification}
             * that was passed to the MacroCommands #execute method
             *
             * Unlike {@link org.puremvc.js.multicore.patterns.command.SimpleCommand SimpleCommand},
             * your subclass should not override #execute but instead, should
             * override the #initializeMacroCommand method, calling #addSubCommand once for
             * each *SubCommand* to be executed.
             *
             * If your subclass does define a constructor, be sure to call "super" like so
             *
             *     function MyMacroCommand ()
             *     {
             *         MacroCommand.call(this);
             *     };
             * @constructor
             */
            constructor: function() {
                this.subCommands = [];
                this.initializeMacroCommand();
            },


            /**
             * @private
             * @type {Array.<SimpleCommand|MacroCommand>}
             */
            subCommands: null,

            /**
             * @protected
             * Initialize the MacroCommand.
             *
             * In your subclass, override this method to initialize the MacroCommand's *SubCommand*
             * list with command class references like this:
             *
             *     // Initialize MyMacroCommand
             *     MyMacroCommand.prototype.initializeMacroCommand= function ()
             *     {
             *         this.addSubCommand(com.me.myapp.controller.FirstCommand);
             *         this.addSubCommand(com.me.myapp.controller.SecondCommand);
             *         this.addSubCommand(com.me.myapp.controller.ThirdCommand);
             *     };
             *
             * Note that *SubCommand*s may be any command implementor, MacroCommands or SimpleCommands are both acceptable.
             * @return {void}
             */
            initializeMacroCommand: function() {
            },

            /**
             * @protected
             * Add a *SubCommand*
             *
             * The *SubCommand*s will be called in First In / First Out (FIFO) order
             * @param {Function} commandClassRef
             *  A reference to a subclassed SimpleCommand or MacroCommand constructor
             */
            addSubCommand: function(commandClassRef) {
                this.subCommands.push(commandClassRef);
            },

            /**
             * Execute this MacroCommands *SubCommands*
             *
             * The *SubCommand*s will be called in First In / First Out (FIFO) order
             * @param {org.puremvc.js.multicore.patterns.observer.Notification} note
             *  The Notification object to be passed to each *SubCommand*
             */
            execute: function(note) {
                while (this.subCommands.length > 0) {
                    var commandClassRef = this.subCommands.shift();
                    var commandInstance = new commandClassRef;
                    commandInstance.initializeNotifier(this.multitonKey);
                    commandInstance.execute(note);
                }
            }
        });

        return MacroCommand;
    }
);
