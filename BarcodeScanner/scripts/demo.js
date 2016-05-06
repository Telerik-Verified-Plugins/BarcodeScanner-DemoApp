(function (global) {
    var DemoViewModel,
        app = global.app = global.app || {};

    DemoViewModel = kendo.data.ObservableObject.extend({

        scanBack: function () {
            this.scan(false, false);
        },

        scanBackFlip: function () {
            this.scan(false, true);
        },

        scanFront: function () {
            this.scan(true, false);
        },

        scanFrontFlip: function () {
            this.scan(true, true);
        },

        scan: function (preferFrontCamera, showFlipCameraButton) {
            if (!this.checkSimulator()) {
                cordova.plugins.barcodeScanner.scan(

                    // success callback function
                    function (result) {
                        // wrapping in a timeout so the dialog doesn't free the app
                        setTimeout(function() {
                            alert("We got a barcode\n" +
                                  "Result: " + result.text + "\n" +
                                  "Format: " + result.format + "\n" +
                                  "Cancelled: " + result.cancelled);                            
                        }, 0);
                    },

                    // error callback function
                    function (error) {
                        alert("Scanning failed: " + error);
                    },
                    
                    // options objects
                    {
                        "preferFrontCamera" : preferFrontCamera, // default false
                        "showFlipCameraButton" : showFlipCameraButton // default false
                    }
                );
            }
        },

        encodeUrl: function () {
            if (!this.checkSimulator()) {
                cordova.plugins.barcodeScanner.encode(

                    // pick one of TEXT_TYPE / EMAIL_TYPE / PHONE_TYPE / SMS_TYPE
                    cordova.plugins.barcodeScanner.Encode.TEXT_TYPE,

                    // the thing to encode - for a link use TEXT_TYPE above
                    "http://www.telerik.com",

                    // success callback (will currently not be invoked)
                    function (result) {
                        alert("Encoding succeeded: " + JSON.stringify(result));
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
                alert('This plugin is not available in the simulator.');
                return true;
            } else if (window.cordova === undefined) {
                alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
                return true;
            } else {
                return false;
            }
        }

    });

    app.demoService = {
        viewModel: new DemoViewModel()
    };
})(window);