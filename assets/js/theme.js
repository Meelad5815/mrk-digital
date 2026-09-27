document.addEventListener('DOMContentLoaded',function(){
 const toggle=document.getElementById('mrk-menu-toggle'), menu=document.getElementById('mrk-menu');
 if(toggle&&menu){toggle.addEventListener('click',()=>menu.classList.toggle('open'));menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));}
 const search=document.getElementById('mrk-service-search'), cards=document.querySelectorAll('#mrk-services .mrk-card');
 if(search){search.addEventListener('input',function(){const q=this.value.toLowerCase().trim();cards.forEach(c=>c.style.display=(!q||c.dataset.search.includes(q))?'':'none');});}
});