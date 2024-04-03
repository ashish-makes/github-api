window.onload = function() {
    // Add animation using GSAP for the h1 text
    const h1Text = document.querySelector('h1');
    gsap.from(h1Text, {
        duration: 0.5,
        opacity: 0,
        y: -50,
        ease: "power3.out"
    });
};


function getUserData() {
    const username = document.getElementById('username').value;
    if (username === '') {
        document.getElementById('emptyErrorMsg').innerHTML = 'Please enter a GitHub username';
        setTimeout(() => {
            document.getElementById('emptyErrorMsg').innerHTML = '';
        }, 3000);
        return;
    }

    const url = `https://api.github.com/users/${username}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('User not found');
            }
            return response.json();
        })
        .then(data => {
            const name = data.name;
            const login = data.login;
            const avatar = data.avatar_url;
            const followers = data.followers;
            const following = data.following;
            const public_repos = data.public_repos;
            const location = data.location;

            document.getElementById('name').innerHTML = name;
            document.getElementById('userName').innerHTML = login;
            document.getElementById('avatar').src = avatar;
            document.getElementById('followers').innerHTML = followers;
            document.getElementById('following').innerHTML = following;
            document.getElementById('public_repos').innerHTML = public_repos;
            if (location) {
                document.getElementById('location').innerHTML = location;
            } else {
                document.getElementById('location').innerHTML = 'Location not found';
            }       

            const userData = document.getElementById('userData');
            gsap.from(userData, {
                duration: 0.5,
                opacity: 0,
                y: 100,
                ease: "power3.out"
            });
            
            userData.classList.add('show');
        })
        .catch(error => {
            if (error.message === 'User not found') {
                document.getElementById('notFoundErrorMsg').innerHTML = 'User not found!';
                setTimeout(() => {
                    document.getElementById('notFoundErrorMsg').innerHTML = '';
                }, 3000);
            }
        });
}
