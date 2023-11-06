const userName = 'Taras';
const password = 'x';

const clientOptions = {
  query: {
    userName,
    password,
  },
  auth: {
    userName,
    password,
  },
};

const socket = io('https://slack-clone-socketio.glitch.me', clientOptions);
const nameSpaceSockets = [];
const listeners = {
  nsChange: [],
  messageToRoom: [],
};
let selectedNsId = 0;

document.querySelector('#message-form').addEventListener('submit', e => {
  e.preventDefault();
  const newMessage = document.querySelector('#user-message').value;
  newMessage, selectedNsId;
  nameSpaceSockets[selectedNsId].emit('newMessageToRoom', {
    newMessage,
    date: Date.now(),
    avatar: 'https://via.placeholder.com/30',
    userName,
    selectedNsId,
  });
  document.querySelector('#user-message').value = '';
});

const addListeners = nsId => {
  if (!listeners.nsChange[nsId]) {
    nameSpaceSockets[nsId].on('nsChange', data => {
      ('Namespace Changed!');
      data;
    });
    listeners.nsChange[nsId] = true;
  }
  if (!listeners.messageToRoom[nsId]) {
    nameSpaceSockets[nsId].on('messageToRoom', messageObj => {
      messageObj;
      document.querySelector('#messages').innerHTML +=
        buildMessageHtml(messageObj);
    });
    listeners.messageToRoom[nsId] = true;
  }
};

socket.on('connect', () => {
  ('Connected!');
  socket.emit('clientConnect');
});

socket.on('nsList', nsData => {
  const lastNs = localStorage.getItem('lastNs');
  nsData;
  const nameSapcesDiv = document.querySelector('.namespaces');
  nameSapcesDiv.innerHTML = '';
  nsData.forEach(ns => {
    nameSapcesDiv.innerHTML += `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.image}"></div>`;
    if (!nameSpaceSockets[ns.id]) {
      nameSpaceSockets[ns.id] = io(
        `https://slack-clone-socketio.glitch.me${ns.endpoint}`,
      );
    }
    addListeners(ns.id);
  });

  Array.from(document.getElementsByClassName('namespace')).forEach(element => {
    element.addEventListener('click', e => {
      element;
      joinNs(element, nsData);
    });
  });
  joinNs(document.getElementsByClassName('namespace')[0], nsData);
});
