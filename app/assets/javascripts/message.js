$(document).on('turbolinks:load', function() {
  function buildHTML(message){
    if (message.image.url) {
      var image = `<img src="${message.image.url}" class="lower-message__image">`;
    } else {
      var image = ``
    }
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="date">
                    <p class="date__user-name">
                      ${ message.user_name }
                    </p>
                    <p class="date__date">
                      ${ message.time }
                    </p>
                    </div>
                    <p class="message__text">
                      ${ message.text }
                    </p>
                      ${ image }
                </div>`
  return html;
  }

  $("#new_message").on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $('#new_message').attr('action');
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
      $('.messages').append(html)
      $('.message-file, .message-text').val('');
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 1500,'swing');
    })
    .fail(function() {
      alert('error');
    })
    .always(function() {
      $('.send').prop('disabled', false)
    })
  })

  var interval = setInterval(function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      var last_id = $('.message:last').data('message-id');
      $.ajax({
        url: location.href,
        data: { id: last_id },
        dataType: 'json',
      })
      .done(function(json) {
        if (json.length != 0){
          json.forEach(function(message) {
            $('.messages').append(buildHTML(message));
          });
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight
          }, 'fast');
        }
      })
      .fail(function(json) {
        alert('失敗しました');
      });
    } else {
       clearInterval(interval);
    }},5000);
});
