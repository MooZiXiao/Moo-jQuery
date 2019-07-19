;(
    function(){
        /**
         * 封装一个自己的jquery
         */
        function jQuery(selector){
            //通过实例化来实现获得元素
            return new Init(selector);
        }
        /**
         * 创建一个获得类名的函数
         */
        function Init(selector){
            //设置变量来获取类名
            let element = document.querySelectorAll(selector);
            //遍历element
            for(let i = 0; i < element.length; i++){
                this[i] = element[i];
            }
            //设置伪数组中对应的长度
            this.length = element.length;
        }
        /**
         * 由于在创建方法过程中需要多次用到遍历,所以创建一个遍历的方法
         */
        Init.prototype.each = function(callback){
            //由于不确定逻辑，所以要传入回调函数
            for(let i = 0; i < this.length; i++){
                callback(i, this[i]);
            }
            return this;
        }
        /**
         * 设置一个设置样式的方法
         */
        Init.prototype.css = function(property, value){
            //由于改变样式不只是改变一个属性，所以可以通过传参来解决

            //获得元素的属性，则当value为 undefined
            if(value === undefined){
                return window.getComputedStyle(this[0])[property];
            }else{
                // 设置一个数组来存储需要加 px 的属性
                let proArr = ['width', 'height', 'top', 'left', 'bottom', 'right'];
                //遍历元素
                this.each((i,e) => {
                    //判断数组中的属性
                    if(proArr.indexOf(property) !== -1){
                        //判断数值value是否带 px
                        if(value.toString().indexOf('px') !== -1){
                            e.style[property] = value;
                        }else{
                            e.style[property] = value + 'px';
                        }
                    }else{
                        e.style[property] = value;
                    }
                });
            }
            return this;
        }

        /**
         * 设置一个增加类名的方法
         */
        Init.prototype.addClass = function(className){
            //遍历元素给元素增加类名,则需要加入参数
            this.each((i,e) => {
                e.classList.add(className);
            });
            return this;
        }
        /**
         * 设置一个移除类名的方法
         */
        Init.prototype.removeClass = function(className){
            this.each((i,e) => {
                e.classList.remove(className);
            });
            return this;
        }
        /**
         * 设置一个替换类名的方法
         */
        Init.prototype.toggleClass = function(className){
            this.each((i,e)=> {
                e.classList.toggle(className);
            });
            return this;
        }
        /**
         * 设置一个innerHTML的方法
         */
        Init.prototype.html = function (content) {
            //判断content是否为空
            if(content !== undefined){
                this[0].innerHTML = content;
            }
        }

        /**
         * 设置一个获取索引对应的元素的方法
         */
        Init.prototype.eq = function (i){
            return this[i];
        }
        /**
         * on事件绑定
         */
        Init.prototype.on = function(type, fn){
            switch(type){
                case 'click':
                    return this[0].onclick = fn;
                break;
                case 'mouseover':
                    return this[0].onmouseover = fn;
                break;
                case 'mouseout':
                    return this[0].onmouseover = fn;
                break;
                case 'mouseove':
                    return this[0].onmouseover = fn;
                break;
                case 'keydown':
                    return this[0].onmouseover = fn;
                break;
                case 'keyup':
                    return this[0].onmouseover = fn;
                break;
            };
            return this;
        }


        /**
         * 设置一个时间格式（yyyy - MM - dd）显示的方法
         */
        Date.prototype.promit= function (){
            let y = this.getFullYear();
            let M = this.getMonth() + 1;
            let d = this.getDate();
            let h = this.getHours();
            let m = this.getMinutes();
            let s = this.getSeconds();
            M = (M<10) ? '0'+ M : M;
            d = (d<10) ? '0'+ d : d;
            h = (y<10) ? '0'+ h : h;
            m = (y<10) ? '0'+ m : m;
            s = (s<10) ? '0'+ s : s;

            return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s;
        }


        //设置jq
        window.$ = window.jQuery = jQuery;
        
    }
)();