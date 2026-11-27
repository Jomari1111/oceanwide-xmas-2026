/* Connects the pages to Firebase Firestore when ow-config.js has a config. Do not edit. */
(function(){
  function load(src){return new Promise(function(ok,no){var s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=no;document.head.appendChild(s)})}
  var V='10.12.2';
  window.owBackend=async function(){
    if(!window.OW_FIREBASE)return null;
    await load('https://www.gstatic.com/firebasejs/'+V+'/firebase-app-compat.js');
    await load('https://www.gstatic.com/firebasejs/'+V+'/firebase-firestore-compat.js');
    if(!firebase.apps.length)firebase.initializeApp(window.OW_FIREBASE);
    return firebase.firestore();
  };
  window.owIsAdmin=function(){if(!window.OW_ADMIN_PIN)return true;try{return sessionStorage.getItem('ow-admin')==='1'}catch(e){return false}};
  window.owAdminButton=function(onUnlock){
    if(window.owIsAdmin())return;
    var b=document.createElement('button');b.type='button';b.textContent='Organizer login';
    b.style.cssText='position:fixed;left:12px;bottom:12px;z-index:50;min-height:40px;padding:8px 14px;border-radius:999px;border:1px solid #D9B460;background:rgba(10,18,44,.9);color:#F0D58C;font:600 13px system-ui,sans-serif;cursor:pointer';
    b.onclick=function(){var p=window.prompt('Organizer PIN');if(p===null)return;if(p===String(window.OW_ADMIN_PIN)){try{sessionStorage.setItem('ow-admin','1')}catch(e){}b.remove();onUnlock()}else{window.alert('Wrong PIN')}};
    document.body.appendChild(b);
  };
})();
