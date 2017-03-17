(function() {
    "use strict";

    angular
        .module("templateGenerator")
        .factory("PreviewService", PreviewService);

    PreviewService.$inject = ["BLOCK_CONST"];

    function PreviewService(BLOCK_CONST) {
        var currSN = 0;

        var blockArray = [
                {
                    name: "Text",
                    type: "text",
                    text: BLOCK_CONST.defaultHTMLTextBlock
                },{
                    name: "Divider",
                    type: "divider"
                },{
                    name: "Image",
                    type: "image",
                    defaultText: BLOCK_CONST.defaultImageText
                },{
                    name: "Divider",
                    type: "divider"
                }
            ];

        var service = {
            blocks: blockArray,
            saveData: saveData,
            restoreData: restoreData,
            addBlock: addBlock,
            updateBlockText, updateBlockText,
            nextAvailBlockSN: nextAvailBlockSN
        }

        return service;

        function saveData(){
            window.localStorage['dataBlocks'] = angular.toJson(service.blocks);
        }

        function restoreData(){
            var tmpBlocks =  window.localStorage['dataBlocks'];
            if(tmpBlocks){
                service.blocks = angular.fromJson(tmpBlocks);
            }
        }

        function addBlock(newBlock){
            service.blocks.push(newBlock);
            service.saveData();
        }

        function updateBlocks(blocksArray){
            service.blocks = blocksArray;
        }

        function updateBlockText(selectedID, newText){
            for(var i = 0; i < service.blocks.length; i++){
                if(service.blocks[i].blockSN === selectedID){
                    service.blocks[i].text = newText;
                    break;
                }
            }
        }

        function nextAvailBlockSN(){
            var nextSN = currSN;
            currSN++;
            return nextSN;
        }
    }

}());