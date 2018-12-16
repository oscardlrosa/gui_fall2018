/*
Oscar De La Rosa
JS file for A7
Oscar_DeLaRosa@student.uml.edu


A lot of of thanks to Dr. Heines's sample for the main functionality: https://jesseheines.com/~heines/91.461/91.461-2012-13f/461-lecs/code/jmh-table-v7.html


*/

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

// function clearForm() {
//   $('#multTable').reset();
//
//   $('#destroy').click(function () {
//     $('#ghostTable div').hide();
//   });
// }
