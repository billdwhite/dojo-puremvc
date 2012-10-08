define(
    [
        "dojo/_base/declare",
        "org/puremvc/js/multicore/core/adapter/MediatorAdapter",
        "org/puremvc/js/multicore/patterns/mediator/Mediator"
    ],
    function(declare, MediatorAdapter, Mediator) {
        var ViewTestMediator4 = declare("org.puremvc.js.multicore.core.ViewTestMediator4", MediatorAdapter, {
            /**
             * @param {Object} view
             * @constructor
             * @extends {Mediator}
             */
            constructor: function(view) {
                Mediator.call(this, ViewTestMediator4.NAME, view);
            },

            /** @override */
            onRegister: function() {
                this.viewComponent.onRegisterCalled = true;
            },

            /** @override */
            onRemove: function() {
                this.viewComponent.onRemoveCalled = true;
            }
        });

        /**
         * @type {string}
         * @const
         */
        ViewTestMediator4.NAME = "ViewTestMediator4";

        return ViewTestMediator4;
    }
);