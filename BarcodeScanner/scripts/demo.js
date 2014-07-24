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

                    // pick one of TEXT_TYPE / EMAIL_TYPE / PHONE_TYPE / SMS_TYPE
                    cordova.plugins.barcodeScanner.Encode.TEXT_TYPE,

                    // the thing to encode - for a link use TEXT_TYPE above
                    "http://www.telerik.com",

                    // success callback (will currently not be invoked)
                    function (result) {
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
            if (window.navigator.simulator === true) {
                alert('Plugins are not available in the simulator.');
                return true;
            }
            return false;
        }

    });

    app.demoService = {
        viewModel: new DemoViewModel()
    };
})(window);