document.addEventListener('DOMContentLoaded',function(){
 const toggle=document.getElementById('mrk-menu-toggle'),menu=document.getElementById('mrk-menu');
 if(toggle&&menu){toggle.addEventListener('click',()=>menu.classList.toggle('open'));menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));}
 const search=document.getElementById('mrk-service-search'),cards=document.querySelectorAll('#mrk-services .mrk-card');
 if(search){search.addEventListener('input',function(){const q=this.value.toLowerCase().trim();cards.forEach(c=>c.style.display=(!q||c.dataset.search.includes(q))?'':'none');});}
 const service=document.getElementById('mrk-est-service'),scope=document.getElementById('mrk-est-scope'),output=document.getElementById('mrk-est-output');
 const prices={website:25000,wordpress:30000,ecommerce:45000,webapp:55000,automation:20000,design:10000};
 const names={website:'Business Website',wordpress:'WordPress Website',ecommerce:'E-commerce Store',webapp:'Custom Web App',automation:'PLC / Arduino Automation',design:'Graphic / Digital Design'};
 function estimate(){if(!service||!scope||!output)return;const base=prices[service]||25000;const mult={basic:.8,standard:1,advanced:1.8}[scope.value]||1;const low=Math.round(base*mult/1000)*1000;const high=Math.round(low*1.4/1000)*1000;output.textContent='PKR '+low.toLocaleString()+' – '+high.toLocaleString();}
 if(service&&scope){service.addEventListener('change',estimate);scope.addEventListener('change',estimate);estimate();}
});