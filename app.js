var main = function() {
  var update = function() {
    var total = 0;
    var count = 0;
    $.getJSON("api.json", function(data) {
      for(user in data) {
        total += data[user];
        count++;
      }

      var average = total / count;

      for(user in data) {
        $('#' + user).text(data[user].toFixed(2));
        var diff = (data[user] - average).toFixed(2);
        if(diff >= 0) {
          diff = "+" + diff;
        }
        $('#' + user).siblings('small').children('.diff').text(diff);
      }

      $('#totale').text(total.toFixed(2));
    });
  };

  $('#add').click(function() {
    $('.show-display').hide();
    $('.add-display').show();
  });

  $('#back').click(function() {
    $('.add-display').hide();
    $('.show-display').show();
  });

  $('#save').click(function() {
    if($(this).hasClass('disabled')) {
      return 1;
    }
    var datas = {};
    $('.show-display .list-group-item h4').each(function(item) {
      var name = $(this).children('.name').text();
      var value = parseFloat($(this).children('.currency').text());

      datas[name] = value;
    });

    var user = $('.add-display select').val();
    var pwd = $('.add-display .password').val();
    var value = parseFloat($('.add-value').val());
    datas[user] += value;

    $.get("api.php?user=" + user + "&pwd=" + pwd + "&datas=" + JSON.stringify(datas), function(data) {
      $('.alert h2').text(data);
      if(data == "Saved.") {
        $('.alert').addClass('alert-success');
        $('.alert').removeClass('alert-danger');
      } else {
        $('.alert').addClass('alert-danger');
        $('.alert').removeClass('alert-success');
      }
      $('.shade').show();
      update();
    });

    $('.add-display').hide();
    $('.show-display').show();
  });

  $('.add-value').keyup(function() {
    var v = $(this).val();
    v = v.replace(/[^0-9,\.]/, '');
    if($.isNumeric(v)) {
      $('#save').removeClass("disabled");
    } else {
      $('#save').addClass("disabled");
    }
    $(this).val(v);
  });

  $('.alert').click(function() {
    $(this).parent('.shade').hide();
  });

  $('.add-display').hide();
  update();
}

$(document).ready(main)
