// WhatsApp number in international format without the plus sign (Tanzania +255).
const WHATSAPP_NUMBER="255621823974";
// Email address that receives messages from the contact form.
const CONTACT_EMAIL="jally1056@gmail.com";

// Every WhatsApp button opens a chat with a ready message.
document.querySelectorAll(".whatsapp-link").forEach((l)=>{
const m=l.dataset.message||"Hello Dumbuli Technology, I would like to discuss your services.";
l.href="https://wa.me/"+WHATSAPP_NUMBER+"?text="+encodeURIComponent(m);l.target="_blank";l.rel="noopener noreferrer";});

const emailText=document.getElementById("emailText");
if(emailText){emailText.textContent=CONTACT_EMAIL;emailText.href="mailto:"+CONTACT_EMAIL;}

// Contact form: the message is sent to the email inbox (through FormSubmit).
const form=document.getElementById("contactForm");
if(form){
const status=document.getElementById("formStatus");
const btn=form.querySelector('button[type="submit"]');
form.addEventListener("submit",async(e)=>{
e.preventDefault();
status.className="form-status";
if(!form.checkValidity()){form.reportValidity();return;}
const d=new FormData(form);
if(d.get("_honey"))return;
const payload={name:d.get("name"),email:d.get("email"),phone:d.get("phone")||"Not provided",service:d.get("service"),message:d.get("message"),_subject:"Website enquiry: "+d.get("service")+" ("+d.get("name")+")",_template:"table"};
const label=btn.innerHTML;btn.disabled=true;btn.textContent="Sending...";status.textContent="";
try{
const res=await fetch("https://formsubmit.co/ajax/"+CONTACT_EMAIL,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(payload)});
const data=await res.json();
if(!res.ok||String(data.success)==="false")throw new Error(data.message||"send failed");
form.reset();
status.textContent="Thank you! Your message has been sent. We will reply to you soon.";
}catch(err){
status.className="form-status error";
const body="Name: "+payload.name+"\nPhone: "+payload.phone+"\nService: "+payload.service+"\n\n"+payload.message;
status.innerHTML='We could not send the form. Please <a href="mailto:'+CONTACT_EMAIL+'?subject='+encodeURIComponent(payload._subject)+'&body='+encodeURIComponent(body)+'">click here to email us</a> or message us on WhatsApp.';
}finally{btn.disabled=false;btn.innerHTML=label;}
});}

// Mobile navigation.
const toggle=document.getElementById("menuToggle"),nav=document.getElementById("navLinks");
const MENU='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
const CLOSE='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
function closeMenu(){nav.classList.remove("open");document.body.classList.remove("menu-open");toggle.setAttribute("aria-expanded","false");toggle.setAttribute("aria-label","Open navigation menu");toggle.innerHTML=MENU;}
toggle.addEventListener("click",()=>{const o=nav.classList.toggle("open");document.body.classList.toggle("menu-open",o);toggle.setAttribute("aria-expanded",String(o));toggle.setAttribute("aria-label",o?"Close navigation menu":"Open navigation menu");toggle.innerHTML=o?CLOSE:MENU;});
nav.querySelectorAll("a").forEach((a)=>a.addEventListener("click",closeMenu));
document.addEventListener("keydown",(e)=>{if(e.key==="Escape")closeMenu();});
window.addEventListener("resize",()=>{if(window.innerWidth>1100)closeMenu();});

// Reveal sections as they scroll into view.
const items=document.querySelectorAll(".reveal");
if("IntersectionObserver" in window){const io=new IntersectionObserver((es,o)=>{es.forEach((e)=>{if(e.isIntersecting){e.target.classList.add("is-visible");o.unobserve(e.target);}});},{threshold:.12});items.forEach((el)=>io.observe(el));}
else{items.forEach((el)=>el.classList.add("is-visible"));}
document.getElementById("currentYear").textContent=new Date().getFullYear();
