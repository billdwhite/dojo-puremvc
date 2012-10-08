define(
    [
        "dojo/_base/declare",
        "org/puremvc/js/multicore/patterns/proxy/Proxy"
    ],
    function(declare, Proxy) {
        /**
         * @fileOverview
         * @author David Foley
         * @exports ProxyAdapter
         * @requires Proxy
         */

        /**
         * An adapter class used to facilitate subclassing of Proxy by various
         * test units. This class does not constitute any part of the PureMVC library.
         *
         * @constructor
         * @extends {Proxy}
         */
        var ProxyAdapter = declare("org.puremvc.js.multicore.core.adapter.ProxyAdapter", null, {});

        ProxyAdapter.prototype = Proxy.prototype;

        return ProxyAdapter;
    }
);