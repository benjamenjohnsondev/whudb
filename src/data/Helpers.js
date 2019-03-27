import fetch from 'isomorphic-fetch';

const dbName = 'whudb';

export function loadData(param) {
  const dataURL = `/api`,
    query = `?query={${param}}`;

  return fetch(dataURL + query)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Something went wrong!');
    })
    .then(res => {
      return res.data;
    })
    .catch(Error);
}

function createOwnership(db) {
  const setsOwned = db.createObjectStore('setsOwned', {
    keyPath: 'id',
    autoIncrement: true,
  });
  setsOwned.createIndex('id', 'id', { unique: true });
}

function createSets(db) {
  const sets = db.createObjectStore('sets', {
    // keyPath: 'id',
    autoIncrement: false,
  });
  sets.createIndex('id', 'id', { unique: true });
  loadData('allSets{id,name,image{width,height,url}}').then(data => {
    data.allSets.forEach(set => {
      addToDb(set, parseInt(set.id), 'sets');
    });
  });
}

export const __dbInit = () => {
  indexedDB.deleteDatabase(dbName, 1);
  const connect = indexedDB.open(dbName, 1);
  connect.onupgradeneeded = evt => {
    const db = evt.target.result;
    createSets(db);
    createOwnership(db);
  };
};

export function addToDb (data, id, dataStore) {
  const connect = indexedDB.open(dbName);
  connect.onsuccess = evt => {
    const key = id;
    const db = connect.result;
    let tx = db.transaction(dataStore, 'readwrite');
    let store = tx.objectStore(dataStore);
    let item = { value: data };
    store.add(item, key);
    return tx.complete;
  };
};
