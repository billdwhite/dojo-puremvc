define(
    [
        "doh",
        "dojo/_base/declare",
        "org/puremvc/js/multicore/core/Model",
        "org/puremvc/js/multicore/patterns/proxy/Proxy",
        "org/puremvc/js/multicore/core/ModelTestProxy"
    ],
    function(doh, declare, Model, Proxy, ModelTestProxy) {
        return doh.register("org.puremvc.js.multicore.ModelTest", [

            /**
             * Test the Model multiton method
             * @return {void}
             */
            function testGetInstance() {
                var model = Model.getInstance("ModelTestKey1");
                var assertionError = null;
                doh.assertTrue(model != null);
            },

            /**
            * Tests the proxy registration and removal methods.
            *
            * <P>
            * Tests <code>registerProxy</code> and <code>retrieveProxy</code> in the same test.
            * These methods cannot currently be tested separately
            * in any meaningful way other than to show that the
            * methods do not throw exception when called. </P>
            */
            function testRegisterAndRetrieveProxy() {
                var model = Model.getInstance("ModelTestKey2");
                model.registerProxy(new Proxy("colors", ["red", "green", "blue"]))

                var proxy = model.retrieveProxy("colors");
                var data;

                // assertNotNull("Expecting the model to be retrieved", proxy);
                doh.assertFalse(null == proxy, "Expecting the model to be retrieved");

                data = proxy.getData();

                doh.assertTrue(data != null, "Expecting data not null");
                doh.assertTrue(data instanceof Array, "Expected data to be an Array");
                doh.assertTrue(data.length == 3, "Expected data length to be 3");
                doh.assertTrue('red' == data[0], "Expecting data[0] === 'red'");
                doh.assertTrue('green' == data[1], "Expecting data[1] === 'green'");
                doh.assertTrue('blue' == data[2], "Expecting data[2] === 'blue'");
            },

            /**
            * Test the Proxy removal method
            */
            function testRegisterAndRemoveProxy() {
                // register a proxy, remove it, then try to retrieve it
                var model = Model.getInstance('ModelTestKey3');
                var proxy = new Proxy('sizes', ['7', '13', '21']);
                model.registerProxy(proxy);

                // remove the proxy
                var removedProxy = model.removeProxy('sizes');

                // assert that we removed the appropriate proxy
                doh.assertTrue(removedProxy.getProxyName() == 'sizes', "Expecting removedProxy.getProxyName() == 'sizes'");

                // ensure that the proxy is no longer retrievable from the model
                proxy = model.retrieveProxy('sizes');

                // test assertions
                doh.assertTrue(proxy == null, "Expecting proxy is null");
            },

            /**
            * Tests the hasProxy method
            */
            function testHasProxy() {
                // register a proxy
                var model = Model.getInstance('ModelTestKey4');
                var proxy = new Proxy('aces', ['clubs', 'spades', 'hearts', 'diamonds']);
                model.registerProxy(proxy);

                // assert that the model.hasProxy method returns true
                // for that proxy name
                doh.assertTrue(model.hasProxy('aces') == true, "Expecting model.hasProxy('aces') == true");

                // remove the proxy
                model.removeProxy('aces');

                // assert that the model.hasProxy method returns false for that proxy name
                doh.assertTrue(model.hasProxy('aces') == false, "Expecting model.hasProxy('aces') == false");
            },

            function testOnRegisterAndOnRemove() {
                try {
                    // Get a Multiton View instance
                    var model = Model.getInstance('ModelTestKey4');

                    // Create and register the test mediator
                    var proxy = new ModelTestProxy();

                    model.registerProxy(proxy);

                    // assert that onRegsiter was called, and the proxy responded by setting its data accordingly
                    doh.assertTrue(proxy.getData() == ModelTestProxy.ON_REGISTER_CALLED, "Expecting proxy.getData() == ModelTestProxy.ON_REGISTER_CALLED");

                    // Remove the component
                    model.removeProxy(ModelTestProxy.NAME);

                    // assert that onRemove was called, and the proxy responded by setting its data accordingly
                    doh.assertTrue(proxy.getData() == ModelTestProxy.ON_REMOVE_CALLED, "Expecting proxy.getData() == ModelTestProxy.ON_REMOVE_CALLED");
                }
                catch (thrown) {
                    console.error(thrown);
                }
            }
        ]);
    }
);