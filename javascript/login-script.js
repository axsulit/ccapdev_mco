// let loginButton = document.getElementById('login');

// // Add a click event listener to the button
// loginButton.addEventListener('click', () => {
//   window.location.href = "index.html";
// })

let users = [
  { username: 'anne', password: '12345678' },
  { username: 'bella', password: '12345678' },
  { username: 'zhoe', password: '12345678' },
  { username: 'marmar', password: '12345678' },
  { username: 'sirneil', password: '12345678' }
];

let username = document.getElementById('username').value;
let password = document.getElementById('password').value;
let loginButton = document.getElementById('login');

loginButton.addEventListener('click', () => {
  

  for(i = 0; i < users.length; i++){
    if(username == users[i].username && password == users[i].password){
      window.location.href = "index.html";
      console.log('hehe');
    }
    
  }
  console.log("incorrect");
})

// function getInfo(){
//   let username = document.getElementById('username').value;
//   let password = document.getElementById('password').value;

//   for(i = 1; i < users.length; i++){
//     if(users == users[i].username && password == users[i].password){
//       window.location.href = "index.html";
//       console.log('hehe');
//     }
    
//   }
//   console.log("incorrect");
// }


