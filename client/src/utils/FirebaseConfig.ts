import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCNUd5o7FSLv5-6IkH8vHPd7fNpmv0Dy-I",
    authDomain: "chatapp-762d9.firebaseapp.com",
    projectId: "chatapp-762d9",
    storageBucket: "chatapp-762d9.appspot.com",
    messagingSenderId: "305822426881",
    appId: "1:305822426881:web:ac1eed2d503635da7e5d00",
    measurementId: "G-EDS7MC5RF3"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
