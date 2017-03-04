$(function () {
  'use strict'

  var result = $('#result')
  var exifNode = $('#exif')
  var thumbNode = $('#thumbnail')
  var actionsNode = $('#actions')
  var currentFile
  var coordinates
  var before = $('#before')


// #playStart押したら遷移する(#beforeを表示#topを非表示)
$("#playStart").click(function(){
     $("#top").animate(
       {opacity: "toggle"},
       { duration: 1000, easing: 'swing', }
     );
     $("#before").animate(
       { opacity: 'show',},
       { duration: 2500, easing: 'swing', }
     );
   });

  // 色の受取用の配列
  var colorPallete = [];

  function displayExifData (exif) {
    var thumbnail = exif.get('Thumbnail')
    var tags = exif.getAll()
    var table = exifNode.find('table').empty()
    var row = $('<tr></tr>')
    var cell = $('<td></td>')
    var prop
    if (thumbnail) {
      thumbNode.empty()
      loadImage(thumbnail, function (img) {
        thumbNode.append(img).show()
      }, {orientation: exif.get('Orientation')})
    }
    for (prop in tags) {
      if (tags.hasOwnProperty(prop)) {
        table.append(
          row.clone()
            .append(cell.clone().text(prop))
            .append(cell.clone().text(tags[prop]))
        )
      }
    }
    exifNode.show()
  }

  function updateResults (img, data) {
    var content
    if (!(img.src || img instanceof HTMLCanvasElement)) {
      content = $('<span>Loading image file failed</span>')
    } else {
      content = $('<a target="_blank">').append(img)
        .attr('download', currentFile.name)
        .attr('href', img.src || img.toDataURL())
    }
    result.children().replaceWith(content)
    if (img.getContext) {
      actionsNode.show()
      getColor(img);
    }
    if (data && data.exif) {
      displayExifData(data.exif)
    }





  }

  function displayImage (file, options) {
    currentFile = file
    if (!loadImage(
        file,
        updateResults,
        options
      )) {
      result.children().replaceWith(
        $('<span>' +
          'Your browser does not support the URL or FileReader API.' +
          '</span>')
      )
    }
  }

  // canvasから色を取得
  function getColor(img){
        var vibrant = new Vibrant(img);
        var swatches = vibrant.swatches();
        for (var swatch in swatches) {
            if (swatches.hasOwnProperty(swatch) && swatches[swatch]){

                colorPallete.push(swatches[swatch].getHex());

            }
        }
        console.log(colorPallete);

        createPallete(colorPallete)
  }

    // カラーパレットの生成
    function createPallete(aColors){

        var colorPalleteUl = $('#colorPallete ul');

        for (var i = 0; i < aColors.length; i++) {

            var bgColor = 'background-color:'+aColors[i];
            var newLi = $('<li>').attr('style',bgColor);

            colorPalleteUl.append(newLi);

        }
    }





  function dropChangeHandler (e) {
    e.preventDefault()
    e = e.originalEvent
    var target = e.dataTransfer || e.target
    var file = target && target.files && target.files[0]
    var options = {
      maxWidth: result.width(),
      canvas: true,
      pixelRatio: window.devicePixelRatio,
      downsamplingRatio: 0.5,
      orientation: true
    }
    if (!file) {
      return
    }
    exifNode.hide()
    thumbNode.hide()
    before.hide()
    displayImage(file, options)

  }

  // Hide URL/FileReader API requirement message in capable browsers:
  if (window.createObjectURL || window.URL || window.webkitURL ||
      window.FileReader) {
    result.children().hide()
  }

  $(document)
    .on('dragover', function (e) {
      e.preventDefault()
      e = e.originalEvent
      e.dataTransfer.dropEffect = 'copy'
    })
    .on('drop', dropChangeHandler)


  $('#file-input')
    .on('change', dropChangeHandler)


  $('#edit')
    .on('click', function (event) {
      event.preventDefault()
      var imgNode = result.find('img, canvas')
      var img = imgNode[0]
      var pixelRatio = window.devicePixelRatio || 1
      imgNode.Jcrop({
        setSelect: [
          40,
          40,
          (img.width / pixelRatio) - 40,
          (img.height / pixelRatio) - 40
        ],
        onSelect: function (coords) {
          coordinates = coords
        },
        onRelease: function () {
          coordinates = null
        }
      }).parent().on('click', function (event) {
        event.preventDefault()
      })
    })

  $('#crop')
    .on('click', function (event) {
      event.preventDefault()
      var img = result.find('img, canvas')[0]
      var pixelRatio = window.devicePixelRatio || 1
      if (img && coordinates) {
        updateResults(loadImage.scale(img, {
          left: coordinates.x * pixelRatio,
          top: coordinates.y * pixelRatio,
          sourceWidth: coordinates.w * pixelRatio,
          sourceHeight: coordinates.h * pixelRatio,
          minWidth: result.width(),
          maxWidth: result.width(),
          pixelRatio: pixelRatio,
          downsamplingRatio: 0.5
        }))
        coordinates = null
      }
    })
})
