(function () {
    "use strict";
    function buttonPressed(button) {
        button.addEventListener('mousedown', function () {
            button.classList.add('pressed');
        });
        button.addEventListener('mouseup', function () {
            button.classList.remove('pressed');
        });
    }

    function addButtonEvents () {
        var buttons = document.querySelectorAll('button[type=submit]');
        for (var i = 0; i < buttons.length; i++) {
            var btn = buttons[i];
            buttonPressed(btn);
        }
    }

    addButtonEvents();
})();