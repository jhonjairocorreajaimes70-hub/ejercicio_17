// Capturamos los elementos principales del documento HTML que vamos a manipular
const taskInput = document.getElementById('taskInput');
const taskListContainer = document.getElementById('taskList');
// Estructura de datos: guardamos las tareas como un arreglo de objetos (descripción + estado)
let tasks = [];
// Escuchamos cuando el usuario presiona una tecla dentro del input de texto
taskInput.addEventListener('keypress', function(event) {
    // Verificamos si la tecla presionada es exactamente la tecla 'Enter'
    if (event.key === 'Enter') {
        const text = taskInput.value.trim(); // obtenemos el texto y eliminamos espacios vacíos sobrantes
        // Validamos que el texto no esté vacío antes de agregarlo
        if (text !== "") {
            // Agregamos el objeto con su descripción y estado inicial falso (pendiente)
            tasks.push({ description: text, completed: false });
            
            taskInput.value = ""; // limpiamos el input para dejarlo listo para la siguiente tarea
            
            renderTasks(); // re-renderizamos la lista tras cada cambio como pide la guía
        }
    }
});
// Función renderTasks encargada de limpiar y redibujar toda la lista en el DOM
function renderTasks() {
    taskListContainer.innerHTML = ''; // limpiamos el contenedor para evitar que se dupliquen los elementos
    // Separamos las tareas pendientes y completadas para cumplir con la regla de mover las hechas al final
    const pendientes = tasks.filter(t => !t.completed);
    const completadas = tasks.filter(t => t.completed);
    // Unimos los dos arreglos dejando las pendientes primero y las completadas abajo
    const tareasOrdenadas = [...pendientes, ...completadas];
    // Recorremos cada tarea ordenada para pintarla en pantalla
    tareasOrdenadas.forEach((task) => {
        // Buscamos el índice real de la tarea en nuestro arreglo principal
        const indiceOriginal = tasks.indexOf(task);

        // Creamos un elemento div para representar la tarea visualmente
        const item = document.createElement('div');
        item.classList.add('item-tarea');
        
        // Si la tarea está completada, le agregamos su clase para mostrar el tachado
        if (task.completed) {
            item.classList.add('completada');
        }
        // Construimos el contenido HTML interno usando plantillas literales
        item.innerHTML = `
            <div class="info-tarea" onclick="toggleTask(${indiceOriginal})">
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <span>${task.description}</span>
            </div>
            <button class="btn-eliminar" onclick="deleteTask(${indiceOriginal})">🗑️</button>
        `;
        // Agregamos la tarea creada dentro del contenedor principal en la pantalla
        taskListContainer.appendChild(item);
    });
}
// Función para cambiar el estado de la tarea (completada o pendiente) al hacer clic
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed; // invertimos el valor booleano actual
    renderTasks(); // re-renderizamos la lista completa con los cambios actualizados
}
// Función para eliminar una tarea específica del arreglo según su posición
function deleteTask(index) {
    tasks.splice(index, 1); // eliminamos el elemento exacto del arreglo usando su índice
    renderTasks(); // re-renderizamos la lista tras eliminar el elemento
}