//设置轮播图容器高度
function setImgHeigt(){
    $(".img_contain").height($(".img_contain").width()*350/1000);
    var $scroll_img = $(".img_contain").children("img");
    $scroll_img.width($(".img_contain").width());
    $scroll_img.height($(".img_contain").height());
    var lineH = $(".img_contain").height();
    $('.moveBtn').css('line-height',lineH+"px");
}
$(function(){
    setImgHeigt();
});
$(window).resize(function(){
    setImgHeigt();
});



//设置轮播图
//current index
var $currentImg = 0;

function changeCI(pa) {
    var $imgWidth = getImgNum();
    $currentImg = ($currentImg + $imgWidth + pa)%$imgWidth;
    // alert($currentImg);
}

//get images number
function getImgNum(){
    var $imgN = $(".img_contain").children("img").length;
    return $imgN;
}

//get the currentElement
function getCurrentImg() {
    var $img = $('.img_contain').children('img').eq($currentImg);
    return $img;
}
//get the currentElement's before and behind
//go before
function getBeforeImg() {
    var $before = $currentImg==0?getImgNum()-1:$currentImg-1;
    var $img = $('.img_contain').children('img').eq($before);
    return $img;
}
function goToBeforeImg() {
    var $imgWidth = $(".img_contain").width();
    $cImg = getCurrentImg();
    $beforeImg = getBeforeImg();
    $behindImg = getBeindImg();
    changeCI(-1);
    $cImg.animate({left:"+="+$imgWidth+"px"},500);
    $beforeImg.animate({left:"+="+$imgWidth+"px"},500);
    // $behindImg.animate({left:"-="+2*$imgWidth+"px"},0);
    loadPicRound();
}

//go behind
function getBeindImg() {
    var $behind = $currentImg==(getImgNum()-1)?0:$currentImg+1;
    var $img = $('.img_contain').children('img').eq($behind);
    return $img;
}
function goToBackImg() {
    var $imgWidth = $(".img_contain").width();
    $cImg = getCurrentImg();
    $beforeImg = getBeforeImg();
    $behindImg = getBeindImg();
    changeCI(1);
    $cImg.animate({left:"-="+$imgWidth+"px"},500);
    // $beforeImg.animate({left:"+="+2*$imgWidth+"px"},0);
    $behindImg.animate({left:"-="+$imgWidth+"px"},500);
    loadPicRound();
}

//load left right pic
function loadPicRound(){
    var $imgWidth = $(".img_contain").width();
    $beforeImg = getBeforeImg();
    $behindImg = getBeindImg();
    $beforeImg.css({'display':'block','left':-$imgWidth});
    $behindImg.css({'display':'block','left':$imgWidth});
}
$(function () {
    loadPicRound();
});

//设置移动按钮是否能使用
function setMoveBtn(pa) {
    var $leftM = $('.leftM');
    var $rightM = $('.rightM');
    if (pa){
        $leftM.bind("click",goToBeforeImg());
        $rightM.bind("click",goToBackImg());
    }else{
        $leftM.unbind("click",goToBeforeImg());
        $rightM.unbind("click",goToBackImg());
    }
}

// 1.获取图片个数
// 2.在两边加载图片,共加载三个
// 3.移动,移动一个成功后自动刷新这三个img
//
//
// 1.移动成功切换
// 2.点击切换,大图移动


















