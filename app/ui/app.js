const { ipcRenderer } = require("electron");

const taskForm = document.querySelector("#taskForm");
const taskCodigo = document.querySelector("#taskCodigo");
const taskList = document.querySelector("#taskList");
const taskNombre = document.querySelector("#taskNombre");
const taskCategoria = document.querySelector("#taskCategoria");
const taskCantidad = document.querySelector("#taskCantidad");
const taskPrecio = document.querySelector("#taskPreciocompra");
const taskPrecioventa = document.querySelector("#taskPrecioventa");
const taskIva = document.querySelector("#taskIva");
const taskProveedor = document.querySelector("#taskProveedor");



const codigoIdUsuario = document.querySelector("#codigoIdUsuario");
const formularioUsuario = document.querySelector("#formularioUsuario");
const usuarioForm = document.querySelector("#usuarioForm");
const usuarioName = document.querySelector("#usuarioName");
const usuarioDescription = document.querySelector("#usuarioDescription");
const usuarioList = document.querySelector("#usuarioList");
const usuarioCorreo = document.querySelector("#usuarioCorreo");
const usuarioCargo = document.querySelector("#usuarioCargo");

const proveedorForm = document.querySelector("#proveedorForm");
const proveedorName = document.querySelector("#proveedorName");
const proveedorTelefono = document.querySelector("#proveedorTelefono");
const proveedorDireccion = document.querySelector("#proveedorDireccion");
const proveedorList = document.querySelector("#proveedorList");
const proveedorContacto = document.querySelector("#proveedorContacto");
const proveedorProductos = document.querySelector("#proveedorProductos");
const proveedorCodigo = document.querySelector("#proveedorCodigo");


let updateStatus = false;
let idTaskToUpdate = "";

function deleteTask(id) {
  const response = confirm("are you sure you want to delete it?");
  if (response) {
    ipcRenderer.send("delete-task", id);
  }
  return;
}

function editTask(id) {
  updateStatus = true;
  idTaskToUpdate = id;
  const task = tasks.find((task) => task._id === id);
  taskCodigo.value = task.codigo;
  taskNombre.value = task.nombre;
  taskCategoria.value = task.categoria;
  taskCantidad.value = task.cantidad;
  taskPreciocompra.value = task.preciocompra;
  taskProveedor.value = task.proveedor;
  taskPrecioventa.value = task.precioventa;
  taskIva.value = task.iva;
 

  
}

function renderTasks(tasks) {
  taskList.innerHTML = "";
  tasks.map((t) => {
    taskList.innerHTML += `
          <tr class="card">
            <td>
            ${t._id}
            </td>
            <td>
             ${t.Codigo}
            </td>
            <td>
            ${t.Nombre}
            </td>
            <td>
            ${t.Categoria}
            </td>
             <td>
            ${t.Cantidad}
            </td>
            <td>
            ${t.Preciocompra}
            </td>
            <td>
            ${t.Precioventa}
            </td>
            <td>
            ${t.Iva}
            </td>
            <td>
            ${t.Proveedor}
            </td>
            <td>
            <button class="btn btn-danger" onclick="deleteTask('${t._id}')">
              🗑 Delete
            </button>
            </td>
            <td>
            <button class="btn btn-secondary" onclick="editTask('${t._id}')">
              ✎ Edit
            </button>
            </td>

            
            
            
          </tr>
        `;
  });
}

let tasks = [];

ipcRenderer.send("get-tasks");

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const task = {
    Codigo: taskCodigo.value,
    Nombre: taskNombre.value,
    Categoria: taskCategoria.value,
    Cantidad: taskCantidad.value,
    Preciocompra: taskPreciocompra.value,
    Precioventa: taskPrecioventa.value,
    Iva: taskIva.value,
    Proveedor: taskProveedor.value,
  


  };

  if (!updateStatus) {
    ipcRenderer.send("new-task", task);
  } else {
    ipcRenderer.send("update-task", { ...task, idTaskToUpdate });
  }

  taskForm.reset();
});

