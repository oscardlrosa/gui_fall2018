/* A lot of of thanks to Dr. Heines's sample for the main functionality: https://jesseheines.com/~heines/91.461/91.461-2012-13f/461-lecs/code/jmh-table-v9.html

https://jqueryui.com/tabs/#manipulation for the tabs
*/
var tabIndex = 1;

function autoSubmit() {
  if ($('form#multTable').valid() == true) {
    $('form#multTable').submit();
  }
}

function saveTab() {
  var tabCount = $('#savedTabs li').length + 1;
  console.log('Tab count is: ' + tabCount);

  if (tabCount > 9) {
    alert('Can only hold 9 tables. Please, delete old ones');
    return false;
  }

  $('#savedTabs').tabs();

  var rSt = Number(document.getElementById('rowStart').value);
  var rEn = Number(document.getElementById('rowEnd').value);
  var cSt = Number(document.getElementById('colStart').value);
  var cEn = Number(document.getElementById('colEnd').value);

  tabIndex++;

  // Build title bar
  var title = "<li class='tab'><a href='#tab-" + tabIndex + "'>" + rSt +
              ' to ' + rEn + ' by ' + cSt + ' to ' + cEn + '</a>' +
              "<span class='ui-icon ui-icon-close' role='presentation'></span>" + '</li>';

  console.log('title: ', title);

  // Add title bar
  $('div#savedTabs ul').append(title);

  // Add current table
  $('div#savedTabs').append('<div id="tab-' + tabIndex + '">' +
    $('#ghostTable').html() + '</div>');

  // Refresh tabs, so new table shows up
  $('#savedTabs').tabs('refresh');

  // Make new tab active
  $('#savedTabs').tabs('option', 'active', -1);

  // Add remove button jQueryui.com/tabs/#manipulation
  $('#savedTabs').delegate('span.ui-icon-close', 'click', function () {
    var panelID = $(this).closest('li').remove().attr('aria-controls');
    $('#' + panelID).remove();

    // Refresh tabs
    try {
      $('#savedTabs').tabs('refresh');
    }
    catch (e) {
    }

    if ($('div#savedTabs ul li.tab').length == 0) {
      try {
        $('#savedTabs').tabs('destroy');
      }
      catch (e) {
      }

      return false;
    }
  });
}

function slider() {
  $('#rStSlider').slider({
    min: -10,
    max: 10,
    slide: function (event, ui) {
      $('#rowStart').val(ui.value);
      autoSubmit();
    },
  });
  $('#rowStart').on('keyup', function () {
    $('#rStSlider').slider('value', this.value);
    autoSubmit();
  });

  $('#rEnSlider').slider({
    min: -10,
    max: 10,
    slide: function (event, ui) {
      $('#rowEnd').val(ui.value);
      autoSubmit();
    },
  });
  $('#rowEnd').on('keyup', function () {
    $('#rEnSlider').slider('value', this.value);
    autoSubmit();
  });

  $('#cStSlider').slider({
    min: -10,
    max: 10,
    slide: function (event, ui) {
      $('#colStart').val(ui.value);
      autoSubmit();
    },
  });
  $('#colStart').on('keyup', function () {
    $('#cStSlider').slider('value', this.value);
    autoSubmit();
  });

  $('#cEnSlider').slider({
    min: -10,
    max: 10,
    slide: function (event, ui) {
      $('#colEnd').val(ui.value);
      autoSubmit();
    },
  });
  $('#colEnd').on('keyup', function () {
    $('#cEndSlider').slider('value', this.value);
    autoSubmit();
  });
}

function validate() {
  $('#multTable').validate({
    rules: {
      rowStart: {
        number: true,
        min: -10,
        max: 10,
        required: true,
      },
      rowEnd: {
        number: true,
        min: -10,
        max: 10,
        required: true,
      },
      colStart: {
        number: true,
        min: -10,
        max: 10,
        required: true,
      },
      colEnd: {
        number: true,
        min: -10,
        max: 10,
        required: true,
      },
    },
    messages: {
      rowStart: {
        number: 'ERROR Num',
        min: 'ERROR Min',
        max: 'ERROR Max',
        required: 'ERROR Req',
      },
      rowEnd: {
        number: 'ERROR Num',
        min: 'ERROR Min',
        max: 'ERROR Max',
        required: 'ERROR Req',
      },
      colStart: {
        number: 'ERROR Num',
        min: 'ERROR Min',
        max: 'ERROR Max',
        required: 'ERROR Req',
      },
      colEnd: {
        number: 'ERROR Num',
        min: 'ERROR Min',
        max: 'ERROR Max',
        required: 'ERROR Req',
      },
    },

    submitHandler: function () {
      makeTable();
      return false;
    },

    invalidHandler: function () {
      $('#warningMsg').empty();
      $('#ghostTable').empty();
    },

    errorElement: 'div',
    errorPlacement: function (error, element) {
      error.insertAfter(element);
    },

    onkeyup: function (element, event) {
      autoSubmit();
    },
  });
}

function makeTable() {
  var rStart = Number(document.getElementById('rowStart').value);
  var rEnd = Number(document.getElementById('rowEnd').value);
  var cStart = Number(document.getElementById('colStart').value);
  var cEnd = Number(document.getElementById('colEnd').value);

  $('#warningMsg').empty();

  var tempNum;
  if (rStart > rEnd) {
    $('#warningMsg').append('<p class="warningCl">Correcting order. Swapping numbers</p>');

    tempNum = rStart;
    rStart = rEnd;
    rEnd = tempNum;
  }

  if (cStart > cEnd) {
    $('#warningMsg').append('<p class="warningCl">Correcting order. Swapping numbers</p>');

    tempNum = cStart;
    cStart = cEnd;
    cEnd = tempNum;
  }

  var mat = {};

  var rows = Math.abs(rEnd - rStart);
  var cols = Math.abs(cEnd - cStart);

  var rIndex = rStart;
  var cIndex = cStart;

  for (var x = 0; x <= cols; x++) {
    var tempArr = [];

    for (var y = 0; y <= rows; y++) {
      var product = rIndex * cIndex;
      tempArr[y] = product;
      rIndex++;
    }

    mat['row' + x] = tempArr;

    rIndex = rStart;
    cIndex++;
  }

  var content = '';
  content += '<table>';
  content += '<tr><td></td>';

  for (var f = rStart; f <= rEnd; f++) {
    content += '<td>' + f + '</td>';
  }

  content += '</tr>';

  cIndex = cStart;

  for (var g = 0; g <= cols; g++) {
    content += '<tr><td>' + cIndex + '</td>';

    for (var h = 0; h <= rows; h++) {
      content += '<td>' + mat['row' + g][h] + '</td>';
    }

    cIndex++;

    content += '</tr>';
  }

  content += '</table>';

  $('#ghostTable').html(content);

  return false;
}

function clearForm() {
  $('#multTable').reset();

  // $('#destroy').click(function () {
  //   $('#ghostTable div').hide();
  // });
}
