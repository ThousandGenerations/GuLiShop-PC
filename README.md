# 组件间通信
# 组件

1. 组件是 Vue.js 强大的功能之一，组件就是具有特定功能效果的集合体，和模块化类似
2. 现在存在的问题就是组件实例的作用域之间是相互独立的，这就意味着组件之间无法直接相互引用，一般来说组件间大概有图中的关系
  
![组件间通信](http://assets.processon.com/chart_image/5ead6131e0b34d05e1bdf27a.png)

3. 从图中可以看出来（一般来说组件间只讨论祖先、兄弟、父子关系）
* App 作为根组件分别和 A 组件和 B 组件是父子关系
* A 组件和 B 组件之间又是兄弟关系
* A 组件和 C 组件又是父子关系
* App 根组件和 C 组件又是祖先后代的关系
4. 针对不同的场景，有很多组件间通信的方式以及用法

## 1. props
* Vue 中最基本的组件间通信方式，props 是父子组件通信中父组件传值给子组件的一种方式。
    * 它通过标签属性的方式传递数据
    * 子组件只应该进行读取值使用，不应该直接去修改值(不是不能,是不应该)
* 父组件中定义 data 数据
```js
    data(){
        return{
            comment:[{},{}],
        }
    }
```
* 父组件给子组件指定标签属性
```html
<CommentList :comments="comments" />
```
* 子组件此时要声明接收标签属性（声明接收之后，子组件的实例对象就直接用有了这个属性）。
* 子组件接收方式:
```js
//数组形式
props:['props1','props2'];

//对象形式1
props:{
    props1:Array,
    props2:Function
}

//对象形式 2
props: {
        prop1: {
          type: Number,  // 类型是Number
          default: 0, // 默认值为 0
          required: true, // 必须要传的属性（必要的）
          validator: function (value) { // 校验函数
            return value >= 0 // 值必须大于0
          }
        }
      }
```

    * 一般来说使用第二种方式声明接收,第二种方式即简洁,又比第一种方式更加能说明数据的类型,方便操作
* 组件中关于数据的重要问题
    * 数据定义在哪个组件？  
        * 1. 如果数据只有一个组件使用，就定义在这个组件当中
        * 2. 如果数据有多个组件使用，就定义在多个组件的公共父组件中
    * 更新数据的方法定义在那里？
        * 数据源在那里，更新数据的方法就定义在哪里 
* 父组件给子组件传递数据
    * 函数：
        * 子组件调用函数修改父组件的数据（子组件传递数据给父组件  子-->父）
    * 非函数：
        * 父组件传递数据子组件直接使用（父组件传递数据给子组件 父-->子）
        * 需要注意的是：子组件只使用数据不要直接修改数据，应该通过调用父组件的方法来修改


## 2. $emit
* $emit:通常用作父子组件通信,配合一个事件名使用来分发一个自定义的事件
```
// 父组件
<template>
    <button-component @clickButton="clickButton"></button-component>
    // 在父组件利用 v-on 监听
</template>
<script>
export default {
    methods: {
      clickButton () { ··· }
    }
}
</script>

// 子组件
<template>
    <button @click="handleClick"></button>
</template>
<script>
export default {
    methods: {
      handleClick () { // 触发 $emit
        this.$emit('clickButton');
      }
    },
    mounted() {
        this.$on('clickButton', (...arr) => { // 也可以自己监听 $emit，虽然没什么用···
            console.log(...arr);
        })
    }
}
</script>
```
## 3. v-model
* v-model双向数据绑定回顾

```html
    <input type="text" v-model="msg" />
    <!-- v-model -->
    <!-- v-model 回顾 -->
    <p>{{msg}}</p>
    <br />
    <!-- v-m
```
```js
data() {
    return {
      msg: "v-model",
    };
  }
```

* 通过v-model 实现双向数据绑定，其本质上就是通过获取到 input 的 value 值，之后再绑定 input 事件，将 input 的 value 值赋值给定义的变量，这样就实现了 input 输入框的值改变，接着就会改变这个变量的值
```html
<!-- v-model 本质 -->
    <!-- 实际上是使用 :value="msg" 和 绑定 input 事件 取出 input 的值赋值给 msg 来实现-->
    <input type="text" :value="msg2" @input="msg2=$event.target.value" />
    <p>{{msg2}}</p>
```
```js
data() {
    return {
      msg2: "v-model 本质"
    };
  }
```

* 上面两种方式所达到的效果都是一样的 
* v-model 不仅能实现数据的双向数据绑定还能实现组件与组件之间的双向绑定（传值），能够实现父子组件之间相互通信
* 在组件标签上使用 v-model 
```html
<!-- 在组件标签上使用的本质 -->
<!-- 父组件 -->
    <p>{{msg3}}</p>
    <ModelChild v-model="msg3" />
    <!-- 组件上的 v-model 等同于下面的写法 -->
    <ModelChild :value="msg3" @input="msg3 = $event" />
    
<!-- 子组件 -->
<div>
    <input type="text" :value="value" @input="$emit('input',$event.target.value)" />
    <!-- 首先是绑定了 input 事件监听 之后又使用$emit 分发事件,就会执行里面的代码 绑定自定义事件监听,取出 input 数据,传给父组件对应的事件 -->
    <p>{{value}}</p>
  </div>
```
```js
//父组件
data() {
    return {
      msg3: "xiaofeizhang"
    };
  }
//子组件
props: ["value"]
  // 子组件内部接收父组件传入的绑定在 input 上面的value  通过 props 声明接收 然后子组件的实例对象就直接拥有了 msg(value) 这个值
};
```

# 4. 属性修饰符 .sync
.sync属性修饰符与 v-model 类似，可以实现组件间的相互通信，更准确的说法是双向数据同步
* 首先是在父组件有数据，想在子组件中展示，可以使用标签中传递属性的方式传递数据
* 不使用 sync
```html
<!--父组件-->
<!--不使用 sync -->
<h2>Sync</h2>
    <p>小明爸爸现在有 {{money}}</p>
    <h2>不使用 sync</h2>
    <!--通过属性的方式向子组件传递money数据-->
    <!--在这里父组件绑定自定义事件，将子组件传过来的值再赋值给（修改）money 就形成了双向数据传递-->
    <SyncChild :money="money" @update:money="money = $event" />
```
```js
//父组件
data() {
    return {
      money: "10000"
    };
  }
```
```html
<!--子组件-->
 <div>
    <span>小明每次花 100</span>
    <!--绑定点击事件，通过$emit事件分发,触发自定义事件，将父组件传来的数据减去 100-->
    <button @click="$emit('update:money',money-100)">花钱</button>
    <span>爸爸还剩{{money}}</span>
  </div>
  
```
```js
//子组件通过 props 来接收数据 之后通过给 botton 绑定点击事件，通过$emit事件分发,触发自定义事件，将父组件传来的数据减去 100
  props: {
    money: String
  }
  ```
  * 使用 sync
  
  ```html
  <!--父组件-->
  <h2>使用 sync</h2>
  <!--同样经过标签属性传递数据-->
  <!--唯一不同点就是这边子组件没有绑定自定义事件来触发子组件传过来的数据 而是通过属性修饰符 sync 完成同步数据 实际上就是简化代码 和上面本质上没有区别 内部也是使用绑定自定义事件来实现的-->
    <SyncChild :money.sync="money" />
  
  ```
 ```js
  //父组件
data() {
    return {
      money: "10000"
    };
  }
```
```html
<!--子组件-->
 <div>
    <span>小明每次花 100</span>
    <!--绑定点击事件，通过$emit事件分发,触发自定义事件，将父组件传来的数据减去 100-->
    <button @click="$emit('update:money',money-100)">花钱</button>
    <span>爸爸还剩{{money}}</span>
  </div>
  
```
```js
//子组件通过 props 来接收数据 之后通过给 botton 绑定点击事件，通过$emit事件分发,触发自定义事件，将父组件传来的数据减去 100
  props: {
    money: String
  }
  ```
  * 总结： 实际上内部就是使用绑定自定义事件，先将父组件中的数据通过标签属性的方式传递给子组件，然后子组件再通过 props的方式 接收，在子组件中就能使用，当子组件修改这个值的时候，将修改后的值通过自定义事件$emit 分发事件的方式修改父组件中的对应的值来完成的操作。这样就可以实现父子组件之间的相互通信，同步数据的目的

# 5.$attrs和$listeners
* 利用$attrs和$listeners以及v-bind和 v-on 的特别使用方法实现组件和后代组件的通信
```html
<!--父组件-->
<div>
    <h2>自定义带 hover 的提示按钮</h2>
    <!-- <a href="javascript:;" title="添加">
      <el-button type="primary" size="mini" icon="el-icon-plus" @click="test"></el-button>
    </a>-->
    <LinkButton type="primary" size="mini" icon="el-icon-plus" title="添加" @click="test" />
    <LinkButton type="info" size="mini" icon="el-icon-edit" title="更新" @click="update" />
    <LinkButton type="danger" size="mini" icon="el-icon-delete" title="删除" @click="remove" />
  </div>
```
```js
//父组件
import LinkButton from "./LinkButton";
export default {
  methods: {
    test() {
      alert("添加");
    }
  },
  components: {
    LinkButton
  }
};
```

```html
<!--子组件-->
<template>
  <a href="javascript:;" :title="title ">
  <!--后代组件-->
    <el-button v-bind="$attrs" v-on="$listeners"></el-button>
    <!--v-bind 和 v-on 特殊（对象）用法 来接收父组件向子组件传递的不确定的多个属性和事件-->
  </a>
</template>
```
```js
//子组件
export default {
  props: ["title"] //props 接收确定的属性 title
};
```
*   将父组件中的数据传递到子组件,确定的属性,比如说 title 通过 props 声明接收,
    不确定的属性通过$attrs 接收


    $attrs 可以接受包含属性数据的对象
    $listeners 可以接收所有的方法的对象
    v-bind="$attrs" :将父组件传递给我的一些动态属性,在传递给我的子组件 el
    v-on="$listeners" :将父组件绑定给我的事件监听,我再绑定给我的子组件

    实现了组件和后代组件之间的通信,使用的就是传递属性以及传递事件的方式 先由子组件接收 在由子组件传递给子组件的子组件 

    记住一点就是确定的属性要用 props 来接收 不确定的属性就要用$attrs 来就收 他可以接收所有属性

    总结:
    $attrs: 排除 props 声明,所有组件标签属性组成的对象
    $listeners : 组件标签绑定的所有事件组成的对象
    v-bind的特别使用 : v-bind="{id:xxx}"  //传递的是对象 正好对应$attrs 的所有属性的对象
    v-on的特别使用: v-on="{click:xxx}"  

    使用这四个语法的特性去封装了一个比较通用的带 hover 文本提示的按钮  封装可复用的组件
    
# 5.$children和$parent

* $children:所有直接子组件对象的数组（不考虑顺序）
* $parent：父组件对象
* $refs:包含所有有 ref 属性的标签对象或组件对象的容器对象

```html
<!--父组件html 部分-->
<template>
  <div>
    <h2>$children和$parent</h2>
    <p>他爸现在有{{money}}元</p>
    <button @click="jieqian">找小明借 100</button>
    <button @click="jieqian1">找小红借 200</button>
    <button @click="jieqian3">分别借 200</button>
    <!-- ref属性来实现 -->
    <XiaoMing ref="xiaoming" />
    <XiaoHong ref="xiaohong" />
    <XiaoHong ref="xiaohong" />
    <XiaoHong ref="xiaohong" />
  </div>
</template>
```
```js
//父组件js 部分
<script>
import XiaoMing from "./XiaoMing";
import XiaoHong from "./XiaoHong";
export default {
  components: {
    XiaoMing,
    XiaoHong
  },
  data() {
    return {
      money: 1000
    };
  },
  methods: {
    //找小明借钱 100
    jieqian() {
      //直接操作子组件的 data 数据 ,也可以在子组件定义方法
      //   this.$refs.xiaoming.money -= 100; //在子组件上声明 ref 属性,之后就可以通过$refs 获取组件的实例对象,实例对象上就有 money 属性,因为子组件的 money 这个属性是定义在 data 身上的,之后减去 100 就行了
      this.$refs.xiaoming.pullmoney(100); //得到子组件对象后调用方法操作(更新)子组件数据
      //   找小红借钱类似
      this.money += 100; //父组件身上在加上 100
    },
    //找小红借钱 200
    jieqian1() {
      //   this.$refs.xiaohong.money -= 200;
      this.$refs.xiaohong.pullmoney(200);
      this.money += 200;
    },
    jieqian3() {
      //找所有孩子借钱,当然调用上面的方法也是可以实现的,但是这样操作明显不够动态,所以我们要用到$children
      //通过$children的当时得到所有的子组件,是一个数组(无顺序),通过遍历这个数组,让每个组件实例对象调用 pullmoney 实例对象来让每个子组件的钱减少
      this.$children.forEach(child => {
        child.pullmoney(200);
        this.money += 200;
      });
    }
  }
};
</script>
```

```html
<!--子组件（小明）html-->
<template>
  <div>
    <hr />
    <p>小明现在有 {{money}}</p>

    <!-- 借钱给他爸 -->
    <button @click="pushmoney(100)">给他爸 100</button>
  </div>
</template>
```
```js
//子组件小明 js 部分
data() {
    return {
      money: 20000
    };
  },
  methods: {
    pullmoney(count) {
      this.money -= count;
    },
    pushmoney(count) {
      this.money -= count; //点击借钱的时候,减少自己的钱
      this.$parent.money += count; //同时他老爸也就是父组件的钱要加上自己减去的钱,   小红同理
    }
  }
```

```html
<!--子组件小红部分-->
<div>
    <hr />
    <p>小红现在有{{money}}</p>
    <button @click="pushmoney(200)">给他爸 200</button>
</div>
```
```js
//子组件小红 js 部分
data() {
    return {
      money: 10000
    };
  },
  methods: {
    pullmoney(count) {
      this.money -= count;
    },
    pushmoney(count) {
      this.money -= count; //点击借钱的时候,减少自己的钱
      //通过$parent找到父组件对象,更新 父组件中的数据
      this.$parent.money += count; //同时他老爸也就是父组件的钱要加上自己减去的钱,   小红同理
    }
  }
```

* 总结：
    * $refs方法在子组件上声明 ref 属性之后。通过$refs 方法可以获取子组件实例对象的数据，之后可以操作更新子组件的数据，适用于操作单个组件的数据，对于多个子组件同时操作就得都定义一遍 ref 属性
    * $children方法可以获取所有直接子组件实例对象的数据，同时操作所有直接子组件
    * $parent方法可以找到父组件（不是祖先组件，要是祖先组件还得再加 parent,也就是父组件的父组件），来获取父组件上的数据进行操作（更新）
    * 利用$children和$parent能方便的得到子组件、后代组件、父组件、祖先组件对象，从而更新其 data或者调用他的方法
    * 但是官方不建议大量使用，要优先使用 props 和 event

# 6.mixin(混合)
* mixin是分发组件可复用功能的一种很灵活的方式。每个mixin 对象可以包含全部组件选项。当组件使用 mixin 对象的时候，mixin 对象中的全部选项，都会被混入组件当中去使用。
* 首先需要定义一个mixins配置文件的配置对象并且向外暴露
```js
/* 
包含项目中n个组件复用的js 配置
*/
//向外暴露这个 cpMixin ,之后在组件中进入进行配置
export let cpMixin = {
    methods: {
        pullmoney(count) {
            this.money -= count;
        },
        pushmoney(count) {
            this.money -= count; //点击借钱的时候,减少自己的钱
            this.$parent.money += count; //同时他老爸也就是父组件的钱要加上自己减去的钱,   小红同理
        }
    }
}
```
* 在要使用的组件当中引入并使用
```js
<script>
import { cpMixin } from "../mixins"; //引入 mixin 配置文件，通过对象的解构赋值只使用这个 cpMixin
export default {
  mixins: [cpMixin], //定义这个 minxins，让组件拥有这个 cpMixin对象
  data() {
    return {
      money: 20000
    };
  },
  methods: {}
};
</script>
```
# 7.slot-scope (作用域插槽)
![作用域插槽](https://s1.ax1x.com/2020/05/03/YpkISO.jpg)
* 现在的问题就是 li 中显示什么内容是由父组件来决定的?
    * 如果只是一般的子组件需要显示父组件中的数据,那么使用一般的插槽就可以
* 但是,父组件传递什么样的内容,是由子组件来决定的
    * 例如,现在是效果一,那么已完成的是pink,那么就是由子组件中的 item 中的 isFlag来决定的,这些东西都是在子组件中的 item 中,是由子组件来决定的
    这个时候,只用一般的插槽是不行的,就需要使用到作用域插槽想父组件传递数据 ,父组件在接收到数据之后,判断到底要向子组件传递什么内容
* 子组件在 slot 中怎样向父组件传递数据呢?
    * 给 slot(插槽)指定属性,
          也就是说,给 slot 指定的属性,都会传递给父组件

          父组件怎样接收?
          1. 在父组件中写一个<template></template>
          2. 给template 添加属性名 slot-scope(注意,这个属性名是固定的) 来去指定一个名字接收子组件slot传过来的值
```html
<!--父组件 html 代码-->
<div>
    <h2>效果一 显示 todo 列表的时候,已完成的 todo 为绿色</h2>
    <List :data="todos">
      <!-- 
          slot-scope 指定的就是子组件通过 slot 标签传递过来的所有的数据对象
          也就是说这个 scope 里面有
                {
                    item:todo 对象    也就是{ id: 1, text: "吃饭", isFlag: true },
                    index:下标
                }
      -->

      <!--
             v-if 判断 当前需要的对象,也就是 item 里面的 isFlag 
             如果为 true(isFlag) 那么就要显示绿色的
             如果为 false(isFlag)那么就传递下面的 span 什么操作都没有的 

             这样就能让父组件决定传递什么样的数据给子组件的插槽,让子组件显示
      -->
      <template slot-scope="scope">
        <span v-if="scope.item.isFlag" :style="{background:'pink'}">{{scope.item.text}}</span>
        <span v-else>{{scope.item.text}}</span>
      </template>
    </List>

    <h2>效果二 显示 todo 列表的时候,带序号, todo 为蓝绿色搭配显示</h2>
    <List :data="todos">
      <template slot-scope="scope">
        <span>{{scope.index+1}}---</span>
        <span :style="{background : scope.index % 2 === 1 ? 'pink':'deeppink'}">{{scope.item.text}}</span>
      </template>
    </List>

    <h2>效果三 简化语法,显示序号 完成的显示 pink 未完成的显示 deeppink</h2>
    <!-- 通过对象的解构赋值操作 将 scope 这个对象结构出来,后面直接使用就可以 不需要再写 scope 了 -->
    <List :data="todos">
      <template slot-scope="{item,index}">
        <span>{{index+1}}---</span>
        <span v-if="item.isFlag" :style="{background:'pink'}">{{item.text}}</span>
        <span v-else :style="{background:'deeppink'}">{{item.text}}</span>
      </template>
    </List>
  </div>
```
```js
//父组件 js 代码
data() {
    return {
      todos: [
        { id: 1, text: "吃饭", isFlag: true },
        { id: 2, text: "睡觉", isFlag: false },
        { id: 3, text: "打豆豆", isFlag: true },
        { id: 4, text: "敲代码", isFlag: false },
        { id: 5, text: "听歌", isFlag: false },
        { id: 6, text: "逛 b 站", isFlag: true },
        { id: 7, text: "打张三", isFlag: false }
      ]
    };
  }
```

```html
<!--子组件 html代码-->
<ul>
    <li v-for="(item,index) in data " :key="index">
      <!-- 插槽 -->
      <slot :item="item" :index="index"></slot>
      <!--
        现在的问题就是 li 中显示什么内容是由父组件来决定的?
        如果只是一般的子组件需要显示父组件中的数据,那么使用一般的插槽就可以
        但是,父组件传递什么样的内容,是由子组件来决定的
        例如,现在是效果一,那么已完成的是绿色,那么就是由子组件中的 item 中的 isFlag来决定的,这些东西都是在子组件中的 item 中,是由子组件来决定的
        这个时候,只用一般的插槽是不行的,就需要使用到作用域插槽想父组件传递数据 ,父组件在接收到数据之后,判断到底要向子组件传递什么内容
      -->
      <!-- 
          子组件在 slot 中怎样向父组件传递数据呢?
          给 slot(插槽)指定属性,
          也就是说,给 slot 指定的属性,都会传递给父组件

          父组件怎样接收?
          1. 在父组件中写一个<template></template>
          2. 给template 添加属性名 slot-scope(注意,这个属性名是固定的) 来去指定一个名字接收子组件slot传过来的值
      -->
    </li>
  </ul>
```
```js
//子组件 js 代码
export default {
  props: {
    data: Array
  }
};
```
```js
<!-- 
    //父组件
      首先先定义组件标签,将todos的数据传递给子组件,通过标签属性的方式,子组件使用props接收
    -->
    <List :data="todos">
      <!-- 
      <template>的标签体内容会传递给子组件的<slot>
      slot-scope:用来指定接收子组件传递过<slot>的标签属性的所有属性数据
        scope的结构:
          {
            row:当前的行数据       //  { id: 1, text: "AAA", isComplete: false }
            $index:当前的li的下标
          }
      -->
      <template slot-scope="scope">
        <!-- 判断isComplete 为true的情况下将color颜色改为green -->
        <!-- 根据表达式的值的 truthiness 来有条件地渲染元素。在切换时元素及它的数据绑定 / 组件被销毁并重建。如果元素是 <template>，将提出它的内容作为条件块。 -->
        <span v-if="scope.row.isComplete" style="color:green">{{scope.row.text}}</span>
        <span v-else>{{scope.row.text}}</span>
      </template>
    </List>
    <!-- 
      问题: 数组的数据并不在父组件中遍历(只有数据源在父组件中 通过props传递给子组件,由子组件遍历显示),所以父组件无法得到具体的某一行的数据, 就无法向子组件List传递特定的列表项内容结构      
      这个时候要想的是所用于插槽 
    -->

```
* 总结：当父组件传递什么样的内容让子组件显示的时候，要显示的内容是由子组件来决定的，这样就很矛盾，因为现在数据都在子组件的 item 中，想让子组件显示他应该显示的数据，就应该用到作用域插槽

    * 1. 给子组件定义一个插槽（slot）,给 slot 标签指定显示内容的属性，传递给父元素，在 slot标签中指定的所有属性都会传递给父组件
    * 2. 父组件接收这些属性，在父组件中定义<template></template>，给template添加一个属性名slot-scope(注意,这个属性名是固定的)，来去指定一个名字接收子组件传递过来的数据
    * 3. 子组件传过来的数据都在你指定的 xxx 对象中，可以通过解构赋值的方式使用，当然也可以不解构赋值直接使用
    * 4. 通过在<template></template>标签中定义内容（例如span），进行条件判断的方式，来让子组件只接收到你能让他接受的数据，之后进行展示

## Vuex通信
* Vuex
1. Vuex是一个专为Vue开发的状态管理模式
2. Vuex是用来管理组件之间通信的一个插件
* Vuex作用
    * vuex用来统一管理多个组件共享的状态数据
    * 在任意两个组件之间都可以进行通信
        * A组件触发actions|mutation调用==>将数据保存到vuex的状态中
        * B组件读取vuex中的state或getters数据,就可以得到最新的数据进行显示
        * 实现任意组件通信
    



# 谷粒商城PC项目笔记
[20200516笔记](http://note.youdao.com/noteshare?id=dda518f74ef97af98494e2e9e3c8ec7a&sub=WEB1779d60d8c17be1469af105199ce0c14)
## 路由跳转以及传参的几个问题汇总
测试
* 路由组件
    * 下载vue-router包（注册使用）
    * 确定整体结构
    * 创建路由器, 配置路由, 配置路由器
* 组件中路由相关的两个对象
    * $router:路由器对象，包含一些路由跳转的方法，如 push()/replace()/back()
    * $route:当前路由信息对象，包含当前路由相关数据的对象：path/name/query/params/meta
* 路由跳转的方式
    * 声明式路由跳转
    ```html
        <!--通过内置标签 router-link 的方式进行声明式跳转-->
        <!--to 属性可以指定要跳转到的路由地址-->
        <router-link to="/xxx"></router-link>
    ```
    * 编程式路由跳转
    ```js
        //通过 vueRouter 的实例对象$router中的 push 或者 replace 的方式编写要跳转的路由地址
        this.$router.push/replace('/xxx')
        //push 和 replace 的区别？
        //push:跳转到指定的路由地址，但这个方法会向history栈添加一个记录，点击后退会返回到上一个页面。
        //replace:同样是跳转到指定的url，但是这个方法不会向history里面添加新的记录，点击返回，会跳转到上上一个页面。上一个记录是不存在的。
    ```
* 路由跳转携带参数的两种类型
    * params 参数
    * query 参数
* 携带参数的两种方式
    * 字符串方式：将参数手动通过拼接字符串的方式添加到地址中传递参数
    ```js
    this.$router.push(`/search/${keyword}?keyword2=${keyword.toUpperCase()}`);
    ```
    * 对象形式(开发中常用方式)：
    ```js
    //第一种对象形式
    
    if (keyword === "") {
         this.$router.push({
           name: "search"
         });
       } else {
         this.$router.push({
           name: "search",
           params: { keyword },
           query: { keyword2: keyword.toUpperCase() }
         });
       }
       
       
    //第二种对象形式
    this.$router.push({
        name: "search",
        params: { keyword: keyword === "" ? undefined : keyword },
        query: { keyword2: keyword.toUpperCase() }
      });
      
    //说白了就是判断 params 形式的传参方式，为空串的话就只返回路由路径，或者是 undefined
    //这样地址栏路径才不会出现问题
    ```
    * 需要注意点：
        * 一旦有带有：的路径配置，就必须指定一个 name
        属性来标识当前路由（给路由起个名字）
        ```js
        {
            name: 'search',  // 是当前路由的标识名称
            path: '/search/:keyword?', //:keyword？相当于占位符
            component: Search,
        }
        
        ```
        * params 只能和 name 组合使用
        * query 可以与 name 或者 path 组合使用
        * 使用 params 方式传递字符串如果是空串的形式在跳转的时候地址栏路径会出现问题
        ```js
            if (keyword === "") { //判断 如果传递字符串是空串
                this.$router.push("/search"); //就不加参数跳转到要跳转的路由地址
            } else {    //否则正常跳转
                this.$router.push(`/search/${keyword}?keyword2=${keyword.toUpperCase()}`
            );
            }
        ```
## 关于vue路由的面试问题汇总
* 面试问题1: 指定params参数时可不可以用path和params配置的组合?
    * 不可以。指定 params 参数必须使用 name 和 params组合，因为不指定 name使用 path 的话地址栏会出现问题
* 面试问题2: 如何指定params参数可传可不传? 
    * path:'/xxx/:keyword?'
* 面试问题3: 如果指定name与params配置, 但params中数据是一个"", 无法跳转
    * 解决方式 1：不指定 params （判断：如果是空串就不指定 params 直接返回路由的路径地址）
    * 解决方式 2：指定params参数值为undefined
* 面试问题4: 路由组件能不能传递props数据?
    * 可以，可以将query参数或者 params 映射成 props传递给路由组件对象，路由组件对象可以通过 props 声明接收参数
    ```js
    	//实现:
    	props: route=>({
    	    keyword1: route.params.keyword, 
    	    keyword2: route.query.keyword 
    	})
    ```
* 面试问题 6: 编程式路由跳转到当前路由(参数不变，重复跳转), 会抛出NavigationDuplicated的警告错误
    * 原因分析：
        * 在 vue旧版本3.1.0 之前的时候，使用$router.push/replace 方法的时候，是没有返回值的，但是在 vue 更新到 3.1.0之后的版本的时候，他增加了 push/replace 方法的返回值是一个 promise 对象，他可以通过参数指定回调函数返回一个成功或者失败的 promise，但是，如果没有指定回调函数返回成功或者失败的 promise 并且内部判断要跳转的路径参数没有变化的的话，就会抛出一个失败的promise，就会导致报错
    * 解决办法
        * 1.在跳转的时候，指定一个成功或者失败的回调函数，通过 catch 来处理错误，就不会报错了
        * 2.修正 Vue原型上的push 和 replace方法
```js
//缓存原型上本来的 push 方法
const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;
//重新指定原型上的 push 方法//三个参数,跳转的路径等信息 成功 promise 失败 promise
VueRouter.prototype.push = function (location, onComplete, onAbort) {
    // console.log('push()', location, onComplete, onAbort)
    //此时 this 指向的是路由器实例对象 $router 
    //如果调用 push的时候,传递了成功或者失败的回调函数
    if (onComplete || onAbort) { //如果已经指定了成功或者失败的 promise 那么就不需要做处理
        //让刚才保存的(原来 vue的) push 方法来处理就行了
        originPush.call(this, location, onComplete, onAbort) //不需要返回,因为执行的结果返回值是 undefined 有没有返回值都一样
    } else {
        //如果调用了 push 但是没有传递成功或者失败的 promise,需要 catch 处理
        //使用 call 方法指定 $router这个实例对象的this来调用函数
        return originPush.call(this, location).catch(e => {
            console.log('catch error') //上面不需要传递另外两个参数,因为本来就是没有指定参数才进到 else 里面
            //这个时候需要返回一个新的状态为 pending 的 promise 对象,这样做是没了中断 promise 链条,后面成功的回调函数就不会被调用
            return new Promise(() => {

            })
        })
    }
}
// replace同理   
 ```
    * 扩展：声明式路由之所以没有这样的问题，是因为默认传入了成功的回调函数
    
## 二层路由及以上刷新丢失reset样式
* 原因分析：
    * 因为我们用的路由模式是history，第一次跳转时没有问题，再刷新时此时加载 css 样式的路径为`http://localhost:8080/search/css/reset.css`，因为我们再根 index 引入的 css 路径为相对路径，但是在刷新之后路径上加了 search,css 文件找的就是 search下的 css,所以找不到，
* 解决：
    * 将 css路径指定为根路径`http://localhost:8081/css/reset.css`，不再是相对路径

## postman测试接口
* 注意的是 POST 请求指定请求参数时候的格式为 json

## axios二次封装
1. 为什么要对 axios 进行二次封装？
    * axios 本身是对原生 ajax（XHR） 的封装,在完成项目的过程中，我们要多次与后台进行交互，为了简化操作，以及在原有基础上添加功能，所以我们要对 axios 进行二次封装
    * 1.配置通用的路径和超时提醒
        * 首先要做的是引入 axios 这个包，其次我们还要做进度条的效果
            ```js
            //下载 axios 依赖包,并引入
            import axios from 'axios'
            //下载进度条的包并引入
            import NProgress from 'nprogress'
            //引入 nprogress的 css
            import 'nprogress/nprogress.css'
            //配置不显示右上角小圆圈,只显示进度条
            NProgress.configure({
                showSpinner: false,
            });
            ```
        * 创建一个新的 axios 实例，使用 create 方法，并创建通用路径,以及超时时间
        ```js
        // 1. 配置通用的基础路径和超时
        //创建一个新的 axios实例,功能和 axios 类似(可以作为函数或者对象发送请求)
        const instance = axios.create({
            //指定一个通用的 url /api
            //如果后台服务器允许跨域可以直接写后台服务器域名端口号
            baseURL: '/api', //由代理服务器转发到http://182.92.128.115/api
            timeout: 15000, //指定处理请求的超时时间
        })
        ```
        * 配置 axios 的请求拦截器以及响应拦截器，将发送的请求进行拦截并处理（响应式添加进度条），再发送给服务器（return config）,等服务器返回相应数据时，再进行拦截，不论成功或者失败，都要关闭进度条，之后再将拦截的数据返回给客户端
        ```js
        //配置 axios 请求拦截器,在发送请求的时候显示进度条
        instance.interceptors.request.use(config => {
            console.log('请求拦截器执行了')
            // 2. 显示进度条
            NProgress.start();
            return config //拦截之后再将数据发送给服务器
        })

        //配置 axios 响应拦截器,在响应成功或者失败的时候先拦截到,然后隐藏掉进度条,再返回数据
        instance.interceptors.response.use(
            response => {
                //拿到响应体数据的时候
                console.log('响应拦截器执行了');
                //不论成功还是失败都要隐藏掉进度条
                NProgress.done(); //隐藏
                // 3 如果成功返回响应体的话,将响应体交给客户端,在这里要做特殊操作,就是本来的 axios 返回的响应体(response)是一整个完成的数据,我们这个时候必须.data 才能获取到真正的响应体数据
                // 所以这个时候我们可以直接拦截到数据返回 response.data 可以简化接下来的操作,很方便
                return response.data; //返回response.data里面的真正数据
            },
            error => {
                //请求体函数的第二个参数(错误)
                //也就是说请求失败的时候返回的错误信息
                console.log('响应体拦截器失败回调执行了') //打印一下
        
                //注意一点就是就算响应失败了,我们这个时候也要将进度条隐藏掉
                NProgress.done();
        
                //可以处理错误,也可以不处理,在这里就简单的 alert 提示一下
                alert(`请求失败:${error.message || '未知错误'}`);
        
                //返回一个失败的 promise 防止下次执行变成成功的 promise
                return Promise.reject(error)
            })

        ```
        * 需要注意的点就是，我们封装好的 axios （假如成功）会直接返回response.data 里面的数据，而不再是 response 里面的数据了，其次就是在响应失败的时候，我们要返回一个失败的 promise 传入错误信息，防止再进行请求的时候，变为成功的promise（因为除了返回失败的 promise，其他类型的值都被看做是一个成功的 promise）
        * 接下来就是要将新创建的 axios 暴露出去
        ```js
        //向外暴露封装好的instance
        export default instance
        ```


2. 请求接口时可能会出现的问题
* 404 错误
    * 没有后台服务器处理（找不到服务器）
        * 当前的axios 请求配置的地址为/api/product/getBaseCategoryList'，
        * 当前发送请求所在的地址为http://localhost:8080/，
        * 最终ajax 请求的地址就是http://localhost:8080/api/product/getBaseCategoryList
    * 解决办法
        * 1.手动将baseURL 配置为后台服务器的地址http://182.92.128.115/api
        但这样做的前提是服务器允许跨域
        * 2. 使用代理服务器间接发送到目标服务器，再有代理服务器返回数据
        ```js
        //配置baseURL: /api
            //配置代理: vue.config.js中
                devServer: {
                    proxy: { // 配置代理
                    '/api': { // 只处理以/api开头的请求
                        target: 'http://182.92.128.115', // 转发的目标地址
                        changeOrigin: true // 支持跨域
                    }
                }
        ```
## vuex 的多模块编程
* vuex 的基本使用：
    * 成员列表
        * state 存放状态
        * mutations state成员操作
        * getters 加工state成员给外界
        * actions 异步操作
        * modules 模块化状态管理
* 多模块编程
    * 每个模块进行拆分，数据单独管理，更加方便
    * vuex多模块 state 数据结构
    ```js
    {
            user: {
                userInfo: {}
            },
            home: {
                baseCategoryList: []
            }
        }
    ```
    * vuex 与 API 进行交互的流程
        * 异步action: 调用api接口请求函数  ==> 成功之后commit  ===> 调用mutation  ==> 更新状态数据
## TypeNav动态显示分类列表
1. 在mounted()中分发请求数据的异步action
        `this.$store.dispatch('getBaseCategoryList')`
2. 利用mapState()将state中的分类列表映射成计算属性
* `mapState(['xxx'])`: 映射总state的直接属性xxx成为xxx计算属性
* `mapState({xxx2: 'xxx'})`: 映射总state的直接属性xxx成为xxx2计算属性
* `mapState({categoryList: state => state.home.baseCategoryList})`:  映射home子模块的baseCategoryList属性成为categoryList计算属性
3. 模板中显示数据
* 利用 v-for和{{ }} 显示数据

## TypeNav交互功能
* 使用事件操作二级、三级菜单的显示隐藏
    * 绑定事件
        * 使用 mouseenter 和 mouseleave
    * 思路:
     1. 改变下结构,使商品列表的 div 和菜单 div 被同一个 div 包括
     2. 鼠标移入(包括移入商品列表)之后显示,鼠标离开大的 div(包括商品列表)之后隐藏,切换类名的方式显示隐藏三级菜单设置初始值(没有移入的时候),设置为-1,移入之后currentIndex变成对应的 div 的下标
     3. 这样做固然可以,但带来的问题就是快速移动造成的卡顿现象
     4. 利用 lodash的throttle函数进行节流处理延迟时间再进行切换类名
     5. 带来的问题就是鼠标已经离开大的 div 但是这个时候,延迟时间还没到,就还是会执行之前节流要生效的函数(也就是移入时件)
     6. 所以我们现在的思路是初始值currentIndex设置为-2(代表完全没移入的时候),当移入包含商品列表和菜单的 div 时,值变成-1,离开变成 -2
     7. 当currentIndex这个值为-2 的时候 return不去执行下面的更新下标操作,就可以解决变成-1 才能改变菜单下标index的值,-2之后不能改变
     ```html
     <!--外层最大 div 嵌套上边<p>全部商品分类</p> 以及菜单-->
     <div @mouseleave="hideCategorys" @mouseenter="showCategorys">
     <!--为真时显示，假时隐藏-->
     <div class="sort" v-show="isShowFirst">
     ```
     ```js
      data() {
        return {
          currentIndex: -2,   //初始数据
          isShowFirst: false  //初始状态
        };
      },
     
     //隐藏分类列表函数
    hideCategorys() {
      //和之前的逻辑一样 当完全移出(也就是 currentIndex === -2)的时候 就是隐藏
      this.currentIndex = -2; //给data 里 currentIndex数据赋值-2代表隐藏
      if (this.$route.path !== "/") { //判断路由路径 !== '/'
        this.isShowFirst = false; //就隐藏
      }
    },

    //显示分类列表函数
    showCategorys() {
      //移入显示就是之前逻辑
      this.currentIndex = -1;
      this.isShowFirst = true;
    },
     ```
## lodash库按需引入
* `import throttle from 'lodash/throttle'  // 只引入我需要的工具函数`

## 使用编程式导航代替声明式减少组件对象的数量
* 使用声明式导航跳转到 search 组件的话，分类列表中的每一个列表都要生成一个 router-link组件对象，造成显示缓慢，卡顿的现象
* 使用编程式导航，不用创建多个路由组件对象

## 使用事件委派进一步优化
* 上面提到编程式导航，首先想到的是给 a 标签绑定事件，也是会绑定多个事件，性能上也不是很好，这个时候就要想到事件委派
* 说到事件委派，这个时候有一个问题就是传递参数，我们需要在用户点击之后跳转到指定 search 页面，同时传递用户点击时对应的参数，每一个按钮参数都是不一样的
* 标签属性传递参数：
    * 指定标签属性：固定格式`data-xxx`
    * 给对应的 a 标签添加自定义属性
    * 使用 event 事件对象的 target.dataset方法获取标签对应的自定义属性
    ```html
    <a href="javascript:;"
       :data-categoryName="c1.categoryName" 传入当前菜单名字
       :data-category1Id="c1.categoryId"   传入当前菜单 id
      >{{c1.categoryName}}</a>
    ```
    ```js
    const {  //利用解构赋值拿到event.target.dataset中对应的属性
        categoryname,
        category1id,
        category2id,
        category3id
      } = event.target.dataset;
    ```
    * 1. 判断categoryname是不是有值，因为通过事件委派的方式，必须判断用户是不是点击的菜单，可能用户点击的是其他位置，这个时候categoryname是没有值的
    * 2. 注意一点就是属性名在event.target.dataset中，不管之前是大写还是小写，都会转换成小写
    * 3. 准备 query 参数`const query = { categoryName: categoryname };`
    * 4. 判断用户的点击有没有对应的 id值，如果1id 为真就说明用户点击了一级菜单，以此类推
    * 5. 将结果为真（也就是用户当前点击的 a 标签的自定义属性值）添加到之前准备好的 query 参数对象中
    ```js
    //判断应该存在的分类项 存在是有值的 不存在是 undefined 为假
      if (categoryname) {
        //指定 categoryname 的 a 属性才进入判断
        //准备 query 参数对象
        const query = { categoryName: categoryname };
        //判断点击的a 标签 id 是1 || 2 || 3 为真说明就是点击 id
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
    ```
    * 1. 定义路由跳转的 location 对象，将之前获取到的 query 参数添加到 location 对象中
    * 2. 获取 params 参数，根据分类菜单搜索时也要携带输入框中的 params 参数，前提是有params 参数
    * 3. 判断有没有 params 参数，如果有，直接添加到 location 对象中
    * 4. 跳转到 search 页面
    * 5. 跳转之后隐藏掉菜单列表（之前定义好的方法）
    ```js
    //定义路由跳转的 location 对象
        const location = {
          name: "search",   //使用 name 配合 params 参数传递
          query //将之前获取到的 query 参数添加
        };

        //获取 params 参数对象
        const { keyword } = this.$route.params;
        //根据分类搜索时,也要携带关键字搜索 params 参数,当然,前提是 keyword 有值
        if (keyword) {
          //判断是否有值,如果有值,将值添加到 location 对象中
          location.params = { keyword }; //解构赋值写法 相当于 keyword:keyword
        }

        //跳转到 search
        this.$router.push(location); //传入之前定义的 location 对象就可以(包含地址和参数)

        //跳转之后隐藏以及列表 正好调用之前定义的方法 hideCategorys
        this.hideCategorys();
    ```
## 一级列表显示隐藏的过渡效果
* 用<trasition name="xxx">包含显示隐藏的标签
* 在特定类名下指定过渡样式
* 在特定类名下指定隐藏时样式


## 优化请求执行的位置, 减少请求次数
* 问题：在 App 组件中定义请求执行,因为如果在 TypeNav中请求的话三级列表,跳转到 serach 页面就又会请求再一次加载请求列表
* 原因: 因为在 TypeNav 中定义了Ajax请求,然后我们在 home 组件进行引入,又在 search 中引入,相当于是调用了两次 
            当点击跳转的时候,首先 home 中的子组件 TypeNav 会死亡,之后加载 search 中的 TypeNav 组件,就又一次发送了请求
* 解决:所以我们现在找一个公共组件 App.vue 当页面加载的时候到页面关闭或者刷新都是活着的 在这里面发送请求会减少向服务器发送请求的次数,增加用户体验的同时,降低了服务器压力
```js
//通过 vuex 异步 action 获取数据到 vuex 的 state 中进行管理
this.$store.dispatch("getBaseCategoryList");
```
## Moke模拟请求数据接口
* 问题: 首页只有分类的接口, 其它数据接口还没有写好
* 解决: 需要我们前台工程自己在前台mock数据
    * 下载mockjs
    * 引入mockjs得到Mock
    * mock接口: Mock.mock('/mock/xxx', {code: 200, data: banners/floors})
    * mockAjax: 指定baseURL为/mock
    * api/index.js: reqBanners = () => mockAjax('/banners')
    * 在组件中调用测试: reqBanners()

## Mock 接口的 vuex
* home.js管理状态
    * mutation 添加规则
    ```js
    mutations:{
        /* 
    接收保存新的轮播数组
    */
    RECEIVE_BANNERS (state, banners) {
      state.banners = banners
    },
    /* 
    接收保存新的楼层数组
    */
    RECEIVE_FLOORS (state, floors) {
      state.floors = floors
    },
    }
    ```
    * actions发送异步请求获取数据
    ```js
    /* 
    获取分类列表的异步action
    */
    async getBaseCategoryList ({commit}) {
      // 1. 发异步ajax请求
      const result = await reqBaseCategoryList()
      // 2. 成功后, 提交mutation保存数据
      if (result.code===200) {
        const baseCategoryList = result.data
        commit('RECEIVE_BASE_CATEGORY_LIST', baseCategoryList)
      }
    },
    ```
## 先实现轮播的静态页面
* 下载swiper: npm install -S swiper
* 引入swiper: js/css

## 解决多个swiper效果冲突的问题
* 问题: 针对某个swiper界面创建一个swiper对象, 它会影响了其它界面的swiper界面
* 原因：因为实现轮播效果的实例对象 Swiper ,在声明选择器的时候使用的是`new Swiper ('.swiper-container')` 我们三个轮播组件都是用这个类名，所以就会出现冲突
* 解决：使用 vue 提供的 ref 属性，给标签定义一个唯一标识，然后使用 `this.$refs.swiper`来声明选择器，这样就不会出现多个轮播效果冲突

## 解决swiper动态页面轮播的bug
* 问题：轮播图正常引入，数据正常获取，但是没有效果
* 原因：因为 Swiper 组件对象创建规定必须是在页面创建之后，但是我们数据是异步获取，再加上是在 mounted 中使用 new Swiper，也就是说页面还没有加载完成，就已经创建了 Swiper 实例对象
* 解决：
    * 方法 1：给创建Swiper实例对象的 new Swiper 添加定时器
        * 但是这种方法明显不可取，定时器定多长时间？都是未知数，你也不知道用户这个加载页面请求要多久才能响应，时间长了有问题，时间短了更有问题
    * 方法 2：watch(监视属性) + $nextTick() 方法
        * 通过 watch 能知道轮播数据发生变化了（数据已经加载完成）
        * 通过 $nextTick(callback)知道界面也更新了（页面更新之后的延迟回调）
        * 在 $nextTick 里创建实例
        ```js
        
         /* 
          监视属性,监视 carouselList 这个数组的变化,当 carouselList 从[]变成[...]的时候触发函数
          注意:
        1. 默认初始时这个监视属性不调用,当监视属性监视到 carouselList 改变时才会调用
        2. 只要更新了数据, 界面就会自动更新(我们称为数据绑定),但是<vue更新界面是异步的>
            我们更新了数据==>立即同步调用监视属性的回调函数(此时界面还没有更新,列表数据还没有显示)==>异步更新页面
            所以我们就需要在 carouselList 这个监视函数中 增加一个新东西 nextTick()
            nextTick(()=>{}) ==>  他指定的回调函数是在数据更新导致页面更新完成后自动进行调用执行的
        */
        watch:{
            this.$nextTick(() => {
                //this.$nextTick   在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
                this.initSwiper(); // 延迟回调之后加载,用 this.$next 包裹创建 Swiper 对象可以使 Dom 加载完成之后调用创建对象(延迟加载),获取更新后的 DOM
            });
        }
        ```
        * 理解更新数据/调用监听回调/更新界面的流程
        我们更新了数据 ==> 立即同步调用监视的回调函数(界面还没有更新, 列表数据还没有显示)  ==> 异步更新界面
    理解nextTick()
        // nextTick()需要在数据更新之后界面更新前调用
        // 指定的回调函数什么时候执行: 这次数据更新导致的界面更新完成后立即执行
        Vue.nextTick(callback)
        vm.$nextTick(callback)

## 封装轮播组件，便于复用(因为代码几乎一致，就是数据不一样)
* 抽取轮播的模板部分
    ```html
    <template>
      <!-- <div class="swiper-container" id="swiper"> -->
      <div class="swiper-container" ref="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in carouselList" :key="item.id">
            <img :src="item.imgUrl" />
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
    
        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
    </template>
    ```
* 抽取轮播的JS部分
 ```js
  methods: {
    // 创建 swiper 实例对象:必须在列表时局显示之后创建才有正常的轮播效果
    //swiper 实例必须在页面加载成功之后再去实例化才能使用,如果页面还没有加载出来,就已经生成了 swiper 的实例,那么这个时候就没有轮播图
    initSwiper() {
      new Swiper(this.$refs.swiper, {
        //使用 this.$refs 唯一标识符标识这个轮播图的区域
        // direction: 'horizontal', // 水平切换, 默认就是这个值

        loop: true, // 循环模式选项

        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination"
        },
        autoplay: {
          delay: 2000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        // 如果需要前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      });
    }
  }
 ```
* 声明接收轮播的数组数据属性: carouselList,组件进行实例化的时候可以通过标签属性的方式传递数据
 ```js
 props: {
    carouselList: Array
  },
 ```
## 解决Floor组件中轮播有问题的bug
* 问题: banners的轮播可以, 但2个Floor的轮播都没有效果
* 原因
```js
/* 
原因:
  1. 给标签传入的'属性'是空数组/undefined的时候,组件对象还是会创建,但是如果是用过 v-for遍历一个空数组或者 undefined 来产生多个标签的时候,组件对象是不会创建的
  2. watch 默认的规则是:初始创建显示的时候不会执行,只有在数据改变的时候才会执行
      先说 banners 为什么可以有轮播效果?
        1). 首先 banners 一开始是个空数组,上面说过了,给组件对象传递一个属性的时候,就算是个空数组/undefined,它组件对象该创建还是会创建,并不会影响什么
            接下来,上面也说过了,初始创建显示的时候,默认情况下并不会去执行watch监视属性(里面的回调函数),当 banners 请求返回结果变成了一个有值得数组的时候
            这个时候代表的是数据改变了,监视属性就会监视到,进而就回去执行里面的回调函数,从而去创建 Swiper 的实例对象,这也就说明了问什么 banners 的轮播有效果

        2). 其次说的是 floors ,这个数组一开始也是一个空的数组,并且,他是通过v-for遍历 floors数组 去创建floor 这个组件对象的
            []==>[{floors1},{2}],这个时候上面说过了,在创建组件对象的时候,他还是一个空数组,自然是遍历不到数据的,当然,也就不会产生组件实例对象,所以这个时候 <Floor/>
            组件还没有产生
            当请求返回数据的时候,本来是空的数组,有了两个对象,'楼层 1' 和'楼层 2',这个时候已经创建了 Floor 的组件对象,Floor 的组件对象中又有轮播的组件 Carousel,自然也会同时创建,想当于只要创建了楼层组件对象,就会创建轮播组件对象
            但是!!!!注意,之前说了,初始化创建的时候,并不会执行监视属性,更不会去创建 Swiper 的组件对象,但是很遗憾,已经错过了,数据已经存在了,不会再改变了,所以就不会再触发监视属性了,自然轮播图效果也不会有

        3). 解决方法:
            1. 解决方法很简单,只要是 floor 组件对象创建完成之后,也就是页面更新之后,手动调用一次创建 Swiper 对象
            2. 初始化 watch 监视属性的时候,就让他先执行一次,这样也可以

            1==> 在 mounted 生命周期函数中,判断 floors 数组(有数据的时候,就去创建 Swiper 实例对象)
            2==> 在 给 watch 制定两个配置
                  1. handler:判断如果有数据,延迟创建 Swiper 对象
                  2. inmediate:指定为 true,表示在初始显示之前就会调用一次
                
解决:
    办法 1: mounted() + watch 回调
        判断floors 是否已经有数据,有的话就立即创建 swiper 对象
        watch 回调:判断如果有数据,演示创建 swiper 对象
    办法 2:watch
        给 watch 制定两个配置
        handler:判断如果有数据,延迟创建 swiper 对象
        immediate:指定为 true,久是在初始显示之前就会调用一次监视属性
    */
    // 方法二

    carouselList: {
      /* 
        使用 watch监视属性handler方法创建 Swiper
        之后有一个immediate属性,为 true 会在初始化显示的时候立即调用回调函数一次
      */
      handler(value) {
        if (value.length > 0) {
          this.$nextTick(() => {
            //this.$nextTick   在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
            this.initSwiper(); // 延迟回调之后加载,用 this.$next 包裹创建 Swiper 对象可以使 Dom 加载完成之后调用创建对象(延迟加载),获取更新后的 DOM
          });
        }
      },
      immediate: true
    }
    //方法一:

   mounted() {  //floos 通过mounted生命周期创建的 Swiper
     if(this.carouselList.length>0){  //必须判断 数据列表长度>0 说明已经有数据了
       this.initSwiper() //这个时候就应该直接创建 Swiper 对象
     }
   },
   ```
    
## 实现search组件

### search组件的动态展示
* 定义api发送ajax请求  请求地址：/list
```js
//search组件请求 相关配置
//根据搜索的条件参数对象获取商品列表数据   
export const reqProductList = (searchParams) => ajax({
url: '/list',    //请求地址url
method: 'POST', //请求的类型
data: searchParams //携带参数
})
```
* 使用vuex模块化方式管理请求状态,定义state/mutations/actions/getter
* 使用dispatch()获取数据以及扩展函数...mapState()获取状态数据
* 搜索条件和参数
```js
data() {
    return {
      //定义所有 search 的请求参数的数据配置对象
      options: {
        category1Id: "", // 一级分类ID
        category2Id: "", // 二级分类ID
        category3Id: "", // 三级分类ID
        categoryName: "", // 分类的名称
        keyword: "", // 关键字keyword
        trademark: "", // 品牌:格式    "ID:品牌名称"
        props: [], // 商品属性的数组: ["属性ID:属性值:属性名"] 示例: ["2:6.0～6.24英寸:屏幕尺寸"]
        order: "1:desc", // 排序方式  1: 综合,2: 价格 asc: 升序,desc: 降序  示例: "1:desc"
        pageNo: 1, // 当前页码
        pageSize: 10 // 每页数量
      }
    };
  },    
```
* 根据共享组件TypeNav菜单按钮方式访问Search组件，或者keyword关键词进入搜索组件,或者直接访问search组件
* 分类
    * ==> query参数：category1Id/category2Id/category3Id/categoryName
    * ==> params参数：keyword
* 定义根据query和params参数来发送请求更新数据时候的方法
```js
updateOptions() {
      //根据 query 和 params 参数更新options
      const {
        //利用解构赋值,将$route 里面的 query 参数的值结构出来
        categoryName,
        category1Id,
        category2Id,
        category3Id
      } = this.$route.query;
      //同样利用解构赋值,将$route 的关键字 params 参数解构出来
      const { keyword } = this.$route.params;
      //取到 params 和 query 的参数值之后,添加到 data 中定义的 options 对象里面
      this.options = {
        ...this.options, //扩展运算符,除了咱们要修改的属性,其他属性也一并添加进来 ,方便函数复用
        category1Id,
        category2Id,
        category3Id,
        categoryName,
        keyword
      };
    },
```
* 在beformount()生命周期函数中创建初始化组件数据
```js
  //定义初始化异步更新 data 中的数据
  beforeMount() {
    this.updateOptions(); //调用定义的更新options数据的方法 
  },
```
* 在mounted生命周期函数中定义异步更新时候的发送请求(本身访问search组件或者没有请求参数的情况下发送异步请求更新代码)
```js
  //定义初始异步更新的代码
  mounted() {
    //在初始化搜索组件的时候,异步更新
    // console.log("1111");
    this.$store.dispatch("getProductList", this.options);
  },
```
### 相同路由跳转，路由组件对象不会重新创建
* 问题：如果当前已经在Search组件中，在通过搜索按钮或者分类菜单按钮来跳转到search组件，应该重新获取数据，为什么没有？
* 原因：当前在A组件，跳转到A组件的时候，路由组件对象是不会重新创建的,从而就不会执行初始化生命周期函数中的请求代码，所以数据不变，以为根本没有发送请求
* 解决：这个时候就应该想到监视属性，监视路由对象$route的变化，同组件跳转的时候$route是重新产生，之后再根据所对应的query参数以及params参数更新options对象的数据就可以了
```js
  //只是这样定义了方法还是不够的,相同路由重复点击不更新数据，应该定义监视属性,监视到路由发生跳转时,参数发生变化的时候更新options的数据,还要更新页面重新请求数据
  watch: {
    //当路由跳转时只有路由传参数发生变化的时候
    $route() {
      this.updateOptions();
      //请求数据,再次调用接口
      this.$store.dispatch("getProductList", this.options);
    }
  },
```
### 根据分类和搜索关键词进行搜索
* 删除分类和关键词的条件
    * 给对应的数据显示的删除按钮绑定点击事件，定义方法
    * 修改options对象中对应的数据为空串，就可以做到删除
    * 但是这个地方必须重新发送请求获取最新数据
* 问题1
    * 问题：删除分类菜单的数据以及关键词的数据之后，为什么地址栏还是有数据显示？
    * 原因: 删除条件的时候，并没有做更新query或者params参数的，也就是没有修改路由参数数据
    * 解决：删除分类数据的时候，不再携带query参数，只携带之前的params的参数就可以，删除params是一个道理
```js
    //移除关键字
    removeKeyword() {
      //将配置对象关键字置为空
      this.options.keyword = "";
      //重新发送请求,获取最新数据
      // this.$store.dispatch("getProductList", this.options);
      //重置跳转到当前路由,不再携带 params 参数,只携带原来的 query 参数
      this.$router.replace({ name: "search", query: this.$route.query });
      //通知 header 组件也删除输入的关键字
      //在 search,通过实践总线对象分发事件
      this.$bus.$emit("removeKeyword");
    },
    
    
    removeCategory() {
      //重置分类的条件数据
      this.options.categoryName = ""; //将名字置为空
      this.options.category1Id = ""; //将一级 id 置为空
      this.options.category2Id = ""; //将二级 id 置为空
      this.options.category3Id = ""; //将三级 id 置为空
      //重新获取数据

      // this.$store.dispatch("getProductList", this.options); //这样不行
      //重新跳转到当前路由,不再携带 query 参数,只携带原本的 params 参数
      this.$router.replace(this.$route.path); //$route.path 不带 query 参数,但是带有 params 参数(如果存在)
    },
```
* 问题2
    * 问题：删除关键字的时候，搜索框input没有同步更新，还是原来数据不变
    * 原因：两个组件Header和Search之间没有建立联系，无法操作input框中的数据
    * 解决：
        * 定义全局事件总线，在vue的原型上（prototype）添加$bus对象
        * Search组件分发事件，Header组件通过事件总线对象绑定事件来接收消息
        * 这个时候两个组件之间就会建立联系，修改数据的时候就会更新数据
```js
//在 search,通过实践总线对象分发事件
this.$bus.$emit("removeKeyword");


  mounted() {
    //在 header 组件,通过时间总线对象绑定事件监听来接收消息,然后更新数据
    this.$bus.$on("removeKeyword", () => {
      this.keyword = "";
    });
  },
```
* 问题3
    * 问题：从Home组件跳转到Search组件的时候在Search界面的时候，多次进行搜索，之后在浏览器点击回退按钮的时候不能直接回退到home组件，而是显示上次搜索的内容
    * 原因：因为路由跳转的时候全部用的是push方法，push方法会记录每次一上一层的页面，从而回退
    * 解决：在Home跳转Search的时候使用push方法，在Search组件内部跳转的时候使用replace的方法
```js
//跳转到 search
  //新增:如果当前在 search 组件,使用 replace()的方式跳转.如果不是,就是用 push 的方式跳转
  if (this.$route.path.indexOf("/search") === 0) {
    //说明在 search 组件,使用 replace 的方式
    this.$router.replace(location);
  } else {
    this.$router.push(location);
  }
```
* 问题4
    * 问题：在点击搜索按钮的时候页面自动跳转了，但是参数不对了
    * 原因：form自动提交表单
    * 解决：绑定事件的时候设置.prevent的方式禁止浏览器默认行为
```html
<form action="###" class="searchForm">
  <input
    type="text"
    id="autocomplete"
    placeholder="请输入关键字搜索"
    class="input-error input-xxlarge"
    v-model="keyword"
  />
  <button class="sui-btn btn-xlarge btn-danger" @click.prevent="search">搜索</button>
</form>
```
### 根据品牌名字进行搜索
* 子组件：绑定事件监听，让父组件去更新options对象中的数据中的props属性值，更新的值（该更新的数据）由子组件来传给父组件，（子组件向父组件进行通信）
* 父组件：定义更新数据的方法，接收子组件传来的值，之后重新发送请求获取最新数据

### 根据商品属性进行搜索
* 子组件：绑定事件监听，传入点击时候的参数，让父组件去更新options对象中的数据中的props属性值，更新的值由子组件来传给父组件，（子组件向父组件进行通信）
* 父组件：定义更新数据的方法，接收子组件传来的值，之后想props数组后（push方法）添加对应的值 `属性id:属性值：属性名`
    * 注意：
        * 有可能不需要再添加了（之前用户已经点击过对应的商品属性了），这个时候用到数组的splice方法，判断是不是!==-1(如果是不等于-1的情况下，就说明用户之前并没有点击过，如果不是就说明之前已经添加过了)

## 响应式数据对象
* 什么是响应式?
    * 响应式,data或者state中的数据/对象,内部所有层次的数据在更新的时候,所对应的界面就会自动更新,这就是响应式
* 给响应式对象添加新的属性
    * 错误方式:
        * this.xxx.a = 'b' ==>这样添加新的属性和属性值,不会是响应式的数据,也不会自动更新界面
    * 原因:
        * vue内部没有对添加的属性进行监视(挟持)操作,没有对象的setter监视
    * 正确的方式:
        * 通过Vue的实例对象vm中的$set方法添加:`vm.$set('target(目标对象),key,value')`
        * 通过Vue构造函数中的set方法添加:`Vue.set('target','key','value')`
* 给响应式的对象删除属性
    * 错误方式:
        * 直接删除 : `delete this.options.xxx` ==> 不是响应式的数据,不会自动更新数据
    * 原因:
        * Vue内部给响应式属性添加的setter,只能监视属性值的变化,不能监视属性的删除
    * 正确方式:
        * 通过Vue的实例对象vm中的$delete方法 `vm.$delete(target,key)`
        * 通过Vue构造函数中的delete方法添加:`Vue.delete(target,key)`
## search组件的排序功能
* 首先查看api文档中排序请求返回的数据结构
* 根据文档可知,数据结构为: 1:desc  2:asc
### 哪个排序项被选中?
* 排序:
    * order数据的结构
    * 组成:orderFlag:orderType
* 例子:
    * 综合:
        * 1:desc(orderFlag:orderType)
        * 1:asc
    * 价格:
        *2:desc
        *2:asc
* 思路:
    * 哪个排序项选中?
        * 根据当前order中的orderFlag来确定 1就是综合 2就是价格
        ```html
        <li :class="{active:isActive('1')}" @click="setOrder('1')"> // 为active定义方法,将当前对应的orderFlag传入 (绑定点击监听同理)
          <a href="jacascript:;">
            综合
            <i class="iconfont" :class="orderIcon" v-if="isActive('1')"></i>  //升序降序的小图标 传入当前对应的orderType
          </a>
        </li>
        ```
        ```js
        //当前点击的排序项(综合/价格)
        //判断传入的值orderFlag的排序项是不是当前项
        isActive(orderFlag) {
          return this.options.order.indexOf(orderFlag) !== -1; //返回布尔值,用于判断active类名加给哪个元素 //将传入的值和options对象中的orderFlag对比,使用indexOf方法,如果是对应的值就会返回其对应的下标,如果没有就是-1
        },
        ```
* 根据哪个排序项进行什么方式排序?
    * 哪个排序项? 根据当前order中的orderFlag来确定,判断如果是1就是点击'综合'排序,如果是2就是给'价格排序
    * 什么方式排序? 根据当前order中的orderType来确定,判断是desc就是降序,asc就是升序 
* 点击切换排序项和排序方式
    * 点击当前排序项:切换排序方式后进行搜索  desc的话换成asc  asc的话换成desc
    * 点击不是当前排序项的话:切换成其他的排序项,排序方式为降序  //判断orderFlag
```js
 //点击切换升降序
    setOrder(flag) {
      //flag = 0/1
      //思路:
      //需要得到的是之前的orderFlag和之前的orderType,然后根据flag的值修改
      let [orderFlag, orderType] = this.options.order.split(":"); //使用数组的split方法按照':'进行拆分,前面为当前的排序项,后面为当前排序方式
      // console.log(orderFlag,orderType)
      //点击当前排序项的时候修改数据
      //判断如果当前点击的是同一个选项修改他的箭头(升降序),如果不是就切换当前选项,修改为降序
      if (flag === orderFlag) {
        orderType = orderType === "desc" ? "asc" : "desc";
      } else {
        //点击的不是当前选项
        orderFlag = flag; //切换orderFlag为当前传入的flag的值
        orderType = "desc"; //修改为降序
      }
      //将新order的值传给options,重新发送请求
      this.options.order = orderFlag + ":" + orderType;  //重新拼接最新的flag和type 
      //重新发送请求,刷新页面
      // console.log(orderFlag, orderType);
      // this.$store.dispatch("getProductList", this.options);
      // this.getProductList();
    },
```
## 难点:分页选项
* 自定义可服用的组件的基本步骤
    * 首先先实现静态的模板
    * 设计要从外部接受的数据(props)
        * currentPage: 当前页码
        * pageSize: 每页数量
        * total: 总数量
        * showPageNo: 连续数码数
    * 设计内部包含的数据(data)
        * myCurrentpage:当前页码(当前页码可以从外部传入,当然内部也需要定义,将外部传入的数据作为当前页码的初始值)
        * 设计基于props和date的计算属性
* 总页数的计算:
```js
    totalPages() {  //定义总页数方法
      //求总页数  就是商品总数量/每页显示商品的数量
      const { total, pageSize } = this; //将组件实例对象中的total和pageSize解构出来
      return Math.ceil(total / pageSize); // 向上取整
      // 为什么要向上取整?
      // 1.假设总数量是 10 ,每页商品数量是3  求总页数就是 10/3 = 3.333 但是你不可能只显示3页,就算最后一页只有一个商品,也算一页,所以要向上取整
    },
```
* 计算连续页码start(开始页)和end(结束页)==>例如1...2[3]4...
```js
    /* 
      计算连续页码start(开始页)和end(结束页) 例如 1 ... 2[3]4 ...
      思路:
        定义一个对象,假设里面存储{start:2,end:4}
        statr最小值应该是1  [1] 2 3 
        end最大值应该是totalPages (上面计算出来的总页数)
      依赖数据应该有:
        myCurrentPage(定义的当前页码的初始值) / showPageNo(当前连续页码数) / totalPages(上面计算出来的总页数)
    */
    startEnd() {
      //先定义准备好start和end
      let start, end;
      
      //取出依赖数据
      
      const { myCurrentPage, showPageNo, totalPages } = this; //利用解构赋值,值通过porps已经声明,都在组件的实例对象里面
      //*********** 计算start(起始页)
      
      /* 
        举例:
            myCurrentPage,        showPageNo,           totalPages
          2(当前默认初始页)        3(连续页码)           8(总页码)   现在我们想要的就是 ==> 1[2]3  
          所以当前的算法应该就是:
          起始页(start):
              初始页(2) - 向下取整 ( 连续页码 / 2 )  // 2 - 3/2 = 1 (起始页)
      
      */
      
      start = myCurrentPage - Math.floor(showPageNo / 2);  //初步求出起始页的对应的值
      
      // 到这里我们发现还是有新问题:如果当前是下面这种情况的话
      // 举例:
      /* 
          myCurrentPage, showPageNo, totalPages
                2           5            8         当前应该显示的是  1 [2] 3 4 5 
      
          按照上面算法 2(初始页) - 5(连续页) / 2 = 0  
          
          算出来是0 ,但是我们是没有第0页的,所以这种情况,我们还需要'修正'起始页的值
          
          思路
          假如算出来是0,或者小于0,就让起始页的值为1
       */

      if (start < 1) {
        //如果start的值小于1 (0以下)
        start = 1; //就将start的值改为1(修正起始页最小为1)
      }
      //*********** 计算end(末尾页)
      /* 
         myCurrentPage, showPageNo, totalPages
                4           5            8         当前应该显示的是  2 3 [4] 5 6
        现在的算法应该是:
        末尾页 = 起始页(4-2 = 2) + 5(连续页) - 1 == 6 (末尾页)  
      */
      //初步算法
      end = start + showPageNo - 1; //2 + 5 - 1 == 6
      /* 
        问题:
         myCurrentPage, showPageNo, totalPages
              7             5          8        当前应该显示的是   4 5 6 [7] 8
        按照之前的算法:
        末尾页 = 起始页(7 - 2 = 5) + 5(连续页) - 1 == 9  但是现在末尾页最大是8 所以应该修正算法
        当 > 8 的时候 = 8 
        
        又有新问题来了 start 的其实值现在有不对了 
        新算法,根据连续页码来修正起始值 
        末尾页(8) - 连续页(5) + 1 (就是说连续显示5页,就应该减去 4 ,因为45678   4==>8 只有4页)
      */
      if (end > totalPages) {
        end = totalPages;
        start = totalPages - showPageNo + 1;

        /* 
          新问题又来了:
           myCurrentPage, showPageNo, totalPages
              3              5            4           应该显示的是 1 2 [3] 4
          末尾页 (3 + 5 - 1 ) > 4 修正为 4      
          当末尾页 > totalPages的时候,修正为totalPages
          那么就应该修正起始页
          4(totalPages) - 5(showPageNo) + 1 = 0  //很明显 0 是不对的
          所以还是要判断 如果起始页为0的话,修正起始页
        */
        if (start < 1) {
          start = 1;
        }
      }
      //返回起始页和末尾页
      return { start, end };
    }

```

## 根据props和data数据和computed进行动态显示
*  `:disabled="xxx"`: 控制是否能操作,比如:当前在第一页不能点击上一页(最后一页同理),点击当前页不能点击
*  `v-if="yyy"`: 控制是否显示,比如...的符号,当前必须起始页大于1,小于末尾页1 才可以显示
*  `v-for="end"`: 遍历显示多个数值,遍历不仅能遍历数组,对象还能遍历number,这个时候和v-if进行配合,遍历优先级比对象高,遍历一个就进行判断,是不是符合要求

## Detail组件静态路由组件
* 定义静态组件
* 注册路由规则
* 通过编程式路由或者导航式路由都可以绑定路由跳转
* 怎样让路由跳转之后,滚动条自动回到初始位置?
     ```js
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }  // 在跳转路由时, 滚动条自动滚动到x轴和y轴的起始位置
    } 
    ```
## 错误: "TypeError: Cannot read property 'category1Name' of undefined"
* 说明: 不能在undefined上读取xxx属性
* 原因: 三层属性直接读取,第一层对象/数组开始是空的{},但是在读取第二层属性就是undefined,在读取第三层属性就报错
* 解决办法1:
    * v-if判断,有值了在进行下一步,也就是说,当前没值的时候,不解析模板,等到有值的时候在解析
        * v-show是不行的,他该解析模板还是会解析,因为v-show内部使用display:none完成的,只是不显示
* 解决办法2:
    * 利用vuex的getters计算属性,来处理返回的对象,使用...mapGetters扩展出来就可以了,在gettres计算属性当中,进行判断,如果有值就返回值,如果没有值就返回{}/[]
## 放大镜组件
* 通过vuex的dispatch获取到后台的图片,动态显示
* 布局: 
    * 左边: 
     `<img>: 中图
        event <div>: 用来绑定响应mousemove
        mask <div>: 随着鼠标移动的遮罩   字的尺寸是div的1/4`
    * 右边:
        `<div>: 包含大图img, 与左侧尺寸一样
        <img>: 大图, 尺寸是中图的4倍`
* 事件处理:
    * 什么事件: mousemove
    * 给谁绑定: event <div>
* 在事件回调函数中做什么?
    * 移动mask div: 指定其left和top样式: 
        * maskDiv.style.left = left + px
        * maskDiv.style.top = top + px
    * 移动大图 img: 指定其left和top样式: 
        * `bigImg.style.left = -2*top + px`
        * `bigImg.style.top = -2*top + px`
    * 计算最新的left值和top值
        * 依赖数据: 事件坐标offsetX和offsetY, mask的宽度maskWidth
        * 算法: 
            `left = offsetX - maskWidth/2`
            `top = offsetY - maskWidth/2`
        * 限制left和top值只能在[0, maskWidth/2]

## 在组件中分发异步action之后, 如果知道是成功了还是失败了从而做相应处理?
* 实现方式1: 利用回调函数数据
    * component: dispatch('addToCart', {callback: this.callback}) // 携带回调函数数据
    * action: 请求成功或失败后, 调用callback(errorMsg值) // 向组件传递需要显示的errorMsg
    * component: 在callback中, 根据errorMsg参数是否有值来做相应处理

    * 实现方式2: 利用dispatch()的promise返回值
        * 前置知识:
            * async函数执行的返回值是一个promise, 且promise的结果由函数体的结果决定
            * 执行dispatch()返回值为promise对象, 它就是async函数返回的promise
        
            * component: dispatch('addToCart', {}) // 不用携带回调函数数据
    * 方式1:
        * action: 
            * 请求操作成功: 返回''
            * 请求操作失败: 返回errorMsg
            * component: 通过dispatch()返回的promise的成功value值来判断成功还是失败了
    * 方式2:
        * action: 
            * 请求操作成功: 返回''
            * 请求操作失败: throw new Error(errorMsg值)
            * component: 通过dispatch()返回的promise是成功的还是失败来判断操作是成功的还是失败
### [axios 详解 --> 好文章](https://juejin.im/entry/58b2532f2f301e006c0a2d80)
### [vuex 文章](https://juejin.im/entry/58cb4c36b123db00532076a2)
