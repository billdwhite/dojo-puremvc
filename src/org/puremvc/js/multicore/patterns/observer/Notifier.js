define(
    [
        "dojo/_base/declare",
        "org/puremvc/js/multicore/patterns/facade/Facade"
    ],
    function(declare, Facade) {
        var Notifier = declare("org.puremvc.js.multicore.patterns.observer.Notifier", null, {
            /**
             * @class org.puremvc.js.multicore.patterns.observer.Notifier
             *
             * A Base Notifier implementation.
             *
             * {@link org.puremvc.js.multicore.patterns.command.MacroCommand MacroCommand},
             * {@link org.puremvc.js.multicore.patterns.command.SimpleCommand SimpleCommand},
             * {@link org.puremvc.js.multicore.patterns.mediator.Mediator Mediator} and
             * {@link org.puremvc.js.multicore.patterns.proxy.Proxy Proxy}
             * all have a need to send Notifications
             *
             * The Notifier interface provides a common method called #sendNotification that
             * relieves implementation code of the necessity to actually construct
             * Notifications.
             *
             * The Notifier class, which all of the above mentioned classes
             * extend, provides an initialized reference to the
             * {@link org.puremvc.js.multicore.patterns.facade.Facade Facade}
             * Multiton, which is required for the convienience method
             * for sending Notifications but also eases implementation as these
             * classes have frequent
             * {@link org.puremvc.js.multicore.patterns.facade.Facade Facade} interactions
             * and usually require access to the facade anyway.
             *
             * NOTE: In the MultiCore version of the framework, there is one caveat to
             * notifiers, they cannot send notifications or reach the facade until they
             * have a valid multitonKey.
             *
             * The multitonKey is set:
             *   - on a Command when it is executed by the Controller
             *   - on a Mediator is registered with the View
             *   - on a Proxy is registered with the Model.
             *
             * @constructor
             */
            constructor: function() {
            },

            /**
             * Create and send a Notification.
             *
             * Keeps us from having to construct new Notification instances in our
             * implementation code.
             *
             * @param {string} notificationName
             *  A notification name
             * @param {Object} [body]
             *  The body of the notification
             * @param {string} [type]
             *  The notification type
             * @return {void}
             */
            sendNotification: function(notificationName, body, type) {
                var facade = this.getFacade();
                if (facade) {
                    facade.sendNotification(notificationName, body, type);
                }
            },            

            /**
             * Initialize this Notifier instance.
             *
             * This is how a Notifier gets its multitonKey.
             * Calls to #sendNotification or to access the
             * facade will fail until after this method
             * has been called.
             *
             * Mediators, Commands or Proxies may override
             * this method in order to send notifications
             * or access the Multiton Facade instance as
             * soon as possible. They CANNOT access the facade
             * in their constructors, since this method will not
             * yet have been called.
             *
             *
             * @param {string} key
             *  The Notifiers multiton key;
             * @return {void}
             */
            initializeNotifier: function(key) {
                this.multitonKey = key;
                //this.facade = this.getFacade(); // this line causes the MacroCommandTest to fail
            },

            /**
             * Retrieve the Multiton Facade instance
             *
             * @protected
             * @return {org.puremvc.js.multicore.patterns.facade.Facade}
             */
            getFacade: function() {
                if (this.multitonKey == null) {
                    throw new Error(Notifier.MULTITON_MSG);
                }
                return Facade.getInstance(this.multitonKey);
            },

            /**
             * @ignore
             * The Notifiers internal multiton key.
             *
             * @protected
             * @type string
             */
            multitonKey: null
        });

        /**
         * @ignore
         * The error message used if the Notifier is not initialized correctly and
         * attempts to retrieve its own multiton key
         *
         * @static
         * @protected
         * @const
         * @type string
         */
        Notifier.MULTITON_MSG = "multitonKey for this Notifier not yet initialized!";

        return Notifier;
    }
);