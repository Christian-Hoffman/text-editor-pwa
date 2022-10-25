import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const textEditorDB = await openDB('jate', 1);
  const tVar = textEditorDB.transaction('jate', 'readwrite');
  const sVar = tVar.objectStore('jate');
  const request = sVar.put({ id: 0, value: content });
  const result = await request;
  console.log('Saved to Database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const textEditorDB = await openDB('jate', 1);
  const tVar = textEditorDB.transaction('jate', 'readonly');
  const sVar = tVar.objectStore('jate');
  const request = sVar.get(0);
  const result = await request;
  if (typeof result == 'undefined') {
    console.log('Data not found');
  } else {
    console.log('Data retrieved from database', result.value);
  }
};

initdb();
