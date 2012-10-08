define(
    [
        "dojo/_base/declare"
    ],
    function(declare) {

        var PipeAware = declare(null, {
            /**
             * @class org.puremvc.js.multicore.utilities.pipes.plumbing.PipeAware
             * Pipe Aware base class.
             * <P>
             * Can be implemented by any PureMVC Core that wishes
             * to communicate with other Cores using the Pipes
             * utility.</P>
             */
            acceptInputPipe: function(/*String*/ name, /*PipeFitting*/ pipe) {
            },

            acceptOutputPipe: function(/*String*/ name, /*PipeFitting*/ pipe) {
            }
        });

        return PipeAware
    }
);