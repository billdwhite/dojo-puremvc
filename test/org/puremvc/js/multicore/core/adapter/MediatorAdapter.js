define(
    [
        "dojo/_base/declare",
        "org/puremvc/js/multicore/patterns/mediator/Mediator"
    ],
    function(declare, Mediator) {
        /**
         * @fileOverview
         * @author David Foley
         * @exports MediatorAdapter
         * @requires Mediator
         */

        /**
         * An adapter class used to facilitate subclassing of Mediator by various
         * test units. This class does not constitute any part of the PureMVC library.
         *
         * @constructor
         * @extends {Proxy}
         */
        var MediatorAdapter = declare("org.puremvc.js.multicore.core.adapter.MediatorAdapter", null, {});

        MediatorAdapter.prototype = Mediator.prototype;

        return MediatorAdapter;
    }
);