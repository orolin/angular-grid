
var module = angular.module("example", ["angularGrid"]);

module.controller("exampleCtrl", function($scope) {

    var columnDefs = [
        {displayName: "Person", field: 'name',
            cellStyle:  {'background-color': 'rgba(255, 255, 230, 0.5)'}},
        {displayName: "Monday", group: 'Weekly Editable Values',  field: "mon", newValueHandler: numberNewValueHandler, editable: true, cellValueChanged: cellValueChangedFunction},
        {displayName: "Tuesday", group: 'Weekly Editable Values', field: "tue", newValueHandler: numberNewValueHandler, editable: true, cellValueChanged: cellValueChangedFunction},
        {displayName: "Wednesday", group: 'Weekly Editable Values', field: "wed", newValueHandler: numberNewValueHandler, editable: true, cellValueChanged: cellValueChangedFunction},
        {displayName: "Thursday", group: 'Weekly Editable Values', field: "thur", newValueHandler: numberNewValueHandler, editable: true, cellValueChanged: cellValueChangedFunction},
        {displayName: "Friday", group: 'Weekly Editable Values', field: "fri", newValueHandler: numberNewValueHandler, editable: true, cellValueChanged: cellValueChangedFunction},
        {displayName: "Total", group: 'Volatile Summary',
            valueGetter: "data.mon + data.tue + data.wed + data.thur + data.fri",
            width: 150,
            volatile: true,
            cellStyle:  {'background-color': 'rgba(230, 255, 255, 0.5)'}
        },
        {displayName: "Average",  group: 'Volatile Summary',
            valueGetter: "(data.mon + data.tue + data.wed + data.thur + data.fri) / 5",
            width: 150,
            volatile: true,
            cellStyle:  {'background-color': 'rgba(230, 255, 255, 0.5)'}
        },
        {displayName: "Total", group: 'Hard Summary',
            valueGetter: "data.mon + data.tue + data.wed + data.thur + data.fri",
            width: 150,
            cellStyle:  {'background-color': 'rgba(255, 230, 255, 0.5)'}
        },
        {displayName: "Average",  group: 'Hard Summary',
            valueGetter: "(data.mon + data.tue + data.wed + data.thur + data.fri) / 5",
            width: 150,
            cellStyle:  {'background-color': 'rgba(255, 230, 255, 0.5)'}
        }
    ];

    var data = [
        {name: 'Saoirse Ronan', mon: 1, tue: 1, wed: 1, thur: 1, fri: 1},
        {name: 'Colin Farrell', mon: 5, tue: 5, wed: 5, thur: 5, fri: 5},
        {name: 'Cillian Murphy', mon: 1, tue: 2, wed: 3, thur: 4, fri: 5},
        {name: 'Pierce Brosnan', mon: 1, tue: 1, wed: 1, thur: 1, fri: 1},
        {name: 'Liam Neeson', mon: 5, tue: 5, wed: 5, thur: 5, fri: 5},
        {name: 'Gabriel Byrne', mon: 1, tue: 2, wed: 3, thur: 4, fri: 5},
        {name: 'Stephen Rea', mon: 1, tue: 1, wed: 1, thur: 1, fri: 1},
        {name: 'Michael Fassbender', mon: 5, tue: 5, wed: 5, thur: 5, fri: 5},
        {name: 'Richard Harris', mon: 1, tue: 2, wed: 3, thur: 4, fri: 5},
        {name: 'Brendan Gleeson', mon: 1, tue: 1, wed: 1, thur: 1, fri: 1},
        {name: 'Colm Meaney', mon: 5, tue: 5, wed: 5, thur: 5, fri: 5},
        {name: 'Niall Crosby', mon: 1, tue: 2, wed: 3, thur: 4, fri: 5}
    ];

    function numberNewValueHandler(params) {
        var valueAsNumber = parseInt(params.newValue);
        if (isNaN(valueAsNumber)) {
            window.alert("Invalid value " + params.newValue + ", must be a number");
        } else {
            params.data[params.colDef.field] = valueAsNumber;
        }
    }

    function cellValueChangedFunction() {
        // after a value changes, get the volatile cells to update
        $scope.gridOptions.api.softRefreshView();
    }

    $scope.gridOptions = {
        columnDefs: columnDefs,
        rowData: data,
        groupHeaders: true,
        rowSelection: 'single',
        ready: function(api) {
            api.sizeColumnsToFit();
        }
    };

    $scope.onHardRefresh = function() {
        $scope.gridOptions.api.refreshView();
    };

});
