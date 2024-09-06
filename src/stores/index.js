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
      commit('setAuth', true);
    },
    fetchTodos({ commit }) {
      commit('setTodos', todosFromApi);
    },
    addTodo({ commit }, todo) {
      commit('addTodo', todoFromApi);
    },
    removeTodo({ commit }, id) {
      commit('removeTodo', id);
    },
    toggleTodoStatus({ commit }, id) {
      commit('toggleTodoStatus', id);
    },
  },
  getters: {
    completedTodos: state => state.todos.filter(todo => todo.completed),
    pendingTodos: state => state.todos.filter(todo => !todo.completed),
  },
});
