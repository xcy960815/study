本总结来自于https://www.cxyzjd.com/article/czj1049561601/115078883

### 什么是 MVC？

1：MVC 是 Model(数据)-View(视图)-Controller(控制器) 的缩写
2：视图(view)将指令传到控制器(Controller)
3：控制器(Controller)做完逻辑处理后改变数据(Model)
4：数据(Model)做完改变后更新视图(view)

### 什么 MVVM？

1：MVVM 是 Model(数据)-View(视图)-ViewModel(数据和视图之间的桥梁) 的缩写

2：其核心是提供对 View 和 ViewModel 的双向数据绑定，这使得 ViewModel 的状态改变可以自动传递给 View，即所谓的数据双向绑定。

3：它的核心是 MVVM 中的 VM，也就是 ViewModel。 ViewModel 负责连接 View 和 Model，保证视图和数据的一致性。

### 为什么会出现 MVVM?

以 mvc 为例

痛点 1、 开发者在代码中大量调用相同的 DOM API，处理繁琐 ，操作冗余，使得代码难以维护。

痛点 2、大量的 DOM 操作使页面渲染性能降低，加载速度变慢，影响用户体验。

痛点 3、 当 Model 频繁发生变化，开发者需要主动更新到 View ；当用户的操作导致 Model 发生变化，开发者同样需要将变化的数据同步到 Model 中，这样的工作不仅繁琐，而且很难维护复杂多变的数据状态。

MVVM 的出现解决了上面的三个痛点
