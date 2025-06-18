const API_URL = 'https://discordstatsevent.onrender.com/api/discord-server-info';

function renderStats(data) {
  document.getElementById('totalMembers').textContent = data.memberCount ?? 'N/A';
  document.getElementById('onlineMembers').textContent = data.onlineCount ?? 'N/A';
  document.getElementById('todayMessages').textContent = data.messageCount?.today ?? 'N/A';
  document.getElementById('weekMessages').textContent = data.messageCount?.week ?? 'N/A';

  const topList = document.getElementById('topMembers');
  topList.innerHTML = '';

  if (Array.isArray(data.topMembers) && data.topMembers.length > 0) {
    data.topMembers.forEach((member, index) => {
      const li = document.createElement('li');
      li.textContent = `#${index + 1} ${member.username}: ${member.messages} mensajes`;
      topList.appendChild(li);
    });
  } else {
    topList.innerHTML = '<li>No hay datos disponibles</li>';
  }
}

fetch(API_URL)
  .then(res => {
    if (!res.ok) throw new Error('Error al obtener datos del backend');
    return res.json();
  })
  .then(data => renderStats(data))
  .catch(error => {
    console.error(error);
    document.querySelector('.stats').innerHTML = '<p style="color:red;">❌ Error al cargar los datos</p>';
    document.getElementById('topMembers').innerHTML = '<li>Error al cargar</li>';
  });
