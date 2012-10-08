define(
    [
        "doh",
        "dojo/_base/declare",
        "org/puremvc/js/multicore/patterns/facade/Facade",
        "org/puremvc/js/multicore/patterns/facade/FacadeTestCommand",
        "org/puremvc/js/multicore/patterns/facade/FacadeTestVO",
        "org/puremvc/js/multicore/patterns/observer/Notification",
        "org/puremvc/js/multicore/patterns/proxy/Proxy",
        "org/puremvc/js/multicore/patterns/mediator/Mediator"
    ],
    function(doh, declare, Facade, FacadeTestCommand, FacadeTestVO, Notification, Proxy, Mediator) {
        return doh.register("org.puremvc.js.multicore.patterns.facade.FacadeTest", [

            function testFacadeTestCommand() {
                var vo = new FacadeTestVO(32);
                var testCommand = new FacadeTestCommand();
                var note = new Notification('TestNote', vo);

                testCommand.execute(note);

                doh.assertTrue(testCommand.executed, "The command executed");
                doh.assertEqual(64, note.getBody().result, "The notification body result value was doubled");

                doh.assertTrue(note.getBody() instanceof FacadeTestVO, "The notification body was a FacadeTestVO");

                doh.assertEqual(64, vo.result, "The vo result was doubled");
            },

            function testGetInstance() {
                var facade = Facade.getInstance("FacadeTestKey1");

                doh.assertTrue(facade != null, "Expected instance not null");
                doh.assertTrue(facade instanceof Facade, "Expected instance instance of facade");
            },

            function testRegisterCommandAndSendNotification() {
                // Create the Facade, register the FacadeTestCommand to handle 'FacadeTest' notifications
                var facade = Facade.getInstance('FacadeTestKey2');
                facade.registerCommand('FacadeTestNote', FacadeTestCommand);

                // Send notification. The Command associated with the event
                // (FacadeTestCommand) will be invoked, and will multiply
                // the vo.input value by 2 and set the result on vo.result
                var vo = new FacadeTestVO(32);
                facade.sendNotification('FacadeTestNote', vo);

                // test assertions
                doh.assertEqual(64, vo.result, "Expecting vo.result == 64");
            },

            function testRegisterAndRetrieveProxy() {
                // register a proxy and retrieve it.
                var facade = Facade.getInstance('FacadeTestKey4');
                facade.registerProxy(new Proxy('colors', ['red', 'green', 'blue']));
                var proxy = facade.retrieveProxy('colors');

                // retrieve data from proxy
                var data = proxy.getData();

                // test assertions
                doh.assertTrue(data != null, "Expecting data not null");
                doh.assertTrue(data instanceof Array, "Expecting data is Array");
                doh.assertEqual(3, data.length, "Expecting data.length == 3");
                doh.assertEqual('red', data[0], "Expecting data[0] == 'red'");
                doh.assertEqual('green', data[1], "Expecting data[1] == 'green'");
                doh.assertEqual('blue', data[2], "Expecting data[2] == 'blue'");
            },

            function testRegisterAndRemoveProxy() {
                // register a proxy, remove it, then try to retrieve it
                var facade = Facade.getInstance('FacadeTestKey5');
                var proxy = new Proxy('sizes', ['7', '13', '21']);
                facade.registerProxy(proxy);

                // remove the proxy
                var removedProxy = facade.removeProxy('sizes');

                // assert that we removed the appropriate proxy
                doh.assertTrue(removedProxy.getProxyName() == 'sizes', "Expecting removedProxy.getProxyName() == 'sizes'");

                // make sure we can no longer retrieve the proxy from the model
                proxy = facade.retrieveProxy('sizes');

                // test assertions
                doh.assertTrue(proxy == null, "Expecting proxy is null");
            },

            function testRegisterRetrieveAndRemoveMediator() {
                // register a mediator, remove it, then try to retrieve it
                var facade = Facade.getInstance('FacadeTestKey6');
                facade.registerMediator(new Mediator(Mediator.NAME, new Object() ));

                // retrieve the mediator
                doh.assertTrue(facade.retrieveMediator(Mediator.NAME) != null, "Expecting mediator is not null");

                // remove the mediator
                var removedMediator = facade.removeMediator(Mediator.NAME);

                // assert that we have removed the appropriate mediator
                doh.assertTrue(removedMediator.getMediatorName() == Mediator.NAME, "Expecting removedMediator.getMediatorName() == Mediator.NAME");

                // assert that the mediator is no longer retrievable
                doh.assertTrue(facade.retrieveMediator(Mediator.NAME ) == null, "Expecting facade.retrieveMediator(Mediator.NAME ) == null )");
            },

            function testHasProxy() {
                // register a Proxy
                var facade = Facade.getInstance('FacadeTestKey7');
                facade.registerProxy(new Proxy('hasProxyTest', [1,2,3] ));

                // assert that the model.hasProxy method returns true for that proxy name
                doh.assertTrue(facade.hasProxy('hasProxyTest') == true, "Expecting facade.hasProxy('hasProxyTest') == true");
            },

            function testHasMediator() {
                // register a Mediator
                var facade = Facade.getInstance('FacadeTestKey8');
                facade.registerMediator(new Mediator('facadeHasMediatorTest', new Object() ));

                // assert that the facade.hasMediator method returns true for that mediator name
                doh.assertTrue(facade.hasMediator('facadeHasMediatorTest') == true, "Expecting facade.hasMediator('facadeHasMediatorTest') == true");

                facade.removeMediator('facadeHasMediatorTest');

                // assert that the facade.hasMediator method returns false for that mediator name
                doh.assertTrue(facade.hasMediator('facadeHasMediatorTest') == false, "Expecting facade.hasMediator('facadeHasMediatorTest') == false");
            },

            function testHasCommand() {
                // register the ControllerTestCommand to handle 'hasCommandTest' notes
                var facade = Facade.getInstance('FacadeTestKey10');
                facade.registerCommand('facadeHasCommandTest', FacadeTestCommand);

                // test that hasCommand returns true for hasCommandTest notifications
                doh.assertTrue(facade.hasCommand('facadeHasCommandTest') == true, "Expecting facade.hasCommand('facadeHasCommandTest') == true");

                // Remove the Command from the Controller
                facade.removeCommand('facadeHasCommandTest');

                // test that hasCommand returns false for hasCommandTest notifications
                doh.assertTrue(facade.hasCommand('facadeHasCommandTest') == false, "Expecting facade.hasCommand('facadeHasCommandTest') == false");
            },

            function testHasCoreAndRemoveCore() {
                // assert that the Facade.hasCore method returns false first
                doh.assertTrue(Facade.hasCore('FacadeTestKey11') == false, "Expecting facade.hasCore('FacadeTestKey11') == false");

                // register a Core
                var facade = Facade.getInstance('FacadeTestKey11');

                // assert that the Facade.hasCore method returns true now that a Core is registered
                doh.assertTrue(Facade.hasCore('FacadeTestKey11') == true, "Expecting facade.hasCore('FacadeTestKey11') == true");

                // remove the Core
                Facade.removeCore('FacadeTestKey11');

                // assert that the Facade.hasCore method returns false now that the core has been removed.
                doh.assertTrue(Facade.hasCore('FacadeTestKey11') == false, "Expecting facade.hasCore('FacadeTestKey11') == false");
            }
        ]);
    }
);