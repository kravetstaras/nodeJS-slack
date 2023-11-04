// const userName = prompt('What is your username?');
// const userPassword = prompt('What is your userPassword?');

const userName = 'Taras';
const userPassword = '123';

const socket = io('http://localhost:9000');
// const socket2 = io('http://localhost:9000/wiki');
// const socket3 = io('http://localhost:9000/mozilla');
// const socket4 = io('http://localhost:9000/linux');

const nameSpaceSockets = [];
const listeners = {
  nsChange: []
}

const addListeners = (nsId) => {
  if (!listeners.nsChange[nsId]) {
  nameSpaceSockets[nsId].on('nsChange', (data) => {
    console.log('Namespace Changed!');
    console.log(data)
  })
  listeners.nsChange[nsId] = true
 }
}

socket.on('connect', () => {
  console.log('Connected!');
  socket.emit('clientConnect');
});

socket.on('nsList', nsData => {
  const lastNs = localStorage.getItem('lastNs');
  const nameSpacesDiv = document?.querySelector('.namespaces');
  nameSpacesDiv.innerHTML = '';
  nsData.forEach(ns => {
    nameSpacesDiv.innerHTML += `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.image}"></div>`;

    if (!nameSpaceSockets[ns.id]) {
      nameSpaceSockets[ns.id] = io(`http://localhost:9000${ns.endpoint}`);
    }

    addListeners(ns.id)
  });

  Array.from(document.getElementsByClassName('namespace')).forEach(element => {
    element.addEventListener('click', e => {
      joinNs(element, nsData);
    });
  });

  lastNsIndex = nsData?.find(el => el.endpoint === lastNs).id;

  lastNs
    ? joinNs(document.getElementsByClassName('namespace')[lastNsIndex], nsData)
    : joinNs(document.getElementsByClassName('namespace')[0], nsData);
});
