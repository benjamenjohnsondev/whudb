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

export function setData(key, value) {
  var existing = localStorage.getItem(key);
  existing = existing ? existing.split(',') : [];
  if (existing.includes(value)) {
    return;
  }
  existing.push(value);
  localStorage.setItem(key, existing.toString());
}

export function getData(key, value) {
  var existing = localStorage.getItem(key);
  existing = existing ? existing.split(',') : [];
  if (existing.includes(value)) {
    return existing;
  }
  return false;
}

export function checkData(key, value) {
  var existing = localStorage.getItem(key);
  existing = existing ? existing.split(',') : [];
  if (existing.includes(value)) {
    return true;
  }
  return false;
}

export function deleteData(key, value) {
  var existing = localStorage.getItem(key);
  existing = existing ? existing.split(',') : [];
  if (existing.includes(value)) {
    let i = existing.indexOf(value);
    existing.splice(i, 1);
  }
  localStorage.setItem(key, existing.toString());
  return;
}
