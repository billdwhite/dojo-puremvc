define(
    [
        "dojo/_base/declare",
        "org/puremvc/js/multicore/core/View",
        "org/puremvc/js/multicore/patterns/observer/Observer"
    ],
    function(declare, View, Observer) {
        var Controller = declare("org.puremvc.js.multicore.core.Controller", null, {
            /**
             * @class org.puremvc.js.multicore.core.Controller
             *
             * In PureMVC, the Controller class follows the 'Command and Controller'
             * strategy, and assumes these responsibilities:
             *
             * - Remembering which
             * {@link org.puremvc.js.multicore.patterns.command.SimpleCommand SimpleCommand}s
             * or
             * {@link org.puremvc.js.multicore.patterns.command.MacroCommand MacroCommand}s
             * are intended to handle which
             * {@link org.puremvc.js.multicore.patterns.observer.Notification Notification}s
             * - Registering itself as an
             * {@link org.puremvc.js.multicore.patterns.observer.Observer Observer} with
             * the {@link org.puremvc.js.multicore.core.View View} for each
             * {@link org.puremvc.js.multicore.patterns.observer.Notification Notification}
             * that it has an
             * {@link org.puremvc.js.multicore.patterns.command.SimpleCommand SimpleCommand}
             * or {@link org.puremvc.js.multicore.patterns.command.MacroCommand MacroCommand}
             * mapping for.
             * - Creating a new instance of the proper
             * {@link org.puremvc.js.multicore.patterns.command.SimpleCommand SimpleCommand}s
             * or
             * {@link org.puremvc.js.multicore.patterns.command.MacroCommand MacroCommand}s
             * to handle a given
             * {@link org.puremvc.js.multicore.patterns.observer.Notification Notification}
             * when notified by the
             * {@link org.puremvc.js.multicore.core.View View}.
             * - Calling the command's execute method, passing in the
             * {@link org.puremvc.js.multicore.patterns.observer.Notification Notification}.
             *
             * Your application must register
             * {@link org.puremvc.js.multicore.patterns.command.SimpleCommand SimpleCommand}s
             * or {@link org.puremvc.js.multicore.patterns.command.MacroCommand MacroCommand}s
             * with the Controller.
             *
             * The simplest way is to subclass
             * {@link org.puremvc.js.multicore.patterns.facade.Facade Facade},
             * and use its
             * {@link org.puremvc.js.multicore.patterns.facade.Facade#initializeController initializeController}
             * method to add your registrations.
             *
             * @constructor
             * This Controller implementation is a Multiton, so you should not call the
             * constructor directly, but instead call the static #getInstance factory method,
             * passing the unique key for this instance to it.
             * @param {string} key
             * @throws {Error}
             *  If instance for this Multiton key has already been constructed
             */
            constructor: function(key) {
                if (Controller.instanceMap[key] != null) {
                    throw new Error(Controller.MULTITON_MSG);
                }

                this.commandMap = [];
                this.multitonKey = key;
                Controller.instanceMap[ this.multitonKey ] = this;
                this.initializeController();
            },

            /**
             * If a SimpleCommand or MacroCommand has previously been registered to handle
             * the given Notification then it is executed.
             *
             * @param {org.puremvc.js.multicore.patterns.observer.Notification} note
             * @return {void}
             */
            executeCommand: function(notifier) {
                var commandClassRef = this.commandMap[notifier.getName()];
                if (commandClassRef == null) {
                    return;
                }

                var commandInstance = new commandClassRef();
                commandInstance.initializeNotifier(this.multitonKey);
                commandInstance.execute(notifier);
            },

            /**
             * Register a particular SimpleCommand or MacroCommand class as the handler for
             * a particular Notification.
             *
             * If an command already been registered to handle Notifications with this name,
             * it is no longer used, the new command is used instead.
             *
             * The Observer for the new command is only created if this the irst time a
             * command has been regisered for this Notification name.
             *
             * @param {string} notificationName
             *  the name of the Notification
             * @param {Function} commandClassRef
             *  a command constructor
             * @return {void}
             */
            registerCommand: function(notificationName, commandClassRef) {
                if (this.commandMap[notificationName] == null) {
                    this.view.registerObserver(notificationName, new Observer(this.executeCommand, this));
                }

                this.commandMap[notificationName] = commandClassRef;
            },

            /**
             * Check if a command is registered for a given Notification
             *
             * @param {string} notificationName
             * @return {boolean}
             *  whether a Command is currently registered for the given notificationName.
             */
            hasCommand: function(notificationName) {
                return this.commandMap[notificationName] != null;
            },

            /**
             * Remove a previously registered command to
             * {@link org.puremvc.js.multicore.patterns.observer.Notifcation Notification}
             * mapping.
             *
             * @param {string} notificationName
             *  the name of the Notification to remove the command mapping for
             * @return {void}
             */
            removeCommand: function(notificationName) {
                if (this.hasCommand(notificationName)) {
                    this.view.removeObserver(notificationName, this);
                    this.commandMap[notificationName] = null;
                }
            },

            /**
             * @protected
             *
             * Initialize the multiton Controller instance.
             *
             * Called automatically by the constructor.
             *
             * Note that if you are using a subclass of View
             * in your application, you should *also* subclass Controller
             * and override the initializeController method in the
             * following way.
             *
             *     MyController.prototype.initializeController= function ()
             *     {
             *         this.view= MyView.getInstance(this.multitonKey);
             *     };
             *
             * @return {void}
             */
            initializeController: function() {
                this.view = View.getInstance(this.multitonKey);
            },


            /**
             * @ignore
             *
             * Local reference to the Controller's View
             * @protected
             * @type {View}
             */
            view: null,

            /**
             * @ignore
             *
             * Note name to command constructor mappings
             * @protected
             * @type {Object}
             */
            commandMap: null,

            /**
             * @ignore
             *
             * The Controller's multiton key
             * @protected
             * @type {string}
             */
            multitonKey: null
        });

        /**
         * @static
         * Remove a Controller instance.
         *
         * @param {string} key
         *  multitonKey of Controller instance to remove
         * @return {void}
         */
        Controller.removeController = function(key) {
            delete this.instanceMap[key];
        };

        /**
         * The Controllers multiton factory method.
         *
         * @return {org.puremvc.js.multicore.core.Controller}
         *  the Multiton instance of Controller
         */
        Controller.getInstance = function(key) {
            if (null == this.instanceMap[key]) {
                this.instanceMap[key] = new this(key);
            }

            return this.instanceMap[key];
        };

        /**
         * @ignore
         *
         * Multiton key to Controller instance mappings
         * @static
         * @protected
         * @type {Object}
         */
        Controller.instanceMap = [];

        /**
         * @ignore
         *
         * Message constants
         * @static
         * @protected
         * @type {string}
         */
        Controller.MULTITON_MSG = "controller key for this Multiton key already constructed"

        return Controller;
    }
);