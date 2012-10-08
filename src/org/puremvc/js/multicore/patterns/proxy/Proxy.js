define(
    [
        "dojo/_base/declare",
        "org/puremvc/js/multicore/patterns/observer/Notifier"
    ],
    function(declare, Notifier) {
        var Proxy = declare("org.puremvc.js.multicore.patterns.proxy.Proxy", Notifier, {
            /**
             * @class org.puremvc.js.multicore.patterns.proxy.Proxy
             * @extends org.puremvc.js.multicore.patterns.observer.Notifier
             *
             * A base Proxy implementation.
             *
             * In PureMVC, Proxy classes are used to manage parts of the application's data
             * model.
             *
             * A Proxy might simply manage a reference to a local data object, in which case
             * interacting with it might involve setting and getting of its data in
             * synchronous fashion.
             *
             * Proxy classes are also used to encapsulate the application's interaction with
             * remote services to save or retrieve data, in which case, we adopt an
             * asyncronous idiom; setting data (or calling a method) on the Proxy and
             * listening for a
             * {@link org.puremvc.js.multicore.patterns.observer.Notification Notification}
             * to be sent  when the Proxy has retrieved the data from the service.
             *
             * @param {string} [proxyName]
             *  The Proxy's name. If none is provided, the Proxy will use its constructors
             *  NAME property.
             * @param {Object} [data]
             *  The Proxy's data object
             * @constructor
             */
            constructor: function(proxyName, data) {
                this.proxyName = proxyName || this.constructor.NAME;
                if (data != null) {
                    this.setData(data);
                }
            },

            /**
             * Get the Proxy's name.
             *
             * @return {string}
             */
            getProxyName: function() {
                return this.proxyName;
            },

            /**
             * Set the Proxy's data object
             *
             * @param {Object} data
             * @return {void}
             */
            setData: function(data) {
                this.data = data;
            },

            /**
             * Get the Proxy's data object
             *
             * @return {Object}
             */
            getData: function() {
                return this.data;
            },

            /**
             * Called by the {@link org.puremvc.js.multicore.core.Model Model} when
             * the Proxy is registered.
             *
             * @return {void}
             */
            onRegister: function() {
                return;
            },

            /**
             * Called by the {@link org.puremvc.js.multicore.core.Model Model} when
             * the Proxy is removed.
             *
             * @return {void}
             */
            onRemove: function() {
                return;
            },

            /**
             * @ignore
             * The Proxys name.
             *
             * @protected
             * @type String
             */
            proxyName: null,

            /**
             * @ignore
             * The Proxy's data object.
             *
             * @protected
             * @type Object
             */
            data: null
        });

        Proxy.NAME = "Proxy";

        return Proxy;
    }
);