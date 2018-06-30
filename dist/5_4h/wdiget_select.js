'use strict';

NodeList.prototype.forEach = function (callback) {
    Array.prototype.forEach.call(this, callback);
};

// This function will be used each time we want to deactivate a custom widget
// It takes one parameter
// select : the DOM node with the `select` class to deactivate
function deactivateSelect(select) {
    if (!select.classList.contains('active')) return;

    var optList = select.querySelector('.optList');
    optList.classList.add('hidden');

    select.classList.remove('active');
}

// This function will be used each time the user wants to (de)activate the widget
// It takes two parameters:
// select : the DOM node with the `select` class to activate
// selectList : the list of all the DOM nodes with the `select` class
function activateSelect(select, selectList) {
    if (select.classList.contains('active')) return;

    selectList.forEach(deactivateSelect);

    select.classList.add('active');
}

function toggleOptList(select) {
    var optList = select.querySelector('.optList');
    optList.classList.toggle('hidden');
}

// This function will be used each time we need to highlight an option
// It takes two parameters:
// select : the DOM node with the `select` class containing the option to highlight
// option : the DOM node with the `option` class to highlight

function hightlightOption(select, option) {
    // We get the list of all option available for our custom select element

    var optionList = select.querySelectorAll('.option');
}
//# sourceMappingURL=wdiget_select.js.map