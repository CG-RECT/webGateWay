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
    loadPicRound();
});



/**** 设置轮播图 ****/
//current index
var $currentImg = 0;
var lockH = false;

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
function goToBeforeImg(parm,fast) {
    if (lockH) {return};
    lockH = true;
    var $imgWidth = $(".img_contain").width();
    $cImg = getCurrentImg();
    $beforeImg = getBeforeImg();
    $behindImg = getBeindImg();
    changeCI(-1);
    var $speed = 500;
    if (fast) {$speed = 200};
    $cImg.animate({left:"+="+$imgWidth+"px"},$speed);
    $beforeImg.animate({left:"+="+$imgWidth+"px"},{duration:$speed, easing:"linear", complete:function(){
        loadPicRound();
        if (parm&&--parm>0) {
            goToBeforeImg(--parm,true);
        };
    }});
}

//go behind
function getBeindImg() {
    var $behind = $currentImg==(getImgNum()-1)?0:$currentImg+1;
    var $img = $('.img_contain').children('img').eq($behind);
    return $img;
}
function goToBackImg(parm,fast) {
    if (lockH) {return};
    lockH = true;
    var $imgWidth = $(".img_contain").width();
    $cImg = getCurrentImg();
    $beforeImg = getBeforeImg();
    $behindImg = getBeindImg();
    changeCI(1);
    var $speed = 500;
    if (fast) {$speed = 200};
    $cImg.animate({left:"-="+$imgWidth+"px"},$speed);
    $behindImg.animate({left:"-="+$imgWidth+"px"},{duration:$speed, easing:"linear", complete:function(){
        loadPicRound();
        if (parm&&--parm>0) {
            goToBackImg(--parm,true);
        };
    }});
}

//load left right pic
function loadPicRound(){
    var $imgWidth = $(".img_contain").width();
    $beforeImg = getBeforeImg();
    $behindImg = getBeindImg();
    $beforeImg.css({'display':'block','left':-$imgWidth});
    $behindImg.css({'display':'block','left':$imgWidth});
    lockH = false;
    selectIndicator();
}
$(function () {
    loadPicRound();
    setIndicator();
    // t = setInterval('goToBackImg()',5000);
});

var $currentIndicator = 0;
//set the indicator
function setIndicator(){
    var $num = getImgNum();
    //10+30
    var $imgs_ul_width = $num*40-30;
    var $imgs_ul = $('.imgs_ul:first');
    $imgs_ul.width($imgs_ul_width).css('margin-left',-$imgs_ul_width/2+'px');
    for (var i = 0; i < $num; i++) {
        $imgs_ul.append("<li onclick='clickIndicator(this)'></li>");
    };
    $currentIndicator = $currentImg;
    $imgs_ul.children('li').eq($currentIndicator).css('background','orange');
}
function selectIndicator(){
    $('.imgs_ul:first').children('li').eq($currentIndicator).css('background','white');
    $currentIndicator = $currentImg;
    $('.imgs_ul:first').children('li').eq($currentIndicator).css('background','orange');

}
function clickIndicator($parm){
    var $ind = $('.imgs_ul:first li').index($parm);
    var $number = getImgNum();
    var $dif = $ind - $currentImg;
    // alert('currentImg  '+$currentImg+'\nindex  '+$ind+'\ndif  '+$dif+'\nnumber  '+$number);
    var $undif = $number - Math.abs($dif);
    if (Math.abs($dif) <= $undif) {
        moveTheImg($dif);
    }else{
        $dif>0?moveTheImg(-$undif):moveTheImg($undif);
    };
}
function moveTheImg(parm){
    if (parm>0) {
        goToBackImg(parm,true);
    }else{ 
        goToBeforeImg(-parm,true);
    };
}


/**** 设置轮播图结束 ****/


// 1.获取图片个数
// 2.在两边加载图片,共加载三个
// 3.移动,移动一个成功后自动刷新这三个img
//
//
// 1.移动成功切换
// 2.点击切换,大图移动


















