##providers
providers有四种类型，Value, Factory, Service, Constant, 这四种都是providers，底层调用的就是provider，
只是提供了编写provider的语法糖。


### Value

```javascript

app.value("token", "abcdef1234567890");

```

### Constant
constant和value很像，但是value可以改变，但是constant声明之后就不能更改


### Provider
返回的是一个带有$get(调用$get来拿到实例化对象)方法的对象，底层provider会调用$get来实例化对象。

### Factory
返回的是一个已经实例化的对象


### Service
返回的是一个对象构造函数，等待着provider去实例化它。
