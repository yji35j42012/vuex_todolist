<template>
    <div class="function">
        <label class="normal_select">
            <select v-model="filter">
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="complete">Complete</option>
            </select>
            <!-- <ul class="function_state">
                <li>All</li>
                <li>Active</li>
                <li>Done</li>
            </ul> -->
        </label>
        <input type="text" class="normal_input" v-model="addContent" />
        <!-- <label class="normal_search" v-else>
            <input type="text" />
            <i class="material-icons"> search </i>
        </label> -->
        <button class="icon_btn _add material-icons" @click="addHandler()">
            post_add
        </button>
    </div>
    <div class="todobox">
        <div class="tb_head">
            <table class="normal_tb">
                <tr>
                    <th width="20%">狀態</th>
                    <th width="20%">時間</th>
                    <th width="40%">內容</th>
                    <th width="20%">功能</th>
                </tr>
            </table>
        </div>
        <div class="tb_body">
            <table class="normal_tb">
                <TodoItem
                    v-for="item in todoList"
                    :key="item.tId"
                    :todo="item.todo"
                    :edit="item.tId === edit"
                    @editThis="editThis(item.tId)"
                    @complete="(value) => completeHandler(item.tId, value)"
                    @delete="deleteHandler(item.tId)"
                ></TodoItem>
                <!-- <tr>
                    <td width="20%">
                        <label class="normal_check">
                            <input type="checkbox" />
                            <span></span>
                        </label>
                    </td>
                    <td width="20%">
                        2021.07.16
                    </td>
                    <td width="40%">
                        aaaaa
                    </td>
                    <td width="20%">
                        <div class="d_flex _aic _juc">
                            <button class="icon_btn _edit material-icons">
                                edit
                            </button>
                            <button class="icon_btn _del material-icons">
                                delete
                            </button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td width="20%">
                        <label class="normal_check">
                            <input type="checkbox" />
                            <span></span>
                        </label>
                    </td>
                    <td width="20%">
                        2021.07.16
                    </td>
                    <td width="40%">
                        aaaaa
                    </td>
                    <td width="20%">
                        <div class="d_flex _aic _juc">
                            <button class="icon_btn _edit material-icons">
                                edit
                            </button>
                            <button class="icon_btn _del material-icons">
                                delete
                            </button>
                        </div>
                    </td>
                </tr> -->
            </table>
        </div>
    </div>
    <div class="footer">
        <span class="count"> {{ todoList.length }}</span>
        <button class="normal_btn">Claer all</button>
    </div>
</template>

<script>
// @ is an alias to /src
import TodoItem from "@/components/TodoItem.vue";

export default {
    data() {
        return {
            filter: "all",
            edit: false,
            addContent: "",
        };
    },
    components: {
        TodoItem,
    },
    mounted() {
        this.$store.dispatch("LOCAL_READ");
    },
    computed: {
        todoList() {
            return this.$store.getters.localfilterList(this.filter);
        },
    },
    methods: {
        addHandler() {
            let newDate = "";
            let year = new Date().getFullYear();
            let mounth = new Date().getMonth() + 1;
            if (mounth < 9) {
                mounth = "0" + mounth;
            }
            let date = new Date().getDate();
            if (date < 9) {
                date = "0" + date;
            }
            newDate = year + "-" + mounth + "-" + date;
            if (this.addContent !== "") {
                const todo = {
                    date: newDate,
                    content: this.addContent,
                    done: false,
                };
                this.$store.dispatch("LOCAL_CREATE", todo);
            }
            this.addContent = "";
        },
        editThis(tId) {
            this.edit = tId;
        },
        completeHandler(tId, content) {
            this.$store.dispatch("LOCAL_UPDATE", { tId, content });
            this.edit = null;
        },
        deleteHandler(tId) {
            this.$store.dispatch("LOCAL_DELETE", tId);
        },
    },
};
</script>
