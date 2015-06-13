##scopes

###作用域
作用域是作为粘合controller和view的`胶水`。controller和directive都有对作用域的引用，这种组织方式隔离了controller和directive， 就像隔离controller和view。


###作用域继承

[demo](http://127.0.0.1:8080/scopes/scopes-1.html)


###作用域事件传播

作用域事件往父作用域传播使用[emit](http://127.0.0.1/8080/scopes/scopes-event.html)

作用域事件往子作用域传播使用[broadcast](http://127.0.0.1/8080/scopes/scopes-event.html)
