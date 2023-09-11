$(document).ready(function() {
    const msgContainer = $('.msg-container');
    
    $('.chat-form').on('submit', event => {
        event.preventDefault();
        
        const message = $('.chat-box').val();
        $('.chat-box').val('');
        $('.msg-container').append(`<div class="user-logo"><i class="fa-solid fa-user"></i></div>`);
        $('.msg-container').append(`<div class="user-msg-box"><div class="user-msg">` + message + `</div></div>`);
        scrollToBottom();
        $.ajax({
            method: 'POST',
            url: '/send_msg',
            data: {
                message: message
            },
            success: function(response) {
                $('.msg-container').append(`<div class="bot-logo"><img src="https://freelogopng.com/images/all_img/1681038242chatgpt-logo-png.png"></i></div>`);
                $('.msg-container').append(`<div class="bot-msg-box"><div class="bot-msg">` + response + `</div></div>`);
                scrollToBottom(); // 在成功回應後呼叫自動滾動函數
            }
        });
    });
    
    function scrollToBottom() {
        msgContainer.scrollTop(msgContainer[0].scrollHeight); // 將滾動位置設置到底部
    }
});
