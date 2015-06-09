SC.initialize({
    client_id: 'd7781a30735ad5766699745e3f34688a',
    redirect_uri: 'http://localhost:9393/me'
  });

$(document).ready(function() {
  $('#login').click(function(event){
      event.preventDefault();
      SC.connect(function() {
        SC.get('/me', function(me) {
          console.log(me);
          alert('Hello, ' + me.username);
        });
      });
    });

    var count =  0;
    var column_number = 0;

$('.search_buttons').submit(function(event) {
    event.preventDefault();
    if (count === 2){
      count = 1;
      column_number = 1;
    } else {
      count+=1;
      column_number+=1;
    };

    var parameters = {};
    parameters['limit'] = 3;
    parameters['q'] = $('.genre').val() + " " +  $('.track_type').val() + " " + $('.tags').val();


    var request = $.ajax({
      type: "GET",
      url: "https://api.soundcloud.com/tracks?client_id=d7781a30735ad5766699745e3f34688a",
      dataType: "json",
      data: parameters
     });

    request.done(function(tracks){
      var nodes = [];

    $(tracks).each(function(index, track){
      var ul = $('<ul#u0></ul>')
      var li = $('<li></li>')
      var link = $('<a class="track">Track</a><br>');
      link.attr('data-track-id', track.id);
      link.attr('href', track.permalink_url);
      ul.attr('id', index);
      var track_url = track.permalink_url;
      var colour = "445878";
      SC.oEmbed(track_url, {color: colour, auto_play: false, maxheight: 175}, function(widget){
        $(ul).html(widget.html);
      });
      nodes.push(ul);
    });

    $('.column' + column_number).html(nodes);
        $('.column' + column_number).css({'opacity': .8});


      });
    });






  });




