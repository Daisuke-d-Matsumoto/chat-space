$(function() {
  function buildHTML(message){
    if (message.image.url) {
      var image = `<img src="${message.image.url}" class="message__image">`;
    } else {
      var image = ``
    }
    var html = `<div class="message">
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
      $('.message-text').val('')
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 1500,'swing');
    })
    .fail(function() {
      alert('error');
    })
    .always(function() {
      $('.send').prop('disabled', false)
    })
  })
});
