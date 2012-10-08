define(
    [
        "doh",
        "dojo/_base/declare",
        "org/puremvc/js/multicore/patterns/observer/Notification"
    ],
    function(doh, declare, Notification) {
        return doh.register("org.puremvc.js.patterns.observer.NotificationTest", [
            function testNameAccessors() {
                // Create a new Notification and use accessors to set the note name
                var note = new Notification('TestNote');

                // test assertions
                doh.assertEqual('TestNote', note.getName(), "Expecting note.getName() == 'TestNote'");
            },

            function testBodyAccessors() {
                // Create a new Notification and use accessors to set the body
                var note = new Notification(null);
                note.setBody(5);

                // test assertions
                doh.assertEqual(5, note.getBody(), "Expecting note.getBody()as Number == 5");
            },

            function testConstructor() {
                // Create a new Notification using the Constructor to set the note name and body
                var note = new Notification('TestNote',5,'TestNoteType');

                // test assertions
                doh.assertEqual('TestNote', note.getName(), "Expecting note.getName() == 'TestNote'");
                doh.assertEqual(5, note.getBody(), "Expecting note.getBody()as Number == 5");
                doh.assertEqual('TestNoteType', note.getType(), "Expecting note.getType() == 'TestNoteType'");
            },

            function testToString() {
                // Create a new Notification and use accessors to set the note name
                var note = new Notification('TestNote',[1,3,5],'TestType');
                var ts = "Notification Name: TestNote\nBody:1,3,5\nType:TestType";

                // test assertions
                doh.assertEqual(ts, note.toString(), "Expecting note.testToString() == '"+ts+"'");
            }
        ]);
    }
);