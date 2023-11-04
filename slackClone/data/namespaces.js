const Namespace = require('../classes/Namespace');
const Room = require('../classes/Room');

const wikiNs = new Namespace(
  0,
  'Wikipedia',
  'https://i.ibb.co/yqbzFr5/wikipedia.png',
  '/wiki',
);

const mozNs = new Namespace(
  1,
  'Mozilla',
  'https://i.ibb.co/0tTQyD4/Firefox-logo-2019-svg.png',
  '/mozilla',
);

const linuxNs = new Namespace(
  2,
  'Linux',
  'https://i.ibb.co/3CQrGKW/Tux-svg.png',
  '/linux',
);

wikiNs.addRoom(new Room(0, 'New Articles', 0));
wikiNs.addRoom(new Room(1, 'Editors', 0));
wikiNs.addRoom(new Room(2, 'Other', 0));

mozNs.addRoom(new Room(0, 'Firefox', 1));
mozNs.addRoom(new Room(1, 'SeaMonkey', 1));
mozNs.addRoom(new Room(2, 'SpiderMonkey', 1));
mozNs.addRoom(new Room(3, 'Rust', 1));

linuxNs.addRoom(new Room(0, 'Debian', 2));
linuxNs.addRoom(new Room(1, 'Red Had', 2));

const namespaces = [wikiNs, mozNs, linuxNs];
module.exports = namespaces;
