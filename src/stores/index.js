import { createStore } from 'vuex';

export default createStore({
  state: {
    isAuthenticated: false,
    todos: [],
  },
  mutations: {
    setAuth(state, payload) {
      state.isAuthenticated = payload;
    },
    setTodos(state, todos) {
      state.todos = todos;
    },
    addTodo(state, todo) {
      state.todos.push(todo);
    },
    removeTodo(state, id) {
      state.todos = state.todos.filter(todo => todo.id !== id);
    },
    toggleTodoStatus(state, id) {
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
  actions: {
    login({ commit }, payload) {
      // 使用API進行登入邏輯
      // 成功後:
      commit('setAuth', true);
    },
    fetchTodos({ commit }) {
      // 使用API獲取待辦事項
      commit('setTodos', todosFromApi);
    },
    addTodo({ commit }, todo) {
      // 使用API新增待辦事項
      commit('addTodo', todoFromApi);
    },
    removeTodo({ commit }, id) {
      // 使用API刪除待辦事項
      commit('removeTodo', id);
    },
    toggleTodoStatus({ commit }, id) {
      // 使用API更新待辦事項狀態
      commit('toggleTodoStatus', id);
    },
  },
  getters: {
    completedTodos: state => state.todos.filter(todo => todo.completed),
    pendingTodos: state => state.todos.filter(todo => !todo.completed),
  },
});
