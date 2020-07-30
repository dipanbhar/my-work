$(document).ready(function () {

    $('#menuItems > li> a').on('click', function (e) {
        $('#topheader .navbar-nav').find('li.active').removeClass('active');
        $(this).parent('li').addClass('active');
        var tpl =  $(this).data().tpl;
        loadResourse(tpl);
    });
    function loadResourse(tpl) {
        $.ajax({
            type: 'GET',
            url: 'tpl/' + tpl + '.tpl',
            success: function (data) {
                $("#contentView").html(data);

            }
        });
    };
    loadResourse('list');
});
