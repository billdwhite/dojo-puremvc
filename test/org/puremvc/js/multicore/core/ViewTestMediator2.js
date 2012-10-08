define(
    [
        "dojo/_base/declare",
        "org/puremvc/js/multicore/core/adapter/MediatorAdapter",
        "org/puremvc/js/multicore/core/ViewTestConstants",
        "org/puremvc/js/multicore/patterns/mediator/Mediator"
    ],
    function(declare, MediatorAdapter, ViewTestConstants, Mediator) {
        var ViewTestMediator2 = declare("org.puremvc.js.multicore.core.ViewTestMediator2", MediatorAdapter, {
            /**
             * @param {Object} view
             * @constructor
             * @extends {Mediator}
             */
            constructor: function(view) {
                Mediator.call(this, ViewTestMediator2.NAME, view);
            },

            /** @override */
            listNotificationInterests: function() {
                return [ViewTestConstants.NOTE1, ViewTestConstants.NOTE2];
            },

            /** @override */
            handleNotification: function(notification) {
                // console.log("ViewTestMediator2.handleNotification: " + notification);
                this.viewComponent.lastNotification = notification.getName();
            }
        });

        /**
         * @type {string}
         * @const
         */
        ViewTestMediator2.NAME = "ViewTestMediator2";

        return ViewTestMediator2;
    }
);