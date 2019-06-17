$(function(){

  var search_list = $("#user-search-result");

  function addMemberHTML(user_id, user_name){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${user_id}'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>${user_name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id="${user_id}" data-user-name="${user_name}" id='remove-chat-group-user-${user_id}'>削除</div>
                </div>`;
    $('.chat-group-users').append(html);
  }

  function addUsersHTML(user){
    var html = `<div class="chat-group-user clearfix" id='add-chat-group-user-${user.id}'>
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加
                </div>`;

    search_list.append(html);
  }

  $('body').on("click", "a", function(){
    var user_id = $(this).attr('data-user-id');
    var user_name = $(this).attr('data-user-name');
    addMemberHTML(user_id, user_name);
    $(this).parent().remove();
  });

  $('body').on("click", ".chat-group-user__btn--remove", function(){
    $(this).parent().remove();
  });

  $('#user-serch-field').on('keyup', function() {
    var input = $('#user-serch-field').val();
    if ( input == ""){
      $('#user-search-result').children().remove();
    }else{
      $.ajax({
        url: '/users',
        type: 'GET',
        data: { keyword: input },
        dataType: 'json'
      })
      .done(function(users){
        if( users.length != 0 ) {
          console.log(users.leght);
          users.forEach(function(user){
            addUsersHTML(user);
          });
        }
      })
      .fail(function(){
        alert('Error:通信に失敗しました。');
      })
    }
  })
});