define(
    [
        "dojo/_base/declare",
        "org/puremvc/js/multicore/utilities/pipes/plumbing/PipeFitting"
    ],
    function(declare, PipeFitting) {

        var PipeListener = declare(PipeFitting, {
            /**
             * Pipe Listener.
             * <P>
             * Allows a class that does not implement <code>PipeFitting</code> to
             * be the final recipient of the messages in a pipeline.</P>
             * @see Junction
             */
            context: null,
            listener: null,


            constructor: function(args) {
                if (args) {
                    declare.safeMixin(this, args);
                    this.context = args.context;
                    this.listener = args.listener;
                }
            },


            connect: function(/*PipeFitting*/output) {
                return false;
            },


            disconnect: function() {
                return null;
            },


            write: function(/*PipeMessage*/message) {
                this.listener.apply(this.context, [message]);
                return true;
            }
        });

        return PipeListener;
    }
);