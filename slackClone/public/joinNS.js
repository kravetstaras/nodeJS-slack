const joinNs = (element, nsData) => {
  const nsEndpoint = element.getAttribute('ns');

  const clickedNs = nsData.find(row => row.endpoint === nsEndpoint);
  const rooms = clickedNs.room;

  let roomList = document.querySelector('.room-list');
  roomList.innerHTML = '';
  rooms.forEach(room => {
    roomList.innerHTML += `<li><span class="glyphicon glyphicon-lock"></span>${room.roomTitle}</li>`;
  });
  console.log(nsEndpoint);
  localStorage.setItem('lastNs', nsEndpoint);
};
