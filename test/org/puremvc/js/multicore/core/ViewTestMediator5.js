define(
    [
        "dojo/_base/declare",
        "org/puremvc/js/multicore/core/adapter/MediatorAdapter",
        "org/puremvc/js/multicore/core/ViewTestConstants",
        "org/puremvc/js/multicore/patterns/mediator/Mediator"
    ],
    function(declare, MediatorAdapter, ViewTestConstants, Mediator) {
        var ViewTestMediator5 = declare("org.puremvc.js.multicore.core.ViewTestMediator5", MediatorAdapter, {
            /**
             * @param {Object} view
             * @constructor
             * @extends {Mediator}
             */
            constructor: function(view) {
                Mediator.call(this, ViewTestMediator5.NAME, view);
            },

            /** @override */
            listNotificationInterests: function() {
                return [ViewTestConstants.NOTE5];
            },

            /** @override */
            handleNotification: function(note) {
                this.viewComponent.counter++;
            }
        });

        /**
         * @type {string}
         * @const
         */
        ViewTestMediator5.NAME = "ViewTestMediator5";

        return ViewTestMediator5;
    }
);