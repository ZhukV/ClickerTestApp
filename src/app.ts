import './styles/main.scss';
import { initializeApp } from '@firebase/app';
import { FirebaseOptions } from '@firebase/app-types';
import { getDatabase, ref, set } from '@firebase/database';
import { Clicker } from './app/clicker';

const firebaseConfig: FirebaseOptions = {
    databaseURL: 'https://clicker-test-e9964-default-rtdb.europe-west1.firebasedatabase.app/'
}

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

window.addEventListener('load', async () => {
    const clicker = new Clicker(<HTMLDivElement>document.getElementById('clicker'), database);
    await clicker.init();

    (<HTMLDivElement>document.querySelector('.loading-page')).classList.add('d-none');
});
