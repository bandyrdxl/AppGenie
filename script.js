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

// Google Sign-in
function signInWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            displayUserInfo(user);
        })
        .catch((error) => {
            console.log(error.message);
            document.getElementById('loginError').textContent = 'Google Sign-In failed. Please try again!';
        });
}

// Display user info after Google login
function displayUserInfo(user) {
    const userInfo = document.getElementById('user-info');
    userInfo.innerHTML = `
        <h3>Welcome, ${user.displayName}</h3>
        <img src="${user.photoURL}" width="100" height="100"/>
        <p>Email: ${user.email}</p>
    `;
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('ideaSection').style.display = 'block';
}

// Email/Password Login
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            document.getElementById('loginSection').style.display = 'none';
            document.getElementById('ideaSection').style.display = 'block';
        })
        .catch((error) => {
            document.getElementById('loginError').textContent = 'Invalid credentials. Try again!';
            console.error(error.message);
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

    // Generate a basic app based on the idea (in real scenario, this would be more complex)
    document.getElementById('generatedApp').textContent = `App generated based on the idea: "${appIdea}"`;

    // Clear input
    document.getElementById('appIdea').value = '';
}

// Function to handle export app (You can add download logic or API call to generate code here)
function exportApp() {
    alert('App has been exported (this is a placeholder for future functionality)');
}
