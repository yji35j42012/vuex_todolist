import { createStore } from "vuex";
import LocalStorage from "../modules/LocalStorage";

const STORE = new LocalStorage("todo-vue");

export default createStore({
    state: {
        localtodo: [],
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
    },

    mutations: {
        SET_LOCALTODOS(state, todos) {
            state.localtodo = todos;
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
        LOCAL_READ({ commit }) {
            let todos = STORE.load();
            if (todos == null) {
                todos = [];
            }
            commit("SET_LOCALTODOS", todos);
            return todos;
        },
        LOCAL_UPDATE({ commit }, { tId, content }) {
            const todos = STORE.load();
            todos[tId].content = content;
            STORE.save(todos);
            commit("SET_LOCALTODOS", todos);
            // return { tId, todos };
        },
        LOCAL_DELETE({ commit }, tId) {
            const todos = STORE.load();
            todos.splice(tId, 1)[0];
            STORE.save(todos);
            commit("SET_LOCALTODOS", todos);
        },
    },
});