ipcRenderer.on("new-task-created", (e, arg) => {
  console.log(arg);
  const taskSaved = JSON.parse(arg);
  tasks.push(taskSaved);
  console.log(tasks);
  renderTasks(tasks);
  alert("Task Created Successfully");
  taskName.focus();
});

ipcRenderer.on("get-tasks", (e, args) => {
  const receivedTasks = JSON.parse(args);
  tasks = receivedTasks;
  renderTasks(tasks);
});

ipcRenderer.on("delete-task-success", (e, args) => {
  const deletedTask = JSON.parse(args);
  const newTasks = tasks.filter((t) => {
    return t._id !== deletedTask._id;
  });
  tasks = newTasks;
  renderTasks(tasks);
});

ipcRenderer.on("update-task-success", (e, args) => {
  updateStatus = false;
  const updatedTask = JSON.parse(args);
  tasks = tasks.map((t, i) => {
    if (t._id === updatedTask._id) {
      t.Codigo = updatedTask.Codigo;
      t.Nombre = updatedTask.Nombre;
      t.Categoria = updatedTask.Categoria;
      t.Cantidad = updatedTask.Cantidad;
      t.Preciocompra = updatedTask.Preciocompra;
      t.Precioventa = updatedTask.Precioventa;
      t.Proveedor = updatedTask.Proveedor;
      t.Iva = updatedTask.Iva;
      
      
    }
    return t;
  });
  renderTasks(tasks);
});
/*---------------------------------------------------------------------------------------------*/
function deleteUsuario(id) {
  const response = confirm("are you sure you want to delete it?");
  if (response) {
    ipcRenderer.send("delete-usuario", id);
  }
  return;
}

function editUsuario(id) {
  updateStatus = true;
  idUsuarioToUpdate = id;
  const usuarios = usuarios.find((usuario) => usuario._id === id);
  usuarioName.value = usuario.name;
  usuarioDescription.value = usuario.description;
  usuarioCorreo.value = usuario.correo;
  usuarioCargo.value = usuario.cargo;
}

function renderUsuarios(usuarios) {
  usuarioList.innerHTML = "";
  usuarios.map((t) => {
    usuarioList.innerHTML += `
     
<tr class="card">
            <td>
            ${t._id}
            </td>
            <td>
             ${t.name}
            </td>
            <td>
            ${t.description}
            </td>
            <td>
            ${t.correo}
            </td>
             <td>
            ${t.cargo}
            </td>
            <td>
            <button class="btn btn-danger" onclick="deleteUsuario('${t._id}')">
              🗑 Delete
            </button>
            </td>
            <td>
            <button class="btn btn-secondary" onclick="editUsuario('${t._id}')">
              ✎ Edit
            </button>
            </td>
          </tr>
        `;
  });
}




let Usuarios = [];

ipcRenderer.send("get-usuarios");

usuarioForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const usuario = {
    name: usuarioName.value,
    description: usuarioDescription.value,
    correo: usuarioCorreo.value,
    cargo: usuarioCargo.value,
  };

  if (!updateStatus) {
    ipcRenderer.send("new-usuario", usuario);
  } else {
    ipcRenderer.send("update-usuario", { ...usuario, idUsuarioToUpdate });
  }

  usuarioForm.reset();
});

ipcRenderer.on("new-usuario-created", (e, arg) => {
  console.log(arg);
  const usuarioSaved = JSON.parse(arg);
  usuarios.push(usuarioSaved);
  console.log(usuarios);
  renderUsuarios(usuarios);
  alert("Usuario Created Successfully");
  usuarioName.focus();
});

ipcRenderer.on("get-usuarios", (e, args) => {
  const receivedUsuarios = JSON.parse(args);
  usuarios = receivedUsuarios;
  renderUsuarios(usuarios);
});

ipcRenderer.on("delete-usuario-success", (e, args) => {
  const deletedUsuario = JSON.parse(args);
  const newUsuarios = usuarios.filter((t) => {
    return t._id !== deletedUsuario._id;
  });
  usuarios = newUsuarios;
  renderUsuarios(usuarios);
});

