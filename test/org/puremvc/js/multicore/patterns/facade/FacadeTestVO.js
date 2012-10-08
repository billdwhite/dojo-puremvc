define(
    [
        "dojo/_base/declare"
    ],
    function(declare) {
        var FacadeTestVO = declare("org.puremvc.js.multicore.patterns.facade.FacadeTestVO", null, {

            /**
             * @param {number} input
             */
            constructor: function(input) {
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

        return FacadeTestVO;
    }
);