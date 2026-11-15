const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});}
document.querySelectorAll('.nav a').forEach(a=>{if(a.pathname.split('/').pop()===location.pathname.split('/').pop()){a.classList.add('active');}});
const form=document.querySelector('#enquiry-form');
if(form){form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const subject=encodeURIComponent('Website enquiry - '+d.get('name'));const body=encodeURIComponent('Name: '+d.get('name')+'\nPhone: '+d.get('phone')+'\nService: '+d.get('service')+'\nMessage: '+d.get('message'));location.href='mailto:incometaxfile6@gmail.com?subject='+subject+'&body='+body;});}
