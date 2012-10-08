define(
    [
        "dojo/_base/declare",
        "org/puremvc/js/multicore/core/adapter/MediatorAdapter",
        "org/puremvc/js/multicore/core/ViewTestConstants",
        "org/puremvc/js/multicore/patterns/mediator/Mediator"
    ],
    function(declare, MediatorAdapter, ViewTestConstants, Mediator) {
        var ViewTestMediator3 = declare("org.puremvc.js.multicore.core.ViewTestMediator3", MediatorAdapter, {
            /**
             * @param {Object} view
             * @constructor
             * @extends {Mediator}
             */
            constructor: function(view) {
                Mediator.call(this, ViewTestMediator3.NAME, view);
            },

            listNotificationInterests: function() {
                // be sure that the mediator has some Observers created
                // in order to test removeMediator
                return [ViewTestConstants.NOTE3];
            },

            handleNotification: function(notification) {
                this.viewComponent.lastNotification = notification.getName();
            }
        });

        /**
         * @type {string}
         * @const
         */
        ViewTestMediator3.NAME = "ViewTestMediator3";

        return ViewTestMediator3;
    }
);