define(
    [
        "dojo/_base/declare",
        "org/puremvc/js/multicore/utilities/pipes/messages/Message"
    ],
    function(declare, Message) {

        var QueueControlMessage = declare(Message, {
            /**
             * Queue Control Message.
             * <P>
             * A special message for controlling the behavior of a Queue.</P>
             * <P>
             * When written to a pipeline containing a Queue, the type
             * of the message is interpreted and acted upon by the Queue.</P>
             * <P>
             * Unlike filters, multiple serially connected queues aren't
             * very useful and so they do not require a name. If multiple
             * queues are connected serially, the message will be acted
             * upon by the first queue only.</P>
             */

            constructor: function(args) {
                if (args) {
                    declare.safeMixin(this, args);
                    this.type = args.type;
                }
            }
        });

        QueueControlMessage.BASE = Message.BASE + '/queue/';
        // flush the queue
        QueueControlMessage.FLUSH = QueueControlMessage.BASE + 'flush';
        // toggle to sort-by-priority
        QueueControlMessage.SORT = QueueControlMessage.BASE + 'sort';
        // toggle to FIFO operation mode (default behavior)
        QueueControlMessage.FIFO = QueueControlMessage.BASE + 'fifo';

        return QueueControlMessage
    }
);