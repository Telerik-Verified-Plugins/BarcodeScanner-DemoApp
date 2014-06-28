(function (global) {
    var DemoViewModel,
        app = global.app = global.app || {};

    DemoViewModel = kendo.data.ObservableObject.extend({

        scan: function () {
            if (!this.checkSimulator()) {
                cordova.plugins.barcodeScanner.scan(

                    // success callback
                    function (result) {
                        // wrapping in a timeout so the dialog doesn't free the app
                        setTimeout(function() {
                            alert("We got a barcode\n" +
                                  "Result: " + result.text + "\n" +
                                  "Format: " + result.format + "\n" +
                                  "Cancelled: " + result.cancelled);                            
                        }, 0);
                    },

                    // error callback
                    function (error) {
                        alert("Scanning failed: " + error);
                    }
                );
            }
        },

        encode: function () {
            if (!this.checkSimulator()) {
                cordova.plugins.barcodeScanner.encode(

                    // type: TODO
                    cordova.plugins.barcodeScanner.Encode.TEXT_TYPE, // note, not: BarcodeScanner.Encode.TEXT_TYPE

                    // what: TODO
                    "http://www.telerik.com",

                    // success callback
                    function (result) {
                        // TODO show in-line (see mails with Rob about encoding issues.. and my demo (appbuilder playground?) project)
                        alert("Encoding succeeded: " + result);
                    },

                    // error callback
                    function (error) {
                        alert("Encoding failed: " + error);
                    }
                );
            }
        },

        checkSimulator: function() {
            if (cordova.plugins === undefined) {
                alert('Plugin not available. Are you running in the simulator?');
                return true;
            }
            return false;
        }

    });

    app.demoService = {
        viewModel: new DemoViewModel()
    };
})(window);

window.onerror = function(a,b,c) {
    alert(a);
    alert(b);
    alert(c);
}