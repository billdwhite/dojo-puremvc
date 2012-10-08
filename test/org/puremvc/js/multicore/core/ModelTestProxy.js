define(
    [
        "dojo/_base/declare",
        "org/puremvc/js/multicore/core/adapter/ProxyAdapter",
        "org/puremvc/js/multicore/patterns/proxy/Proxy"
    ],
    function(declare, ProxyAdapter, Proxy) {
        var ModelTestProxy = declare("org.puremvc.js.multicore.core.ModelTestProxy", ProxyAdapter, {

            /**
             * @constructor
             * @extends {ProxyAdapter}
             */
            constructor: function() {
                Proxy.call(this, ModelTestProxy.NAME, '');
            },

            /** @override */
            onRegister: function() {
                console.info('setting data', this, ModelTestProxy.ON_REGISTER_CALLED)
                this.setData(ModelTestProxy.ON_REGISTER_CALLED);
            },

            /** @override */
            onRemove: function() {
                this.setData(ModelTestProxy.ON_REMOVE_CALLED);
            }
        });

        /**
         * @type {string}
         * @const
         */
        ModelTestProxy.NAME = "ModelTestProxy";

        /**
         * @type {string}
         * @const
         */
        ModelTestProxy.ON_REGISTER_CALLED = "onRegister Called";

        /**
         * @type {string}
         * @const
         */
        ModelTestProxy.ON_REMOVE_CALLED = "onRemove Called";

        return ModelTestProxy;
    }
);