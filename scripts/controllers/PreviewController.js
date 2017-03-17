(function() {
    "use strict";

    angular
        .module( "templateGenerator")
        .controller("PreviewController", PreviewController);

    PreviewController.$inject = ["$scope", "$sce", "TextEditService", "PreviewService"];

    function PreviewController($scope, $sce, TextEditService, PreviewService) {

        var vm = this;
        vm.blockList = [];
        vm.selectedIndex = -1;
        vm.selectedTextField = TextEditService.selectedTextField;
        vm.getTextEditState = TextEditService.getTextEditState;
        vm.blockInserted = blockInserted;
        vm.spliceAndSave = spliceAndSave;
        vm.openEditTextView = openEditTextView;
        vm.saveBlocks = saveBlocks;
        vm.trustAsHtml = trustAsHtml;

        activate();

        function activate(){
            PreviewService.restoreData();
            vm.blockList = PreviewService.blocks;
            setBlockSNs();
        }

        $scope.$on("SAVE_DATA", function(event, data){
            updateBlockText(data.elementId, data.text);
            saveBlocks();
            vm.selectedIndex = -1;
        });

        $scope.$on("CANCEL_DATA", function(){
            vm.selectedIndex = -1;
        });

        function openEditTextView(blockItem, blockIndex) {
            if(blockItem.type === "text" &&
                vm.selectedIndex !== blockItem.blockSN){

                var currentSN = blockItem.blockSN;
                vm.selectedIndex = currentSN;

                TextEditService.selectedTextField.currentText = blockItem.text;
                TextEditService.selectedTextField.currentBlockSN = currentSN;
                TextEditService.setTextEditState(true);
            }
        }

        function spliceAndSave(index){
            vm.blockList.splice(index, 1);
            saveBlocks();
        }

        function setBlockSNs(){
            vm.blockList.forEach( function(blockElement) {
                setBlockSN(blockElement);
            });
        }

        function setBlockSN(block){
            block.blockSN = PreviewService.nextAvailBlockSN();
        }

        function blockInserted(index, item, external, type){
            if(typeof item.blockSN === "undefined"){
                setBlockSN(item);
                saveBlocks();
            }
            return item;
        }

        function updateBlockText(selectedID, newText){
            PreviewService.updateBlockText(selectedID, newText);
        }

        function saveBlocks() {
            PreviewService.saveData();
        }

        function trustAsHtml(string) {
            return $sce.trustAsHtml(string);
        };
    }
}());