ipcRenderer.on("update-usuario-success", (e, args) => {
  updateStatus = false;
  const updatedUsuario = JSON.parse(args);
  usuarios = usuarios.map((t, i) => {
    if (t._id === updatedUsuario._id) {
      t.name = updatedUsuario.name;
      t.description = updatedUsuario.description;
      t.correo = updatedUsuario.correo;
      t.cargo = updatedUsuario.cargo;
    }
    return t;
  });
  renderUsuarios(usuarios);
});

/*---------------------------------------------------------------------------------------------*/

function deleteProveedor(id) {
  const response = confirm("are you sure you want to delete it?");
  if (response) {
    ipcRenderer.send("delete-proveedor", id);
  }
  return;
}

function editProveedor(id) {
  updateStatus = true;
  idProveedorToUpdate = id;
  const proveedor = proveedores.find((proveedor) => proveedor._id === id);
  proveedorName.value = proveedor.name;
  proveedorTelefono.value = proveedor.telefono;
  proveedorDireccion.value = proveedor.direccion;
  proveedorContacto.value = proveedor.contacto;
  proveedorProductos.value = proveedor.productos;
  proveedorCodigo.value = proveedor.codigo;
}

function renderProveedores(proveedores) {
  proveedorList.innerHTML = "";
  proveedores.map((t) => {
    proveedorList.innerHTML += `
<tr class="card">
<td>
${t._id}
</td>
<td>
 ${t.codigo}
</td>
<td>
${t.name}
</td>
<td>
${t.direccion}
</td>
<td>
${t.telefono}
</td>
 <td>
${t.contacto}
</td>
<td>
${t.productos}
</td>
<td>
<button class="btn btn-danger" onclick="deleteProveedor('${t._id}')">
  🗑 Delete
</button>
</td>
<td>
<button class="btn btn-secondary" onclick="editProveedor('${t._id}')">
  ✎ Edit
</button>
</td>

</tr>
`;
});
}




let proveedores = [];

ipcRenderer.send("get-proveedores");

proveedorForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const proveedor = {
    name: proveedorName.value,
    telefono: proveedorTelefono.value,
    direccion: proveedorDireccion.value,
    contacto: proveedorContacto.value,
    productos: proveedorProductos.value,
    codigo: proveedorCodigo.value,
  };

  if (!updateStatus) {
    ipcRenderer.send("new-proveedor", proveedor);
  } else {
    ipcRenderer.send("update-proveedor", { ...proveedor, idProveedorToUpdate });
  }

  proveedorForm.reset();
});

ipcRenderer.on("new-proveedor-created", (e, arg) => {
  console.log(arg);
  const proveedorSaved = JSON.parse(arg);
  proveedores.push(proveedorSaved);
  console.log(proveedores);
  renderProveedores(proveedores);
  alert("Proveedor Created Successfully");
  proveedorName.focus();
});

ipcRenderer.on("get-proveedores", (e, args) => {
  const receivedProveedores = JSON.parse(args);
  proveedores = receivedProveedores;
  renderProveedores(proveedores);
});

ipcRenderer.on("delete-proveedor-success", (e, args) => {
  const deletedProveedor = JSON.parse(args);
  const newProveedores = proveedores.filter((t) => {
    return t._id !== deletedProveedor._id;
  });
  proveedores = newProveedores;
  renderProveedores(proveedores);
});

ipcRenderer.on("update-proveedor-success", (e, args) => {
  updateStatus = false;
  const updatedProveedor = JSON.parse(args);
  proveedores = proveedores.map((t, i) => {
    if (t._id === updatedProveedor._id) {
      t.name = updatedProveedor.name;
      t.telefono = updatedProveedor.telefono;
      t.direccion = updatedProveedor.direccion;
      t.contacto = updatedProveedor.contacto;
      t.productos = updatedProveedor.productos;
      t.codigo = updatedProveedor.codigo;
    }
    return t;
  });
  renderProveedores(proveedores);
});