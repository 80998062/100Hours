'use strict';

function sendData(data) {
    var request = new XMLHttpRequest();
    var urlEncodedDataPairs = [];

    // Turn into data object into an array of URL-encoded
    // key /value pairs
    var keys = Object.keys(data);
    for (var key in keys) {
        urlEncodedDataPairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }

    // Combine the pairs into a single string and replace all %-encoded spaces to
    // the '+' character; matches the behaviour of browser form submissions.
    var urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

    request.addEventListener('load', function () {
        alert('Yeah! Data sent and response loaded.');
    });

    request.addEventListener('error', function () {
        alert('Oops! Something goes wrong.');
    });

    request.open('POST', "https://www.baidu.com");

    request.setRequestHeader('Content-Type', 'application-form-urlencoded');

    request.send(urlEncodedData);
}

window.addEventListener('load', function () {
    var form = document.getElementById('myForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        sendFormData();
    });

    function sendFormData() {
        var request = new XMLHttpRequest();
        var data = new FormData(form);
        request.open('POST', '');
        request.send(data);
    }
});
//# sourceMappingURL=send_form.js.map