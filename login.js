// Grab the form element so we can listen for its submit event
const form = document.getElementById('loginForm');
const errorEl = document.getElementById('error');

form.addEventListener('submit', async (e) => {//run the code below when submitted
  e.preventDefault(); // stop the page from reloading (default form behavior) 

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
//read what user typed


  try {//fetch the api
   
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',//submiting data
      headers: { 'Content-Type': 'application/json' },//data type
      body: JSON.stringify({ username, password })
    }); //send username,pass to dummyjson to verify the data

    if (!response.ok) {//if bad response by server
      // dummyjson returns a non-200 status for wrong credentials
      throw new Error('Invalid username or password');
    }

    //converts response into json
    const data = await response.json();
    const userRes = await fetch(`https://dummyjson.com/users/${data.id}`);
    const userData = await userRes.json();//doesnt include role so fetch full data
    // data looks like: { id, username, email, role, accessToken, ... }

    // Save what we need for later pages.
    // localStorage persists across page loads (until cleared), unlike a normal JS variable.
    localStorage.setItem('accessToken', data.accessToken); //jwt long string, it contains data (history) of the user
    localStorage.setItem('userId', data.id);
    localStorage.setItem('role', userData.role); // "admin" | "moderator" | "user"

    // Login succeeded — go to the todos page
    window.location.href = 'dashboard.html';

  } catch (err) {
    errorEl.textContent = err.message;
  }
});