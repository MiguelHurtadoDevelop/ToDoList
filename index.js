
const { createApp } = Vue

createApp({
    data() {
        return {
            toDoList: [],
            toDo: "",
            Search: "",
            Buscar: false,
        }
    },
    computed: {
        filteredToDoList() {
            if (this.Search !== "") {
                return this.toDoList.filter((item) => item.Tarea.includes(this.Search));
            } else {
                return this.toDoList;
            }
        },
        contTareas() {
            if(this.toDoList.length == 0){
                return "No hay tareas"
            }else{
                return "Hay "+this.toDoList.length+" tareas"
            }
        }
    },
    methods: {
        añadirAray() {
            if (this.toDo !== "") {
                this.toDoList.push({
                    Tarea: this.toDo,
                    Prioridad: 1,
                    Fecha: new Date().toLocaleDateString()
                });
                this.toDo = "";
                localStorage.setItem("ListaTareas", JSON.stringify(this.toDoList));
            }
        },
        completarTarea(index) {
            this.toDoList[index].Completada = !this.toDoList[index].Completada;
            localStorage.setItem("ListaTareas", JSON.stringify(this.toDoList));
        },
        cambiarPrioridad(index, prioridad) {
            this.toDoList[index].Prioridad = prioridad;
            localStorage.setItem("ListaTareas", JSON.stringify(this.toDoList));
        },
        eliminarTarea(index) {
            this.toDoList.splice(index, 1);
            localStorage.setItem("ListaTareas", JSON.stringify(this.toDoList));
        },
        eliminarCompletadas() {
        this.toDoList = this.toDoList.filter(tarea => !tarea.Completada);
        localStorage.setItem("ListaTareas", JSON.stringify(this.toDoList));
        },
    },
        mounted() {
            this.toDoList = JSON.parse(localStorage.getItem("ListaTareas")) || [];
        }
    }).mount('#app')
