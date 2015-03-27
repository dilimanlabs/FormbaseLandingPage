(function () {
    var FEATURES = [
        '<h2>Create Custom Forms</h2>'+
        '<ul>'+
            '<li>Use our platform to create forms easily!</li>'+
            '<li>Have an existing form? Let us convert it for you!</li>'+
        '</ul>',

        '<h2>Manage your forms easily. Be organized!</h2>'+
        '<ul>'+
            '<li>Assign forms to different devices, manage your process flows, limit access, manage distribution to mobile devices, and many more using our platform.</li>'+
        '</ul>',

        '<h2>Offline Capable</h2>'+
        '<ul>'+
            '<li>Forms downloaded in your devices will be useable even if you’re off the grid. </li>'+
        '</ul>',

        '<h2>User Roles</h2>'+
        '<ul>'+
            '<li>Create administrators, teams, and members through our platform to collaborate easily. Limit access to different users for accountability and control which devices are linked to certain forms.</li>'+
        '</ul>',

        '<h2>Signatures</h2>'+
        '<ul>'+
            '<li>Capture signatures right on your mobile devices</li>'+
        '</ul>',

        '<h2>Geo-Tagging and Mapping functionality</h2>'+
        '<ul>'+
            '<li>You can opt or require the device to add the location where the form was completed or uploaded,or link a form to a certain location.</li>'+
        '</ul>',

        '<h2>Add a Map</h2>'+
        '<ul>'+
        '<li>You could add a map or satellite image with the form to aid in geo-tagging of conducted surveys. (Contact us for a detailed explanation)</li>'+
        '</ul>',

        '<h2>Capture Images and Record audio</h2>'+
        '<ul>'+
            '<li>Link captured images to your forms</li>'+
        '</ul>',

        '<h2>Export Forms</h2>'+
        '<ul>'+
            '<li>You can export your results to different file-formats and help you create accurate and professional reports.</li>'+
        '</ul>',

        '<h2>Integration</h2>'+
        '<ul>'+
            '<li>Create advanced workflows or integrate it to your existing workflow eaily. We have a team prepared to do on-site system setup to seamlessly integrate Formbase to your organization</li>'+
        '</ul>'
    ];
    function changeText(index) {
        var textContainer = document.querySelector('.feature-texts .text');
        textContainer.innerHTML = FEATURES[index];
    }
    function addEvents(_icon, index) {
        _icon.addEventListener('mouseover', function () {
            changeText(index);
        });
        _icon.addEventListener('click', function () {
            changeText(index);
        });
    }
    var icons = document.querySelectorAll('.icon-controls .icons');
    for (var i = 0; i < icons.length; i++) {
        var icon = icons[i];
        addEvents(icon, i);
    }

    (function() {
        changeText(0);
    })();
})();