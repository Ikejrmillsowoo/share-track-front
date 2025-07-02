function signout() {
    const user = localStorage.getItem('currentUser');

if (user){
    //when a user is signed in
    alert(`${user.firstName} have successfully logged out`)
    localStorage.clear();  
}
}
