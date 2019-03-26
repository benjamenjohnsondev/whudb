const dbName = 'whudb';

export function loadData(param) {
  const dataURL = '/api',
    query = `?query={${param}}`;

  fetch(dataURL + query)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Something went wrong!');
    })
    .then(res => {
      this.setState({
        data: res.data.allSets,
      });
    })
    .then(res => {
      console.log(this.state.data);
    })
    .catch(Error);
}

export const __dbInit = () => {
  const connect = indexedDB.open(dbName);
  connect.onupgradeneeded = evt => {
    const db = evt.target.result;
    const firstOS = db.createObjectStore('firstOS', {
      keyPath: 'id',
      autoIncrement: true,
    });
    firstOS.createIndex('id', 'id', { unique: true });
  };
};

export function addToDb (data) {
  const connect = indexedDB.open(dbName);
  connect.onsuccess = evt => {
    const db = connect.result;
    let tx = db.transaction('firstOS', 'readwrite');
    let store = tx.objectStore('firstOS');
    let item = {value:data};
    store.add(item);
    return tx.complete;
  };
};
