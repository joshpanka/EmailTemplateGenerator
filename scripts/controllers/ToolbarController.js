(function() {
    "use strict";

    angular
        .module( "templateGenerator")
        .controller("ToolbarController", ToolbarController);

    ToolbarController.$inject = ["$rootScope", "TextEditService", "BLOCK_CONST"];

    function ToolbarController($rootScope, TextEditService, BLOCK_CONST) {
        var vm = this;
        vm.selectedTextField = TextEditService.selectedTextField;
        vm.getTextEditState = TextEditService.getTextEditState;
        vm.BLOCK_TYPES = BLOCK_CONST.types;
        vm.saveTextEdit = saveTextEdit;
        vm.cancelTextEdit = cancelTextEdit;

        function saveTextEdit() {
            $rootScope.$broadcast('SAVE_DATA', {
                text: vm.selectedTextField.currentText,
                elementId: vm.selectedTextField.currentBlockSN
            });
            TextEditService.setTextEditState(false);
        }

        function cancelTextEdit() {
            $rootScope.$broadcast('CANCEL_DATA');
            TextEditService.setTextEditState(false);
        }

    }
}());