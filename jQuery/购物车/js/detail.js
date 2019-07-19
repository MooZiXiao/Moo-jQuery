$(function(){
    //获取地址栏中的id
    let id = parseInt(location.search.substring(4));
    // console.log(id)
    //筛选对应的数据
    let proArr = phoneData.find(e => {
        return e.pID == id;
    });
    //改变图片
    $('.preview-img img').attr('src',proArr.imgSrc);
    //改变标题
    $('.sku-name').text(proArr.name);
    //改变价格
    $('.summary-price em').text('￥' + proArr.price);

    //设置增加、减少数量
    let chooseNumber = $('.choose-number');
    let add = $('.add');
    let reduce = $('.reduce');
    let proNum = chooseNumber.val();

    //点击add
    add.on('click',function(){
        //自增
        proNum ++;
        //判断大于1后情况
        if(proNum >=2){
            reduce.removeClass('disabled');
        }
        //改变文本
        chooseNumber.val(proNum);
    });
    //点击减少
    reduce.on('click',function(){
        //自减
        proNum --;
        //判断<=1时
        if(proNum <= 1){
            proNum = 1;
            reduce.addClass('disabled');
        }
        //改变文本
        chooseNumber.val(proNum);
    });


    //放大镜
    let preview = $('.preview-img');
    let mask = $('.mask');
    let big = $('.big');
    let previewImg = $('.preview-img img')
    // console.log(previewImg)
    preview.on('mouseover',function () {
        mask.show();
        big.show();
    });

    let previewT = preview[0].offsetTop;
    let previewL = preview[0].offsetLeft;
    let previewW = preview[0].offsetWidth;
    let previewH = preview[0].offsetHeight;
    preview.on('mousemove',function(e){
        //获取preview左上角离页面左上角的坐标，及mask的宽高一半
        let halfMaskW = mask[0].offsetWidth/2;
        let halfMaskH = mask[0].offsetHeight/2;

        //算出差值
        let x = e.pageX - previewL - halfMaskW;
        let y = e.pageY - previewT - halfMaskH;

        //判断，使遮罩在某个区域移动
        if( x < 0 ) x = 0;
        if( y < 0 ) y = 0;
        if( x > ( previewW-halfMaskW * 2 )) x = previewW-halfMaskW*2;
        if( y > ( previewH - halfMaskH *2 )) y = previewH - halfMaskH *2;
         //设置偏移
        mask.css('left', x);
        mask.css('top', y);

        // 
        let bigImg = $('.big img');
        let bigImgW = bigImg[0].offsetWidth;
        let bigImgH = bigImg[0].offsetHeight;

        let xx = x * bigImgW/previewW * -1;
        let yy = y * bigImgH/previewH * -1;
        // console.log(bigImgW)
        bigImg.css('left',xx)
        bigImg.css('top',yy)
    });

    preview.on('mouseout',function () {
        mask.hide();
        big.hide();
    });


    //加入购物车按钮
    $('.addshopcar').on('click',function(){
        //获取该商品的相关信息（图片，名字，价格，购买个数)
        //创建对象，用数组的方式存储起来

        //获取文本框值
        let num = $('.choose-number').val();
        // console.log(typeof num)
        //验证数量的文本框输入的是否为数字
        if(isNaN(num)){
            alert('请输入确认你输入的商品数量无误！');
            return;
        }
        //将数值从字符串转化为数字
        num = parseInt(num);

        //创建对象数组
        let goods = {
            pID : id,
            imgSrc : proArr.imgSrc,
            name : proArr.name,
            num : num,
            price : proArr.price
        };
        // console.log(goods)
        //把数据存储到本地中
        //当数据中为空时则加入空数组
        let cartArr = JSON.parse(localStorage.getItem('cartPro')) ? JSON.parse(localStorage.getItem('cartPro')) : [];

        //查找数组中是否有添加到购物车的数据
        //若是没有则给 cartArr 添加
        let proInfo = cartArr.find((e,i) => {
            return e.pID === id;
        });
        if(!proInfo){
            cartArr.push(goods);
        }else
        {
            proInfo.num += num; //叠加数量
        };

        let str = JSON.stringify(cartArr);
        localStorage.setItem('cartPro',str);

        //跳转至购物车页面
        location.href = './cart.html';
    })
})