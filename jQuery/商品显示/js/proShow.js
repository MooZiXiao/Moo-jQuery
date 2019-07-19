
//获取元素
let left = $('#left li');
let center = $('#center li');
let right = $('#right li');

let leftAndRightLi = $('#left li, #right li');
//自动播放需要的变量（时间，及索引）
let timer = 0;
let currentIndex = 0;
//left 第一个Li高亮显示
left.eq(0).addClass('bgC');
// console.log(leftAndRightLi)
//鼠标悬停事件
leftAndRightLi.each((i, e) => {
    $(e).on('mouseover', function () {
        //获得对应的索引
        let index = leftAndRightLi.index(this);

        //需要判断是左边的li还是右边的
        if (index <= leftAndRightLi.length / 2 - 1) {
            right.removeClass('bgC');
        } else {
            left.removeClass('bgC');
        }

        //li当前索引显示高亮，其他不显示
        $(this).addClass('bgC').siblings().removeClass('bgC');

        //当前索引显示，其他隐藏
        center.eq(index).show().siblings().hide();

        currentIndex = index;
    })
});

function autoPlay() {//设置自动播放
    timer = setInterval(() => {
        //索引 ++
        currentIndex++;
        //左右 li高亮显示判断
        if (currentIndex > leftAndRightLi.length - 1) {
            //到右边最后时，当前索引回到0
            currentIndex = 0;
            //同时要移除右边的样式;
            right.removeClass('bgC');
        }
        if (currentIndex === left.length - 1) {
            left.eq(left.length - 1).removeClass('bgC');
        }
        //需要判断是左边的li还是右边的
        if (currentIndex <= leftAndRightLi.length / 2 - 1) {
            right.removeClass('bgC');
        } else {
            left.removeClass('bgC');
        }
        //li当前索引显示高亮，其他不显示
        leftAndRightLi.eq(currentIndex).addClass('bgC').siblings().removeClass('bgC');

        //商品
        center.eq(currentIndex).show().siblings().hide();
    }, 1500);
}
autoPlay();
//鼠标悬停/移出wrapper
$('.wrapper').on('mouseover', function () {
    clearInterval(timer);
});
$('.wrapper').on('mouseout', autoPlay);