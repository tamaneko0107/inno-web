$(document).ready(function() {
    const msgContainer = $('.msg-container');
    
    $('.chat-form').on('submit', event => {
        event.preventDefault();
        
        const message = $('.chat-box').val();
        $('.chat-box').val('');
        $('.msg-container').append(`<div class="user-msg-box"><div class="user-msg"><span class='msg-span'>` + message + `</span></div></div>`);
        scrollToBottom();
        $.ajax({
            method: 'POST',
            url: '/send_msg',
            data: {
                message: message
            },
            success: function(response) {
                $('.msg-container').append(`<div class="bot-message"><div class="bot-logo"><img src="https://freelogopng.com/images/all_img/1681038242chatgpt-logo-png.png"></div><div class="bot-msg"><span class='msg-span'>`+ response +`</span></div></div>`);

                scrollToBottom();
            }
        });
    });
    
    function scrollToBottom() {
        msgContainer.scrollTop(msgContainer[0].scrollHeight);
    }
});
