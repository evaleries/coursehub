$(document).ready(function() {
    $('span.fa-eye-slash').on('click', function(e) {
        if ($(this).siblings().attr('type') == 'password') {
            $(this).siblings().attr('type', 'text')
        } else {
            $(this).siblings().attr('type', 'password')
        }
        $(this).toggleClass('fa-eye');
        $(this).toggleClass('fa-eye-slash');
    });
});