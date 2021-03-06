# AngularJS 过滤器、服务、路由


## TODOMVC案例

- 根据界面原型抽象数据成员（有哪些数据，每个数据的类型和结构）
 + 只要是列表结构,最外层肯定是数组
```
        //任务列表
    $scope.toDos = [
    /*这边写的就是你要用到的一些数据结构
    id,做程序最好都要写id,不管有没有用
    text就比如我们要写进去的任务项
    completed记录有没有被完成*/
        {id:1,text:'读书',completed:false},
        {id:2,text:'数据',completed:false},
        {id:3,text:'滴滴滴',completed:true},
    ];
```
- 设计模块，控制器
- 完成数据绑定
- 编写交互逻辑

## 过滤器
- currency
 + 用法：{{1000|currency}} ==> $1,000.00
 + 这个过滤器基本不用，因为只能美元。
- date
 + 用法：{{12345648943518| date}} 也是数字后面加要的过滤器名字，默认出来的是英文标准的数据格式。
 + {{12345648943518| date:'yyyy-mm-dd hh-mm-ss'}} 可以传参数，定义成自己需要的格式。
- json
 + 用法：生产环境没用，开发环境有点用
 + 可以讲字典类型的数据用这个过滤器打印在网页中，看看双向绑定的数据变化。
- limitTo 
 + 限制数量，限制字符串或者遍历长度
 + {{'asdqwihifheuiwhf'|limitTo:10}} 这样就是限制只显示10个字符
 + {{'asdqwihifheuiwhf'|limitTo:10:10}} 第二个参数的意思是从第10个开始显示
 + 在js中也可以使用
```
  angular.module('app', [])
      .controller('DemoController', ['$scope', '$filter', function($scope, $filter)
   // 如果在控制器中需要用到一个不存在的对象，都尝试使用注入的方式，在传进去的函数中添加了一个$filter
        $scope.text = $filter('limitTo')('hahahahahahah', '10', 5);
```
- lowercase, uppercase
 + 这个没用，我们都是写中文的软件，转大小写干嘛
- number
 + {{'3333.1415'|number:10}} 如果不写参数，默认给你停在小数点后三位，会四舍五入
- orderBy
 + 按照特定字段排序，默认是正序，倒序则加上-号

### filter 过滤器

- 检索特定内容，默认模糊匹配
 + 模糊匹配的意思，就是整个对象只要带有你要筛选的字都会被选出来，
- 如果传入对象则匹配特定属性，如传入{name:'张三'}，则匹配那么属性中包含张三

#### 自定义比较

- 默认filter过滤器使用的是模糊匹配
- 需要自定义比较函数
- filter的第三个参数
### 自定义过滤器
angular.module('myFilter',[]).filter('check',function(){
  //用的比较少
})

## 服务
 ### $location 
### 内置服务

#### $log服务 = console.log();

- 打印控制台日志
- 启用或者关闭

#### $timeout = settimeout

### 自定义服务



## 路由

### NG 中路由是单独提供的功能模块 ngRoute, 也是一个单独发型的文件

- 安装或者下载angular-route的包
- 引入这个包
- 在自己的模块中添加 ngRoute 依赖
 + angular.module('myApp',['ngRoute'])
- 路由配置（配置路由规则）
  + 规则指的就是 什么样的请求 找什么控制器
  + [{url:'/sdf',controller:'MainController'}]
- 编写对应的控制器和视图


/students/zhangsan

/:role/:name

{role:students,name:zhangsan}

- 使用ngRoute
 + 自己模块中添加它的依赖
 + 用一个config创建一个路由 routeProvider（路由提供者）
```
 myApp.config(['$routeProvider',function($routeProvider) {
  
}])
```
 + 配置路由模块
 ```
      var app = angular.module('app', ['ngRoute']);
    app.config(['$routeProvider', function($routeProvider) {
      $routeProvider
      .when('/a',function(){
          controller:'AController',
          templateUrl:'./view/a.html'
        })
        .when('/b',function(){
          controller:'BController',
          templateUrl:'./view/a.html'
        })
        ;
      /*
        每一个when就是一个分支，类似于if，当
        是/a的时候，你就会请求到a.html页面，b同理
        参数里面的controller也是必须要有创建出来
        缺点就是每次都要去请求要载入的页面
      */
    }]);
 ```
 + 第二种方式
```
  <script id="a_tmpl" type="text/ng-template">
    <!-- 只有type="text/javascript"的script节点才会被当做JS执行 -->
    <!-- script中的内容就算不能执行，也不可以显示在界面上 -->
    <h1>{{title}}</h1>
  </script>
  给这个script标签一个id，然后路由配置的时候
  .when('/students/:name?', {
          controller: 'StudentsController',
          templateUrl: 'a_tmpl'//请求这个id，把此作为模板
  })
  这样就不会每次都要加载不同的页面了
```
 + when就相当于 switch 里面的case，那么就肯定有它的default
```
    // 别的请求
        .otherwise({
          // 跳转到一个地址
          redirectTo: '/a'
        });
    //就是刚开始默认的地址，也叫重定向
```
- 以上介绍的是路由匹配单个地址，匹配一类地址的情况
```
.when('/students/:name?', {
          controller: 'StudentsController',
          templateUrl: 'a_tmpl'
        })
    <!-- /students/:name?表示匹配students下面的所有文件名，
      ：占位符表示这个可以匹配
      ？表示可以忽略名字只匹配students -->
```
 + 这样我们就可以通过匹配的参数进行操作
 ```
app.controller('StudentsController', ['$scope', '$routeParams', function($scope, $routeParams) {
      $scope.title = '你好' + $routeParams['name'] + '这是A控制器';
    }]);

    在控制器中添加一个参数$routeParams
    你的匹配规则是name，/students/:name? 那就传name
    $routeParams['name']
 ```

## 管理代码-为了增强可维护性
- 单独创建一个放控制器代码的文件，使用模块的方式关联起来
 + 可以通过‘.’的方式命名
```
  var controller = angular.module('app.controller.main', []);
```
- 在视图中引入这个文件，要在app.js前面引入
## 创建自己的服务
```
    (function(angular){
      angular.module('app.serve.main', [])
      .service('mainServer', ['', function(){
        //业务逻辑都必须出现在服务中，add remove...
      }]);
    })(angular)
```
- 有业务逻辑（和数据有交集，并且需要进行重用的代码）的，都应该放在服务里面
- 写好服务代码，在控制器的模块中引入服务模块


## 如果连入第三方文件时不写协议的话：
http://apps.bdimg.com/libs/angular.js/1.4.7/angular.min.js
↓
<script src="//apps.bdimg.com/libs/angular.js/1.4.7/angular.min.js"></script>
如果当前你的网站是HTTP的方式部署的话，请求
http://apps.bdimg.com/libs/angular.js/1.4.7/angular.min.js
如果是HTTPS的话，请求
https://apps.bdimg.com/libs/angular.js/1.4.7/angular.min.js