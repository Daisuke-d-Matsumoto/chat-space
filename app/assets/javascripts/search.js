$(document).on('turbolinks:load', function() {

  var search_list = $("#user-search-result");

  var userId = [];

  $(document).ready(function() {
    userId.length = 0;
  })

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
                </div>`
    return html;
  }

  function changeUser(name, id) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='${ id }'>
                  <input name='group[user_ids][]' type='hidden' value='${ id }'>
                  <p class='chat-group-user__name'>${ name }</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    userId.push(id);
  return html;
  }
  function appendNoUser(user) {
    var html = `<div class="chat-group-user clearfix">${ user }</div>`
    search_list.append(html);
  }

  $("#user-search-field").on("keyup", function(e) {
    e.preventDefault();
    var input = $("#user-search-field").val();
    var group_id = $('#user-search-field').attr('data-id')

    $.ajax({
    type: 'GET',
    url: '/users',
    dataType: 'json',
    data: { keyword: input,
            group_id: group_id,
            id: userId }
    })
    .done(function(users) {
      search_list.empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          var html = appendUser(user);
          search_list.append(html);
        });
      }
      else {
        appendNoUser("一致するユーザーはいません");
      }
    })
  });
  $('#user-search-result').on('click', ".chat-group-user__btn--add", function() {
    //追加したhtml内でデータとして追加したidとnameを取得
    var id = $(this).attr('data-user-id');
    var name = $(this).attr('data-user-name');
    //追加ボタンが押されたユーザーのHTMLを削除
    $(this).parent().remove();
    //取得したユーザーの情報を引数に渡してHTMLを追加
    var html = changeUser(name,id);
    $('#chat-group-users').append(html);
  })
  $('#chat-group-users').on('click', ".chat-group-user__btn--remove", function() {
    $(this).parent().remove();
  })

});
