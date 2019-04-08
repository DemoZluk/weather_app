import Dexie from 'dexie';
const db = new Dexie('weather_db');

db.version(1).stores({
  weather: 'city,date',
  profile: 'id',
});

export default db
