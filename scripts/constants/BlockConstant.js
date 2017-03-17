(function() {
    "use strict";

    var defaultHTMLTextBlock  =
                `
                    <h1 style="text-align:center;">
                        This is a basic template.
                    </h1>
                    <p style="text-align:center;">
                        Information can be <strong>styled</strong>
                        in many ways by click on this text box.
                    </p>
                    <p>
                        You can drag content blocks from the left to add sections to your template.
                        Don't worry about navigating away from the page or refreshing your session
                        is being saved automatically.
                    </p>
                `;
    var defaultImageText  = "Click here to add an image.";

    angular
        .module("templateGenerator")
        .constant("BLOCK_CONST", {
            defaultHTMLTextBlock: defaultHTMLTextBlock,
            defaultImageText: defaultImageText,
            types: [
                {
                    name: "Text",
                    type: "text",
                    text: defaultHTMLTextBlock
                }, {
                    name: "Image",
                    type: "image",
                    defaultText: defaultImageText
                }, {
                    name: "Divider",
                    type: "divider"
                }
            ]
        });
}());