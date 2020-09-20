// Initialization
var root = null;
var useHash = true; // Defaults to: false
var hash = '#!'; // Defaults to: '#'
window.router = new Navigo(root, useHash, hash);
// Adding a router
window.router.on('/old-girl-friend', function () {
    console.log('Bạn vừa gặp người yêu cũ');
}).resolve();

window.router.on('/crush', function () {
    console.log('Bạn vừa gặp crush, muốn tỏ tình không ❤❤');
}).resolve();