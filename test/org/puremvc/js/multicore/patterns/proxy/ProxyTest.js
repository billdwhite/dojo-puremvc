define(
    [
        "doh",
        "dojo/_base/declare",
        "org/puremvc/js/multicore/patterns/proxy/Proxy"
    ],
    function(doh, declare, Proxy) {
        return doh.register("org.puremvc.js.patterns.proxy.ProxyTest", [
            function testNameAccessor() {
                // Create a new Proxy and use accessors to set the proxy name
                var proxy = new Proxy('TestProxy');
                // test assertions
                doh.assertEqual('TestProxy', proxy.getProxyName(), "Expecting proxy.getProxyName() == 'TestProxy'");
            },

            function testDataAccessors() {
                // Create a new Proxy and use accessors to set the data
                var proxy = new Proxy('colors');
                proxy.setData(['red', 'green', 'blue']);
                var data = proxy.getData();

                // test assertions
                doh.assertEqual(3, data.length, "Expecting data.length == 3");
                doh.assertEqual('red', data[0], "Expecting data[0] == 'red'");
                doh.assertEqual('green', data[1], "Expecting data[1] == 'green'");
                doh.assertEqual('blue', data[2], "Expecting data[2] == 'blue'");
            }
        ]);
    }
);