
$(function(){

    // グローバル変数
    var fileImg = $('#file-image');
    var canvasEl = $('#canvasEl')[0];

    // 画像の幅を500にする
    var imgWidth = 500;

    // 色の受取用の配列
    var colorPallete = [];

    // 画像の読み込み
    fileImg.on('change',function(evt){

        // 読み込み画像
        var file = evt.target.files;
        // console.log(file[0]);

        // ファイルリーダーの呼び出し
        var reader = new FileReader();
        // dataURL形式で画像を読み込む
        reader.readAsDataURL(file[0]);

        reader.onload = function(){
            readDrawImg(reader);
        };

    });

    function readDrawImg(img){

        // 読み込んだ画像
        var result = img.result;
        var imgEl = new Image();
        // imgElのソースにresultを入れる
        imgEl.src = result;

        // 画像の幅と高さをゲットする
        var w = imgEl.width;
        var h = imgEl.height;

        // console.log(w,h);

        var reH = resizeImg(w,h);
        console.log(reH);

        drawCanvas(imgEl,w,h);
    }

    // 画像をリサイズする関数
    function resizeImg(w,h){

        var ratio = w / imgWidth;
        var newImgHeight = h / ratio;

        // reHにリサイズされた高さを返す
        return newImgHeight;
    }

    // canvasに生成する関数
    function drawCanvas(imgSrc,w,h){

        var context = canvasEl.getContext('2d');

        canvasEl.width = w;
        canvasEl.height = h;
        context.drawImage(imgSrc,0,0,w,h);

        // 色の抽出
        // 画像の色をとる
        var vibrant = new Vibrant(imgSrc);
        var swatches = vibrant.swatches()
        for (var swatch in swatches)
        if (swatches.hasOwnProperty(swatch) && swatches[swatch])
        // console.log(swatches[swatch].getHex());
        colorPallete.push(swatches[swatch].getHex());
        console.log(colorPallete);
    }

});
