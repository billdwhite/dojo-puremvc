define(
    [
        "dojo/_base/declare"
    ],
    function(declare) {
        var Observer = declare("org.puremvc.js.multicore.patterns.observer.Observer", null, {
            /**
             * @class org.puremvc.js.multicore.patterns.observer.Observer
             *
             * A base Observer implementation.
             *
             * An Observer is an object that encapsulates information
             * about an interested object with a method that should
             * be called when a particular Notification is broadcast.
             *
             * In PureMVC, the Observer class assumes these responsibilities:
             *
             * - Encapsulate the notification (callback) method of the interested object.
             * - Encapsulate the notification context (this) of the interested object.
             * - Provide methods for setting the notification method and context.
             * - Provide a method for notifying the interested object.
             *
             * The notification method on the interested object should take
             * one parameter of type Notification.
             *
             * @param {Function} notifyMethod
             *  the notification method of the interested object
             * @param {Object} notifyContext
             *  the notification context of the interested object
             * @constructor
             */
            constructor: function(notifyMethod, notifyContext) {
                this.setNotifyMethod(notifyMethod);
                this.setNotifyContext(notifyContext);
            },

            /**
             * Set the Observers notification method.
             *
             * The notification method should take one parameter of type Notification
             * @param {Function} notifyMethod
             *  the notification (callback) method of the interested object.
             * @return {void}
             */
            setNotifyMethod: function(notifyMethod) {
                this.notify = notifyMethod;
            },

            /**
             * Set the Observers notification context.
             *
             * @param {Object} notifyContext
             *  the notification context (this) of the interested object.
             *
             * @return {void}
             */
            setNotifyContext: function(notifyContext) {
                this.context = notifyContext;
            },

            /**
             * Get the Function that this Observer will invoke when it is notified.
             *
             * @private
             * @return {Function}
             */
            getNotifyMethod: function() {
                return this.notify;
            },

            /**
             * Get the Object that will serve as the Observers callback execution context
             *
             * @private
             * @return {Object}
             */
            getNotifyContext: function() {
                return this.context;
            },

            /**
             * Notify the interested object.
             *
             * @param {org.puremvc.js.multicore.patterns.observer.Notification} notification
             *  The Notification to pass to the interested objects notification method
             * @return {void}
             */
            notifyObserver: function(notification) {
                this.getNotifyMethod().call(this.getNotifyContext(), notification);
            },

            /**
             * Compare an object to this Observers notification context.
             *
             * @param {Object} object
             *
             * @return {boolean}
             */
            compareNotifyContext: function(object) {
                return object === this.context;
            },

            /**
             * The Observers callback Function
             *
             * @private
             * @type {Function}
             */
            notify: undefined,

            /**
             * The Observers callback Object
             * @private
             * @type {Object}
             */
            context: null
        });

        return Observer;
    }
);