define(
    [
        "dojo/_base/declare",
        "org/puremvc/js/multicore/core/adapter/MediatorAdapter",
        "org/puremvc/js/multicore/patterns/mediator/Mediator"
    ],
    function(declare, MediatorAdapter, Mediator) {
        var ViewTestMediator = declare("org.puremvc.js.multicore.core.ViewTestMediator", MediatorAdapter, {
            /**
             * @param {Object} view
             * @constructor
             * @extends {Mediator}
             */
            constructor: function(view) {
                Mediator.call(this, ViewTestMediator.NAME, view);
            },

            /** @override */
            listNotificationInterests: function() {
                return ["ABC", "DEF", "GHI"];
            }
        });

        ViewTestMediator.NAME = "ViewTestMediator";

        return ViewTestMediator;
    }
);