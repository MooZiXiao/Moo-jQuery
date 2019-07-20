$(()=> {
    //获取本地数据
    let arr = JSON.parse(localStorage.getItem('cartPro')) ? JSON.parse(localStorage.getItem('cartPro')) : [];

    let total = 0;
    //遍历数据，让num相加
    arr.forEach(e => {
        total += e.num;
    });

    //改变值
    $('.shopcar .count').text(total);
})