// WhatsApp number in international format without the plus sign.
const WHATSAPP_NUMBER="255750742688";
// EDIT: the email address that receives messages from the contact form.
const CONTACT_EMAIL="info@YOUR-DOMAIN.example";

document.querySelectorAll(".whatsapp-link").forEach((l)=>{
const m=l.dataset.message||"Hello Dumbuli Technology, I would like to discuss your services.";
l.href="https://wa.me/"+WHATSAPP_NUMBER+"?text="+encodeURIComponent(m);l.target="_blank";l.rel="noopener noreferrer";});

const emailText=document.getElementById("emailText");
if(emailText)emailText.textContent=CONTACT_EMAIL;
const form=document.getElementById("contactForm");
if(form){const status=document.getElementById("formStatus");
form.addEventListener("submit",(e)=>{e.preventDefault();
if(!form.checkValidity()){form.reportValidity();return;}
const d=new FormData(form);
const subject="Website enquiry: "+d.get("service");
const body="Name: "+d.get("name")+"\nEmail: "+d.get("email")+"\nPhone: "+(d.get("phone")||"Not provided")+"\nService: "+d.get("service")+"\n\n"+d.get("message");
window.location.href="mailto:"+CONTACT_EMAIL+"?subject="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body);
status.textContent="Thank you! Your email app is opening. Press send to finish.";});}

const toggle=document.getElementById("menuToggle"),nav=document.getElementById("navLinks");
const MENU='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
const CLOSE='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
function closeMenu(){nav.classList.remove("open");document.body.classList.remove("menu-open");toggle.setAttribute("aria-expanded","false");toggle.setAttribute("aria-label","Open navigation menu");toggle.innerHTML=MENU;}
toggle.addEventListener("click",()=>{const o=nav.classList.toggle("open");document.body.classList.toggle("menu-open",o);toggle.setAttribute("aria-expanded",String(o));toggle.setAttribute("aria-label",o?"Close navigation menu":"Open navigation menu");toggle.innerHTML=o?CLOSE:MENU;});
nav.querySelectorAll("a").forEach((a)=>a.addEventListener("click",closeMenu));
document.addEventListener("keydown",(e)=>{if(e.key==="Escape")closeMenu();});
window.addEventListener("resize",()=>{if(window.innerWidth>1100)closeMenu();});

const items=document.querySelectorAll(".reveal");
if("IntersectionObserver" in window){const io=new IntersectionObserver((es,o)=>{es.forEach((e)=>{if(e.isIntersecting){e.target.classList.add("is-visible");o.unobserve(e.target);}});},{threshold:.12});items.forEach((el)=>io.observe(el));}
else{items.forEach((el)=>el.classList.add("is-visible"));}
document.getElementById("currentYear").textContent=new Date().getFullYear();
