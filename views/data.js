define([
    "models/records"
], function(records) {

    var ui = {
        view: "datatable",
        editable: true,
        resizeColumn:true, 
        resizeRow:true,
        //autoConfig: true,

        columns: [
            { id: "id", fillspace: 2, header: "Id", fillspace: 1, sort: "int" },
            { id: "title", fillspace: 2, editor:"text", header: ["Note title", { content: "selectFilter" }] },
            { id: "text", fillspace: 4, editor:"text", header: ["Note body", { content: "textFilter" }] }
        ]

        
    };



    return {
        $ui: ui,
        $oninit: function(view, $scope) {
            var popup = $scope.ui({
                view: "popup",
                position: "center",
                body: "Data is updated"
            });

            $scope.on(records.data, "onDataUpdate", function() {
                popup.show();
            });

            view.parse(records.data);
        }
    };

});