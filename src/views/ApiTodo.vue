<template>
    <div class="function">
        <label class="normal_select">
            <select v-model="filter">
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="complete">Complete</option>
            </select>
        </label>
        <input type="text" class="normal_input" v-model="addContent" />
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
                    v-for="item in list"
                    :key="item.tId"
                    :todo="item"
                    :edit="item.tId === edit"
                    @editThis="editThis(item.tId)"
                    @complete="(value) => completeHandler(item.tId, value)"
                    @delete="deleteHandler(item.tId)"
                ></TodoItem>
            </table>
        </div>
    </div>
    <div class="footer">
        <span class="count"> {{ list.length }}</span>
        <button class="normal_btn">Claer all</button>
    </div>
</template>

<script>
import TodoItem from "@/components/TodoItem.vue";
export default {
    data() {
        return {
            filter: "all",
            edit: null,
            addContent: "",
        };
    },
    components: {
        TodoItem,
    },
    mounted() {
        this.$store.dispatch("API_READ");
    },
    computed: {
        list() {
            return this.$store.getters.ApifilterList(this.filter);
        },
    },
    methods: {
        addHandler() {
            if (this.addContent !== "") {
                this.$store.dispatch("API_CREATE", this.addContent);
            }
        },
        editThis(tId) {
            this.edit = tId;
        },
        completeHandler(tId, content) {
            console.log("tId", tId);
            console.log("value", content);
            this.$store.dispatch("API_UPDATE", { tId, content });
            this.edit = null;
        },
        deleteHandler(tId) {
            console.log(tId);
            this.$store.dispatch("API_DELETE", tId);
        },
    },
};
</script>
