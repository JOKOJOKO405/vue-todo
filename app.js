new Vue({
  el: '#wrapper',
  data: {
    text: '',
    state: '',
    todos: []
  },
  methods: {
    formatData: function(timestamp){
      let date = new Date(timestamp);
      let y = date.getFullYear();
      let mt = date.getMonth() + 1;
      let d = date.getDate();
      let h = date.getHours();
      let m = date.getMinutes();
      let s = date.getSeconds();

      return y + '/' + mt + '/' + d + ' ' + h + ':' + m + ':' + s;
    },
    handleTodoSubmit: function(){
      this.addTodo(this.text);

      this.text = '';
    },
    addTodo: function(text){
      this.todos.push({
        id: this.todos.length + 1,
        text: text,
        createdAt: Date.now(),
        done: false,
        edit: false
      });
    },
    isEdit: function(id){
      this.todos = this.todos.map(function(todo){
        if(todo.id === id){
          todo.edit = true;
        }

        return todo;
      });
    },
    isSave: function(id){
      this.todos = this.todos.map(function(todo){
        if(todo.id === id){
          todo.edit = false;
        }

        return todo;
      });
    },
    isDelete: function(id){
      const i = this.todos.findIndex((t) => t.id === id);
      this.todos.splice(i, 1);
    },
    setState: function(state){
      this.state = state;
    }
  },
  computed: {
    disableBtn: function(){
      return this.text === '';
    },
    filterTodos: function(){
      const state = this.state;

      const listTodo = this.todos.filter(function(todo){
        return state === 'done' ? todo.done : !todo.done;
      });

      return listTodo;
    }
  }
});