$(function(){
    //判断本地数据是否为空
    let proArr = JSON.parse(localStorage.getItem(('cartPro')));
    //当数据为空时显示提示
    if( proArr.length === 0){
        $('.empty-tip').show();
        $('.total-of, .cart-header').addClass('hidden');
    }else{
      let listHtml = [];
      //把数据加载到页面
      proArr.forEach( e => {
          let str = `
          <div class="item" data-id="${e.pID}">
            <div class="row">
              <div class="cell col-1 row">
                <div class="cell col-1">
                  <input type="checkbox" class="item-ck" checked="">
                </div>
                <div class="cell col-4">
                  <img src="${e.imgSrc}" alt="">
                </div>
              </div>
              <div class="cell col-4 row">
                <div class="item-name">${e.name}</div>
              </div>
              <div class="cell col-1 tc lh70">
                <span>￥</span>
                <em class="price">${e.price}</em>
              </div>
              <div class="cell col-1 tc lh70">
                <div class="item-count">
                  <a href="javascript:void(0);" class="reduce fl">-</a>
                  <input autocomplete="off" type="text" class="number fl" value="${e.num}">
                  <a href="javascript:void(0);" class="add fl">+</a>
                </div>
              </div>
              <div class="cell col-1 tc lh70">
                <span>￥</span>
                <em class="computed">${e.price * e.num}</em>
              </div>
              <div class="cell col-1">
                <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
              </div>
            </div>
          </div>`;
          listHtml.push(str);
      });
  
      //在item-list追加结构
      $('.item-list').append(listHtml.join(''));

        $('.empty-tip').hide();
        $('.total-of, .cart-header').removeClass('hidden');
    };

    //全选与单选设置
    let ckAll = $('.pick-all');
    //
    let cks = $('.item-list .item-ck');
    //全选点击
    ckAll.on('click',function(){
        //若全选选了，单选全选
        let isckAll = $(this).prop('checked');
        cks.prop('checked',isckAll);
        //另一个全选
        $('.pick-all').prop('checked',isckAll);
        ComputedNumAndPrice();
    });
    //单选点击，得用事件委托
    $('.item-list').on('click','.item-ck',function(){
        ckAll.prop('checked', $('.item-list input:checked').length === cks.length);
        ComputedNumAndPrice();
    });
    ComputedNumAndPrice();
    //算出对应的总数及总价
    //多处应用到可以封装起来
    function ComputedNumAndPrice(){
      //获得勾选的对应的id
      let isCK = $('.item-list .item-ck:checked');
      // console.log(isCK)
      let totalNum = 0;
      let totalPrice = 0;
      isCK.each((i,e) => {
        let id = parseInt($(e).parents('.item').attr('data-id'));
        // console.log(id)
        proArr.find(e => {
          if(e.pID === id){
              totalNum += e.num;
              totalPrice += e.num * e.price;
          }
          // console.log(e.pID )
        });
      });

      //改变总价及总数的内容
      $('.total-of .selected').text(totalNum);
      $('.total-of .total-money').text(totalPrice);

      $('.shopcar .count').text(totalNum);
    }

    //事件委托，点击加减按钮
    $('.item-list').on('click','.add',function(){
      //通过勾选的来获得父元素的data-id
      let id = parseInt($(this).parents('.item').attr('data-id'));
      // console.log(id)
      //获得文本框的值
      let oldNum = parseInt($(this).siblings('.number').val());
      //值++ 
      oldNum ++;
      $(this).siblings('.number').val(oldNum);
      //判断当值>1
      if(oldNum > 1){
        $(this).siblings('.reduce').removeClass('disabled');
      }
      //获得本地的数值
      let newArr = proArr.find(e =>{
        return e.pID === id;
      });
      //更改数组中的num
      newArr.num = oldNum;

      //保存在本地
      let strJson = JSON.stringify(proArr);
      localStorage.setItem('cartPro',strJson);

      ComputedNumAndPrice();

      //小计的值
      $(this).parents('.item').find('.computed').text(oldNum * newArr.price);
    });
    $('.item-list').on('click','.reduce',function(){
      //获取文本框的值及item id
      let oldNum = parseInt($(this).siblings('.number').val());
      let id = parseInt($(this).parents('.item').attr('data-id'));

      //判断值
      if(oldNum ===1 ){
        $(this).addClass('disabled');
        return;
      }
      // 自减
      oldNum --;
      //改变文本的值
      $(this).siblings('.number').val(oldNum);

      //获得本地对应的数据
      let newArr = proArr.find(e =>{
        return e.pID === id;
      });
      //更改数组的num
      newArr.num = oldNum;

      //更新本地
      let strJson = JSON.stringify(proArr);
      localStorage.setItem('cartPro', strJson);

      ComputedNumAndPrice();
      //小计的值
      $(this).parents('.item').find('.computed').text(oldNum * newArr.price);
    });


    // 事件委托，点击删除删除页面对应的item,并删除对应本地的数据
    $('.item-list').on('click','.item-del',function(){
      //为this 赋值
      let _this = this;
      $( "#dialog-confirm" ).dialog({
          resizable: false,
          height:140,
          modal: true,
          buttons: {
            "确认": function() {
              $( this ).dialog( "close" );
              // 把对应的商品删除
              $(_this).parents('.item').remove();

              //获取对应父元素的id
              let id = parseInt($(_this).parents('.item').attr('data-id'));
              //获得与对应本地数据的索引
              let index = proArr.findIndex(e => {
                return e.pID === id;
              });

              //删除索引中的数据
              proArr.splice(index,1);

              //更新本地数据
              let strJson = JSON.stringify(proArr);
              localStorage.setItem('cartPro', strJson);

              changeNumAndPrice();
            },
            "取消": function() {
              $( this ).dialog( "close" );
            }
          }
        });
    })

})