# scrollFix
滚动固定


## 使用方法
简单示例,如固定头部:

``` html
<div id="header" style="height: 50px;line-height:50px;color:#fff;background: rgba(0,0,0,0.5);">
    固定头部
</div>
<div class="body" style="height:1500px;background:#ccc;">
    很多很多内容
</div>
```

以上标签的style样式只是示例样式，Scrollfix 组件不依赖此样式，然后传入id实例化即可:

``` js
var S1 = new ScrollFix(document.getElementById('header'));
```

## 示例 
- [简单固定](http://chancedai.github.io/scrollFix/demo/1.html)
- [根据自定义条件固定1](http://chancedai.github.io/scrollFix/demo/2.html)
- [根据自定义条件固定2](http://chancedai.github.io/scrollFix/demo/3.html)
- [使用fix,unfix接口](http://chancedai.github.io/scrollFix/demo/4.html)

## 配置选项

Scrollfi第二个参数接受一个对象做为配置选项，其中回调设置，默认第一个参数为容器，详细如下:

- **fixedClz** String *(default:'fixed')* - 容器在固定时添加的css class

- **getTop** Function *(default:return 0;)* - 容器在固定时，距离顶部的距离

- **getHeight** Function *(default:return wrap.offsetHeight)* 容器的高度，当offsetHeight,不准确时，用户可以自行设定，以防判断是否固定出错

- **fixed** Function *(default:return scrollTop > offsetTop - top)* - 容器是否固定的判断条件，默认是 页面隐去高度大于容器的offsetTop减去容器固定时距离顶部的距离(scrollTop > offsetTop - top),该回调会传入四个参数(wrap容器，scrollTop页面隐去高度，容器非固定状态时的offset,top固定时距离顶部的距离)

- **onFix** Function - 容器在固定时的回调

- **onUnFix** Function - 容器在不固定时的回调
 

### 示例

``` js

var S1 = new Scrollfix(document.getElementById('header'), {
  fixedClz: 'fixed',
  getTop: function(wrap) {
    return 0;
  },
  getHeight: function(wrap) {
    return wrap.offsetHeight;
  },
  fixed: function(wrap, scrollTop, offsetTop, top) {
    return scrollTop > offsetTop - top;
  },
  onFix: function(wrap) {},
  onUnFix: function(wrap) {}
});

```

## 接口

Scrollfix 只暴露两个简单接口：

`unFix()` 容器滚动时不再固定

`fix` 窗口在滚动时恢复滚动


## 浏览器支持
Scrollfix支持IE7+所有浏览器;滚动固定，现存的方案，用户体验很差，故不支持IE6浏览器。


## License
Copyright (c) 2015 Chance Dai Licensed under the [The MIT License (MIT)](http://opensource.org/licenses/MIT).

