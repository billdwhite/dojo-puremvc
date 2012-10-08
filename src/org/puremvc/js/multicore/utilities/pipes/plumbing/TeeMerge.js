define(
    [
        "dojo/_base/declare",
        "org/puremvc/js/multicore/utilities/pipes/plumbing/Pipe"
    ],
    function(declare, Pipe) {

        var TeeMerge = declare(Pipe, {
            /**
             * Merging Pipe Tee.
             * <P>
             * Writes the messages from multiple input pipelines into
             * a single output pipe fitting.</P>
             */

            /**
             * Constructor.
             * <P>
             * Create the TeeMerge and the two optional constructor inputs.
             * This is the most common configuration, though you can connect
             * as many inputs as necessary by calling <code>connectInput</code>
             * repeatedly.</P>
             * <P>
             * Connect the single output fitting normally by calling the
             * <code>connect</code> method, as you would with any other PipeFitting.</P>
             */
            constructor: function(args) {
                if (args) {
                    declare.safeMixin(this, args);
                    if (args.input1) {
                        this.connectInput(args.input1);
                    }

                    if (args.input2) {
                        this.connectInput(args.input2);
                    }
                }
            },


            /**
             * Connect an input PipeFitting.
             * <P>
             * NOTE: You can connect as many inputs as you want
             * by calling this method repeatedly.</P>
             *
             * @param input the PipeFitting to connect for input.
             */
            connectInput: function(/*PipeFitting*/input) {
                return input.connect(this);
            }
        });

        return TeeMerge
    }
);