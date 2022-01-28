const App = {
    data(){
        return{
            tareas:[],
            nombreTarea:"",
            tareasIntroducidas:[],
            todas : true,
            textoBuscar:"",
        }
    },
   mounted(){
        if (localStorage.tareas){
            this.tareas = JSON.parse(localStorage.tareas);
        }
        this.tareasIntroducidas = this.tareas;
    },
    methods:{
        actualizarLocalStorage(){
            localStorage.tareas = JSON.stringify(this.tareas);
        },
        insertarTarea(){
            let tarea = {
                nombre:this.nombreTarea,
                fecha: new Date(),
                completada:false,
                prioridad:0
            }
            this.tareas.push(tarea)
            this.actualizarLocalStorage();
            this.nombreTarea="";
        },
        borrarTarea(index){
            let ndx = this.tareas.indexOf(this.tareasIntroducidas[index]);
            this.tareasIntroducidas.splice(index,1);
            if(this.todas==false){
                this.tareas.splice(ndx,1)
            }
            this.actualizarLocalStorage();
        },
        completarTarea(index){
            this.tareas[index].completada = true;
            this.actualizarLocalStorage();
        },
        borrarCompletada(index){
            this.tareas = this.tareas.filter(tarea => tarea.completada == false);
            this.tareasIntroducidas = this.tareasIntroducidas.filter(tarea => tarea.completada == false);
            this.actualizarLocalStorage();
        },
        mostrarTodas(){
            this.tareasIntroducidas = this.tareas;
            this.todas = true;
        },
        mostrarCompletadas(){
            this.tareasIntroducidas = this.tareas.filter(tarea => tarea.completada == true);
            this.todas = false;
        },
        mostrarNoCompletadas(){
            this.tareasIntroducidas = this.tareas.filter(tarea => tarea.completada == false);
            this.todas = false;
        },
        prioridadBaja(index){
            let indice = this.tareas.indexOf(this.tareasIntroducidas[index]);
            this.tareasIntroducidas[index].prioridad = -1;
            this.tareas[indice].prioridad = -1;
            this.ordenar();
            this.actualizarLocalStorage();
        },
        prioridadMedia(index){
            let indice = this.tareas.indexOf(this.tareasIntroducidas[index]);
            this.tareasIntroducidas[index].prioridad = 0;
            this.tareas[indice].prioridad = 0;
            this.ordenar();
            this.actualizarLocalStorage();
        },
        prioridadAlta(index){
            let indice = this.tareas.indexOf(this.tareasIntroducidas[index]);
            this.tareasIntroducidas[index].prioridad = 1;
            this.tareas[indice].prioridad = 1;
            this.ordenar();
            this.actualizarLocalStorage();
        },
        buscarTarea(){
            this.tareasIntroducidas = this.tareas.filter(tarea => tarea.nombre.includes(this.textoBuscar));
        },
        ordenar(){
            this.tareasIntroducidas.sort((a,b)=>{
                return b.prioridad - a.prioridad;
            });
        },
    },
    computed:{
        tareasCompletadas(){
            var completadas = 0;
            for (tarea of this.tareas){
                if(tarea.completada == true){
                    completadas += 1;
                }
            }
            return completadas;
        },
        tiempoTranscurrido(){
            let actual = new Date()
            return Math.floor((actual - new Date(tarea.fecha))/60000)
        }
    }
}


window.onload = ()=>{
    Vue.createApp(App).mount("#app");
}

