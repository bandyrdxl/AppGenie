// Login function for email and password
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Hide login section and show idea section
            document.getElementById('loginSection').style.display = 'none';
            document.getElementById('ideaSection').style.display = 'block';
        })
        .catch((error) => {
            document.getElementById('loginError').textContent = 'Invalid credentials. Try again!';
            console.error(error);
        });
}

// Function to handle app idea submission
function submitIdea() {
    const appIdea = document.getElementById('appIdea').value;

    if (appIdea === "") {
        document.getElementById('ideaError').textContent = 'Please describe your app idea.';
        return;
    }

    // Clear errors
    document.getElementById('ideaError').textContent = '';

    // Display generated app section
    document.getElementById('ideaSection').style.display = 'none';
    document.getElementById('appPreview').style.display = 'block';

    // Generate a basic app based on the idea
    document.getElementById('generatedApp').textContent = `App generated based on the idea: "${appIdea}"`;

    // Clear input
    document.getElementById('appIdea').value = '';
}

// Function to handle export app
function exportApp() {
    alert('App has been exported (this is a placeholder for future functionality)');
}

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDVT35NCi2rj-gcR-PUtta2iHMDHQS4GE4",
    authDomain: "appgenie-ec349.firebaseapp.com",
    projectId: "appgenie-ec349",
    storageBucket: "appgenie-ec349.appspot.com",
    messagingSenderId: "1061756824620",
    appId: "1:1061756824620:web:f985eced7bda224bc07589",
    measurementId: "G-BJFF3VJKJ0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const loginBtn = document.getElementById('login-btn');
const userInfo = document.getElementById('user-info');

// Google Login
loginBtn.addEventListener('click', () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(result => {
            const user = result.user;
            displayUserInfo(user);
        })
        .catch(error => {
            console.log(error);
        });
});

// Display user info after login
function displayUserInfo(user) {
    userInfo.innerHTML = `
        <h3>Welcome, ${user.displayName}</h3>
        <img src="${user.photoURL}" width="100" height="100"/>
        <p>Email: ${user.email}</p>
    `;
}

// Function to sign in with Google
function signInWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            var token = result.credential.accessToken;
            var user = result.user;
            console.log(user);
        }).catch((error) => {
            console.error(error);
        });
}