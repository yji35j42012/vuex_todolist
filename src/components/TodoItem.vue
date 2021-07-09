<template>
    <tr>
        <td width="20%">
            <label class="normal_check">
                <input type="checkbox" v-model="todo.done" />
                <span></span>
            </label>
        </td>
        <td width="20%">
            2021.07.16
        </td>
        <td width="40%">
            <span v-if="edit">
                <input
                    type="text"
                    class="normal_input"
                    v-model="editingTodo.editContent"
                />
            </span>
            <span v-else> {{ todo.content }}</span>
        </td>
        <td width="20%">
            <div class="d_flex _aic _juc">
                <button
                    class="icon_btn _edit material-icons _done"
                    v-if="edit"
                    @click="$emit('complete', editingTodo.editContent)"
                >
                    done
                </button>
                <button
                    class="icon_btn _edit material-icons"
                    @click="editHandler()"
                    v-else
                >
                    edit
                </button>
                <button
                    class="icon_btn _del material-icons"
                    @click="$emit('delete')"
                >
                    delete
                </button>
            </div>
        </td>
    </tr>
</template>
<script>
export default {
    props: {
        todo: {
            type: Object,
            required: true,
        },
        edit: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            editingTodo: {
                editContent: "",
            },
        };
    },
    mounted() {
        this.editingTodo.editContent = this.todo.content;
    },
    methods: {
        editHandler() {
            this.editingTodo.editContent = this.todo.content;
            this.$emit("editThis");
        },
    },
};
</script>
