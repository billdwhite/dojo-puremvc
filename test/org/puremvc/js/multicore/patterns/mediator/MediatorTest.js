define(
    [
        "doh",
        "dojo/_base/declare",
        "org/puremvc/js/multicore/patterns/mediator/Mediator",
        "org/puremvc/js/multicore/core/adapter/MediatorAdapter"
    ],
    function(doh, declare, Mediator, MediatorAdapter) {
        return doh.register("org.puremvc.js.patterns.mediator.MediatorTest", [
            function testNameAccessor() {
                var mediator = new Mediator();
                doh.assertEqual(Mediator.NAME, mediator.getMediatorName(), "Expected Mediator.NAME for mediator.getMediatorName()");
                M.NAME = "M";
                M.prototype = new MediatorAdapter();
                M.prototype.constructor = M;
                M.constructor = M;
                function M() {
                    Mediator.apply(this, arguments);
                }

                var m = new M;

                doh.assertEqual(M.NAME, m.getMediatorName(), "Expected M.NAME for new M().getMediatorName()");
            },

            function testViewAccessor() {
                var view = {};
                var mediator = new Mediator(Mediator.NAME, view);

                doh.assertEqual(view, mediator.getViewComponent(), "Retrieved view correctly");
            }
        ]);
    }
);