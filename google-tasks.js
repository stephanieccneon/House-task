function initClient() {
    gapi.load('client:auth2', () => {
        gapi.client
            .init({
                clientId: config.GOOGLE_CLIENT_ID,
                discoveryDocs: config.DISCOVERY_DOCS,
                scope: config.SCOPES,
            })
            .then(() => {
                console.log('Google API client initialized');
                const authInstance = gapi.auth2.getAuthInstance();
                authInstance.isSignedIn.listen(updateSigninStatus);
                updateSigninStatus(authInstance.isSignedIn.get());
            })
            .catch((error) => {
                console.error('Error initializing Google API client:', error);
            });
    });
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        document.getElementById('signInButton').style.display = 'none';
        document.getElementById('signOutButton').style.display = 'block';
        document.getElementById('addTaskButton').style.display = 'block';
        console.log('User is signed in');
    } else {
        document.getElementById('signInButton').style.display = 'block';
        document.getElementById('signOutButton').style.display = 'none';
        document.getElementById('addTaskButton').style.display = 'none';
        console.log('User is signed out');
    }
}

function handleAuthClick() {
    gapi.auth2.getAuthInstance()
        .signIn()
        .then(() => {
            console.log('User signed in successfully');
        })
        .catch((error) => {
            console.error('Error signing in:', error);
            alert('Failed to sign in. Please contact admin at houseplantassistant@gmail.com.');
        });
}

function handleSignoutClick() {
    gapi.auth2.getAuthInstance()
        .signOut()
        .then(() => {
            console.log('User signed out successfully');
        })
        .catch((error) => {
            console.error('Error signing out:', error);
            alert('Failed to sign out. Please try again.');
        });
}

async function addTask(title, notes, dueDate) {
    try {
        const response = await gapi.client.tasks.tasks.insert({
            tasklist: '@default', 
            resource: {
                title: title, 
                notes: notes, 
                due: dueDate, 
            },
        });

        console.log('Task added successfully:', response.result);
        alert(`Task "${title}" added successfully.`);
    } catch (error) {
        console.error('Error adding task:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initClient();

    document.getElementById('signInButton').onclick = handleAuthClick;
    document.getElementById('signOutButton').onclick = handleSignoutClick;
    document.getElementById('addTaskButton').onclick = () => {
        const title = prompt('Enter task title:');
        const notes = prompt('Enter task notes:');
        const dueDate = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(); // 7 days from today

        if (title) {
            addTask(title, notes, dueDate);
        } else {
            alert('Task title is required!');
        }
    };
});

