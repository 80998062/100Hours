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
function highlightOption(select, option) {
    // We get the list of all option available for our custom select element

    var optionList = select.querySelectorAll('.option');

    // We remove the highlight from all options
    optionList.forEach(function (other) {
        other.classList.remove('highlight');
    });

    // We highlight the right option
    option.classList.add('highlight');
}

window.addEventListener("load", function () {
    var form = document.querySelector('form');

    form.classList.remove("no-widget");
    form.classList.add("widget");
});

// We handle the event binding when the document is loaded.
window.addEventListener('load', function () {
    var selectList = document.querySelectorAll('.select');

    selectList.forEach(function (select) {

        var optionList = select.querySelectorAll('.option'),
            selectedIndex = getIndex(select);
        //
        select.tabIndex = 0;

        // 确保原生组件将永远不会获得焦点，
        // 而且还可以确保当用户用户使用键盘和鼠标时，我们的自定义组件能够获得焦点。
        select.previousElementSibling.tabIndex = -1;

        // We make sure that the default selected value is correctly displayed
        updateValue(select, selectedIndex);

        optionList.forEach(function (option, index) {
            option.addEventListener('click', function () {
                updateValue(select, index);
            });
        });

        select.addEventListener('keyup', function (event) {
            var length = optionList.length,
                index = getIndex(select);

            // When the user hit the down arrow, we jump to the next option
            if (40 === event.keyCode && index < length - 1) {
                updateValue(select, --index);
            } else if (38 === event.keyCode && index > 0) {
                updateValue(select, ++index);
            }
        });

        select.addEventListener('click', function () {
            toggleOptList(select);
        });

        select.addEventListener('focus', function () {
            activateSelect(select, selectList);
        });

        // in case the widget lose focus
        select.addEventListener('blur', function () {
            deactivateSelect(select);
        });
    });
});

// This function updates the displayed value and synchronizes it with the native widget.
// It takes two parameters:
// select : the DOM node with the class `select` containing the value to update
// index  : the index of the value to be selected
function updateValue(select, index) {
    var nativeWidget = select.previousElementSibling;

    var value = select.querySelector('.value');

    var optionList = select.querySelectorAll('.option');

    nativeWidget.selectedIndex = index;

    value.innerHTML = optionList[index].innerHTML;

    highlightOption(select, optionList[index]);
}

// This function returns the current selected index in the native widget
// It takes one parameter:
// select : the DOM node with the class `select` related to the native widget
function getIndex(select) {
    var nativeWidget = select.previousElementSibling;
    return nativeWidget.selectedIndex;
}
//# sourceMappingURL=widget_select.js.map