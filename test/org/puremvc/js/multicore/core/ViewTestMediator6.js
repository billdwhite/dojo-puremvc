define(
    [
        "dojo/_base/declare",
        "org/puremvc/js/multicore/core/adapter/MediatorAdapter",
        "org/puremvc/js/multicore/core/ViewTestConstants",
        "org/puremvc/js/multicore/patterns/mediator/Mediator"
    ],
    function(declare, MediatorAdapter, ViewTestConstants, Mediator) {
        var ViewTestMediator6 = declare("org.puremvc.js.multicore.core.ViewTestMediator6", MediatorAdapter, {
            /**
             * @param {Object} view
             * @constructor
             * @extends {Mediator}
             */
            constructor: function(name, view) {
                Mediator.call(this, name, view);
            },

            /** @override */
            listNotificationInterests: function() {
                return [ViewTestConstants.NOTE6];
            },

            /** @override */
            handleNotification: function(note) {
                this.getFacade().removeMediator(this.getMediatorName());
            },

            /** @override */
            onRemove: function(note) {
                this.viewComponent.counter++;
            }
        });
        /**
         * @type {string}
         * @const
         */
        ViewTestMediator6.NAME = "ViewTestMediator6";

        return ViewTestMediator6;
    }
);