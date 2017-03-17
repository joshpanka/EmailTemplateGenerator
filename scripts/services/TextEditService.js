(function() {
    "use strict";

    angular
        .module("templateGenerator")
        .factory("TextEditService", TextEditService);

    function TextEditService() {

        var isTextEditView = false;

        var currentText = "";
        var currentBlockSN = null;

        var services = {
            selectedTextField: {
                currentText: currentText,
                currentBlockSN: currentBlockSN
            },
            setTextEditState: setTextEditState,
            getTextEditState: getTextEditState,
        };

        return services;


        function setTextEditState(showHide){
            isTextEditView = showHide;
        }

        function getTextEditState(){
            return isTextEditView;
        }
    }
}());