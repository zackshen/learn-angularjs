##directives

###restrict

directive有四种形式, A(attribute), E(Element), C(Class), M(Comment)
* A(attribute) 用在标签的属性上
* E(Element)作为元素标签使用
* C(Class)用在元素的class属性
* M(Comment)以注释的方式使用

####Element
自己写了个简单directive，clock，实现简单的时间刷新功能

```html
    <clock refresh="1"></clock>
```

这里clock是作为Html的Element出现的，Angular在这里实现了一套兼容HTML的DSL语法。

####Attribute

```html
    <input type="text" colors="red,blue,yellow"/>
```

鼠标移入到输入框内，会轮询的改变字体颜色


####Class

```html
    <span class="my-class: hello;"></span>
```



####Comment

```html
    <!-- directive: myComment world -->
    <span></span>
```

###directive中的scope
