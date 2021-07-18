import { createStore } from "vuex";
import LocalStorage from "../modules/LocalStorage";
import axios from "axios";
const STORE = new LocalStorage("todo-vue");

export default createStore({
    state: {
        localtodo: [],
        apitodo: [],
    },
    getters: {
        local_tid(state) {
            return state.localtodo.map((todo, index) => {
                return { tId: index, todo };
            });
        },
        localfilterList(state, getters) {
            return (filter) => {
                switch (filter) {
                    case "all":
                        return getters.local_tid;
                    case "active":
                        return getters.local_tid.filter((todo) => {
                            return !todo.todo.done;
                        });

                    case "complete":
                        return getters.local_tid.filter((todo) => {
                            return todo.todo.done;
                        });
                }
            };
        },
        ApifilterList(state, getters) {
            return (filter) => {
                switch (filter) {
                    case "all":
                        return state.apitodo;
                    case "active":
                        return state.apitodo.filter((apitodo) => {
                            return !apitodo.done;
                        });
                    case "complete":
                        return state.apitodo.filter((apitodo) => {
                            return apitodo.done;
                        });
                }
            };
        },
    },
    mutations: {
        SET_LOCALTODOS(state, todos) {
            state.localtodo = todos;
        },
        SET_APITODOS(state, apitodos) {
            state.apitodo = apitodos;
        },
    },
    actions: {
        LOCAL_CREATE({ commit }, addTodo) {
            let todos = STORE.load();
            if (todos == null) {
                todos = [];
            }
            todos.push(addTodo);
            STORE.save(todos);
            commit("SET_LOCALTODOS", todos);
            return todos;
        },
        API_CREATE({ commit }, addTodo) {
            console.log(addTodo);
            // axios
            //     .post(`/Api/setTodoData.php?content=${addTodo}`)
            //     .then((res) => {});
            axios.post("/Api/setTodoData.php", addTodo).then((res) => {
                console.log(res.data);
            });
            axios.get(`/Api/getTodoData.php`).then((res) => {
                let apitodos = [];
                res.data.forEach((item) => {
                    apitodos.push({
                        tId: item[0],
                        date: item[1],
                        content: item[2],
                        done: item[3] == 0 ? false : true,
                    });
                });
                commit("SET_APITODOS", apitodos);
            });
        },
        LOCAL_READ({ commit }) {
            let todos = STORE.load();
            if (todos == null) {
                todos = [];
            }
            commit("SET_LOCALTODOS", todos);
            return todos;
        },
        API_READ({ commit }) {
            axios.get(`/Api/getTodoData.php`).then((res) => {
                let apitodos = [];
                res.data.forEach((item) => {
                    apitodos.push({
                        tId: item[0],
                        date: item[1],
                        content: item[2],
                        done: item[3] == 0 ? false : true,
                    });
                });
                commit("SET_APITODOS", apitodos);
            });
        },
        LOCAL_UPDATE({ commit }, { tId, content }) {
            const todos = STORE.load();
            todos[tId].content = content;
            STORE.save(todos);
            commit("SET_LOCALTODOS", todos);
            // return { tId, todos };
        },
        API_UPDATE({ commit }, { tId, content }) {
            console.log('tId',tId);
            console.log('content',content);
            axios.post("/Api/updateTodoData.php", {tId,content}).then((res) => {
                console.log(res.data);
            });
            axios.get(`/Api/getTodoData.php`).then((res) => {
                let apitodos = [];
                res.data.forEach((item) => {
                    apitodos.push({
                        tId: item[0],
                        date: item[1],
                        content: item[2],
                        done: item[3] == 0 ? false : true,
                    });
                });
                commit("SET_APITODOS", apitodos);
            });
        },
        LOCAL_DELETE({ commit }, tId) {
            const todos = STORE.load();
            todos.splice(tId, 1)[0];
            STORE.save(todos);
            commit("SET_LOCALTODOS", todos);
        },
        API_DELETE({ commit }, tId) {
            console.log("tId", tId);
            axios.post("/Api/deleteTodoData.php", tId).then((res) => {
                console.log(res);
            });
            axios.get(`/Api/getTodoData.php`).then((res) => {
                let apitodos = [];
                res.data.forEach((item) => {
                    apitodos.push({
                        tId: item[0],
                        date: item[1],
                        content: item[2],
                        done: item[3] == 0 ? false : true,
                    });
                });
                commit("SET_APITODOS", apitodos);
            });
        },
    },
});
