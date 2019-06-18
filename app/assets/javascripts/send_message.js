$(function(){
    // 処理キャンセルのフラグを定義：0…処理可能　1…キャンセル
    var cancelFlag = 0;

    function dateToStr24HPad0DayOfWeek(date, format) {
        date = new Date(date);
        var weekday = ["Sun", "Mon", "Tur", "Wed", "Thu", "Fri", "Sat"];
        if (!format) {
            format = 'YYYY/MM/DD(WW) hh:mm:ss'
        }
        format = format.replace(/YYYY/g, date.getFullYear());
        format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
        format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
        format = format.replace(/WW/g, weekday[date.getDay()]);
        format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
        format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
        format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
        return format;
    }
 
  function buildHTML(message){
    var datetime = dateToStr24HPad0DayOfWeek(message.created_at, 'YYYY/MM/DD(WW) hh:mm:ss');
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="message__upper-info">
                    <p class="message__upper__talker">${message.name}</p>
                    <p class="message__upper-info__date">${datetime}</p>
                  </div>`;

    var message_start = `<p class="message__text">`;
    var image_code = `<img src="${message.url}">`;
    var message_end = `${message.message}</p></div>`;
    message.url == null? add_html = message_start + message_end: add_html = message_start + image_code + message_end;
    return html + add_html;
  }

  var buildMessageHTML = function(message) {

    var datetime = dateToStr24HPad0DayOfWeek(message.created_at, 'YYYY/MM/DD(WW) hh:mm:ss');

    var start_html = 
    `<div class="message" data-message-id=${message.id} >
       <div class="message__upper-info">
         <div class="message__upper__talker">${message.user_name}</div>
         <div class="message__upper-info__date">${datetime}</div> 
       </div>
     </div>`;

    if (message.message && message.image.url) {
        var add_html = 
          `<p class="message__text">${message.message}<img src="${message.image.url}"></p>`;
    } else if (message.message) {
      var add_html = 
          `<p class="message__text">${message.message}</p>`;
    } else if (message.image.url) {
      var add_html =
          `<img src="${message.image.url}" >`;
    };
    return start_html + add_html;
  };

  setInterval(function(){
    var last_message_id = $('.message:last').attr('data-message-id');
    var str = $(location).attr('pathname');
    var url = str.replace('/messages', '');
    url = url + '/api/messages';

    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      data: { id: last_message_id }
    })
    .done(function(messages) {
      var insertHTML = '';
      var speed = 1000;
      $.each(messages, function(index,message){
        insertHTML += buildMessageHTML(message);
      })
      $('.messages').append(insertHTML);
      $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight}, speed);
    })
    .fail(function() {
      alert('Error:通信に失敗しました。リロードして下さい');
    })
  },5000);

  $('.btn-top').click(function() {
    $('.messages').animate({scrollTop: 0}, 500, 'swing');
  });

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    //------------<Submit btn連打対策 start>----------------
    $('.submit-btn').prop('disabled',true);
    $(".submit-btn").css("background-color","#CCC");
    if( cancelFlag == 0 ){
      //処理可能
      cancelFlag = 1; 
      
      setTimeout(function(){
        cancelFlag = 0;
        $('.submit-btn').prop('disabled',false);
        $(".submit-btn").css("background-color","#38aef0");
      },1000);
    }
    //------------<Submit btn連打対策 end>----------------

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      var speed = 1000;
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight}, speed);
    })
    .fail(function(){
      alert('Error:通信に失敗しました。再度メッセージを入力下さい');
    });
    return false;
  });
});