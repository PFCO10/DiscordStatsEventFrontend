async function cargarDatos() {
  try {
    // Cambia esta URL por la de tu backend desplegado
    const response = await fetch('https://TU-BACKEND.onrender.com/api/discord-server-info');

    if (!response.ok) {
      throw new Error(`Error en la API: ${response.status}`);
    }

    const data = await response.json();

    // Mostrar total miembros
    document.getElementById('miembros').textContent = data.totalMembers || 'No disponible';

    // Mostrar Top 5 usuarios
    const top5List = document.getElementById('top5');
    top5List.innerHTML = '';

    if (data.top5 && data.top5.length > 0) {
      data.top5.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.username} — ${user.messages} mensajes`;
        top5List.appendChild(li);
      });
    } else {
      top5List.innerHTML = '<li>No hay datos disponibles</li>';
    }

  } catch (error) {
    document.getElementById('miembros').textContent = 'Error al cargar datos';
    document.getElementById('top5').innerHTML = '<li>Error al cargar datos</li>';
    console.error(error);
  }
}

window.onload = cargarDatos;
