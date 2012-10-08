define(
    [
        "dojo/_base/declare",
        "org/puremvc/js/multicore/patterns/observer/Notification"
    ],
    function(declare, Notification) {
        var ViewTestNote = declare("org.puremvc.js.multicore.core.ViewTestNote", Notification, {
            constructor: function(name, body) {
                Notification.call(this, ViewTestNote.NAME, body);
            }
        })

        ViewTestNote.NAME= "ViewTestNote";

        ViewTestNote.create= function (body){
            return new ViewTestNote(ViewTestNote.NAME, body);
        };

        return ViewTestNote;
    }
);