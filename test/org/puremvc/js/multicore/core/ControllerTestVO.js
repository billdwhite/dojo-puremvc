define(
    [
        "dojo/_base/declare"
    ],
    function(declare) {
        var ControllerTestVO = declare("org.puremvc.js.multicore.core.ControllerTestVO", null, {

            constructor: function(input) {

                if ('number' !== typeof input) {
                    throw new TypeError("Number expected");
                }

                this.input = input;
                this.result = 0;
            },

            /**
             * @type {number}
             */
            input: null,

            /**
             * @type {number}
             */
            result: null
        });

        return ControllerTestVO;
    }
);