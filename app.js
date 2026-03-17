(() => {
  'use strict';

  const i18n = {
    ht:{
      welcome_title:'Byenveni sou Garoms-tech',welcome_sub:'Vitrin pwofesyonèl. Konfyans. Inovasyon. Kwasans.',
      nav_home:'Akèy',nav_services:'Sèvis',nav_plans:'Plan',nav_login:'Konekte',nav_contact:'Kontak',
      hero_kicker:'Vitrin ofisyèl Garoms-tech',hero_title:'Nou ede biznis grandi ak solisyon dijital solid',
      hero_text:'Garoms-tech bay sèvis dijital nan tout mond lan: estrateji, devlopman, maketing, ak automatisation. Nou bati sistèm serye pou antrepriz kap chèche rezilta.',
      btn_discover_services:'Dekouvri sèvis yo',btn_discover_zengo:'Dekouvri Zengo-JGM',global_title:'Sèvis mondyal',global_text:'Garoms-tech sèvi kliyan entènasyonal: mak, PME, startup ak òganizasyon ki bezwen solisyon dijital pwofesyonèl.',
      haiti_title:'Platfòm Ayiti 🇭🇹',haiti_text:'Zengo-JGM fèt espesyalman pou moun kap viv Ayiti: Liv Dèt Digital, analiz mache lokal, maketing, ekip, ak zouti kwasans.',btn_start_now:'Kòmanse kounya',
      mod1_title:'Liv Dèt Digital',mod1_text:'Swiv dèt kliyan yo klèman, jere delè, epi amelyore cashflow biznis ou.',mod2_title:'Analiz Mache',mod2_text:'Konprann sa ki vann nan chak zòn pou pran pi bon desizyon anvan depans.',mod3_title:'Maketing & Kominikasyon',mod3_text:'Kreye kanpay pwofesyonèl pou pwodwi ak sèvis ou yo, avèk mesaj ki konvenk kliyan.',
      foot_about:'Entreprise dijital pwofesyonèl ki bay sèvis atravè mond lan.',foot_zengo:'Platfòm espesyal pou mache Ayiti 🇭🇹 : Liv Dèt, Market, Marketing, Team, AI.',foot_contact:'Kontak santral',foot_legal:'Legal',
      msg_login:'Demann koneksyon an voye. Sesyon ou ap aktive apre verifikasyon.',msg_pwd:'Modpas yo pa menm.',msg_register:'Kont lan kreye. Tcheke imèl ou pou verifikasyon.',msg_recovery:'Kòd rekiperasyon an voye an sekirite.',msg_required:'Tanpri ranpli chan obligatwa yo.',msg_saved:'Dosye sove avèk siksè.',msg_limit:'⚠️ Ou rive nan limit plan an. Fè upgrade pou kontinye.',msg_ok:'✅ Asistan otomatik: kont ou an bon eta.',msg_payment:'Nou resevwa prèv peman an. Ekip Garoms-tech ap verifye li.'
    },
    fr:{welcome_title:'Bienvenue sur Garoms-tech',welcome_sub:'Vitrine professionnelle. Confiance. Innovation. Croissance.',nav_home:'Accueil',nav_services:'Services',nav_plans:'Plans',nav_login:'Connexion',nav_contact:'Contact',hero_kicker:'Vitrine officielle Garoms-tech',hero_title:'Nous aidons les entreprises à grandir avec des solutions digitales solides',hero_text:'Garoms-tech fournit des services digitaux dans le monde entier : stratégie, développement, marketing et automatisation.',btn_discover_services:'Découvrir les services',btn_discover_zengo:'Découvrir Zengo-JGM',global_title:'Services mondiaux',global_text:'Garoms-tech accompagne des clients internationaux.',haiti_title:'Plateforme Haïti 🇭🇹',haiti_text:'Zengo-JGM est conçu spécialement pour Haïti.',btn_start_now:'Commencer maintenant',mod1_title:'Livre de Dettes Digital',mod1_text:'Suivez clairement les dettes clients.',mod2_title:'Analyse de marché',mod2_text:'Comprenez quoi vendre et où.',mod3_title:'Marketing & Communication',mod3_text:'Lancez des campagnes professionnelles.',foot_about:'Entreprise digitale professionnelle au service du monde.',foot_zengo:'Plateforme spéciale pour Haïti 🇭🇹',foot_contact:'Contact central',foot_legal:'Légal',msg_login:'Demande de connexion envoyée.',msg_pwd:'Les mots de passe ne correspondent pas.',msg_register:'Compte créé. Vérifiez votre email.',msg_recovery:'Code de récupération envoyé.',msg_required:'Veuillez remplir les champs obligatoires.',msg_saved:'Enregistrement réussi.',msg_limit:'⚠️ Limite du plan atteinte.',msg_ok:'✅ Assistant automatique : compte en bon état.',msg_payment:'Preuve de paiement reçue.'},
    en:{welcome_title:'Welcome to Garoms-tech',welcome_sub:'Professional showcase. Trust. Innovation. Growth.',nav_home:'Home',nav_services:'Services',nav_plans:'Plans',nav_login:'Login',nav_contact:'Contact',hero_kicker:'Official Garoms-tech showcase',hero_title:'We help businesses grow with strong digital solutions',hero_text:'Garoms-tech delivers global digital services: strategy, development, marketing and automation.',btn_discover_services:'Discover services',btn_discover_zengo:'Discover Zengo-JGM',global_title:'Global services',global_text:'Garoms-tech serves international clients.',haiti_title:'Haiti platform 🇭🇹',haiti_text:'Zengo-JGM is designed especially for Haiti.',btn_start_now:'Start now',mod1_title:'Digital Debt Book',mod1_text:'Track customer debt clearly.',mod2_title:'Market Analysis',mod2_text:'Understand what to sell and where.',mod3_title:'Marketing & Communication',mod3_text:'Launch professional campaigns.',foot_about:'Professional digital company serving globally.',foot_zengo:'Special platform for Haiti 🇭🇹',foot_contact:'Central contact',foot_legal:'Legal',msg_login:'Login request sent.',msg_pwd:'Passwords do not match.',msg_register:'Account created. Check your email.',msg_recovery:'Recovery code sent.',msg_required:'Please complete required fields.',msg_saved:'Record saved successfully.',msg_limit:'⚠️ Plan limit reached.',msg_ok:'✅ Automatic assistant: account is healthy.',msg_payment:'Payment proof received.'}
  };

  const $ = (s)=>document.querySelector(s);
  const $$ = (s)=>Array.from(document.querySelectorAll(s));
  const langKey='gt-lang', themeKey='gt-theme';

  const preloader = $('#preloader'); if(preloader) setTimeout(()=>preloader.remove(),3200);
  const menuBtn = $('#menuBtn'); const menu = $('#menu'); if(menuBtn&&menu) menuBtn.addEventListener('click',()=>menu.classList.toggle('open'));

  const root=document.documentElement;
  if(localStorage.getItem(themeKey)==='dark') root.classList.add('dark');
  const themeToggle=$('#themeToggle');
  if(themeToggle){ themeToggle.textContent=root.classList.contains('dark')?'☀️':'🌙'; themeToggle.addEventListener('click',()=>{root.classList.toggle('dark'); const d=root.classList.contains('dark'); localStorage.setItem(themeKey,d?'dark':'light'); themeToggle.textContent=d?'☀️':'🌙';});}

  const getLang=()=>localStorage.getItem(langKey)||'ht';
  const tr=(k)=> (i18n[getLang()]||i18n.ht)[k] || k;
  const applyLang=(lang)=>{const d=i18n[lang]||i18n.ht; $$('[data-i18n]').forEach(el=>{const k=el.getAttribute('data-i18n'); if(d[k]) el.textContent=d[k];}); document.documentElement.lang=lang;};

  const langSelect=$('#langSelect');
  const savedLang=getLang();
  if(langSelect){langSelect.value=savedLang; langSelect.addEventListener('change',()=>{localStorage.setItem(langKey,langSelect.value); applyLang(langSelect.value);});}
  applyLang(savedLang);

  const io=new IntersectionObserver((entries)=>entries.forEach(e=>e.isIntersecting&&e.target.classList.add('in')),{threshold:.15}); $$('.reveal').forEach(el=>io.observe(el));

  const setNote=(id,msg)=>{const el=$(id); if(el) el.textContent=msg;};

  $('#loginForm')?.addEventListener('submit',(e)=>{e.preventDefault(); setNote('#loginNote',tr('msg_login')); e.target.reset();});
  $('#registerForm')?.addEventListener('submit',(e)=>{e.preventDefault(); const fd=new FormData(e.target); if(String(fd.get('password')||'')!==String(fd.get('confirm')||'')) return setNote('#registerNote',tr('msg_pwd')); setNote('#registerNote',tr('msg_register')); e.target.reset();});
  $('#recoveryForm')?.addEventListener('submit',(e)=>{e.preventDefault(); setNote('#recoveryNote',tr('msg_recovery')); e.target.reset();});

  const profileForm=$('#businessProfileForm'), profilePreview=$('#profilePreview'), customerLink=$('#customerLink');
  if(profileForm&&profilePreview){
    profileForm.addEventListener('submit',(e)=>{e.preventDefault(); const fd=new FormData(profileForm); const p={}; for(const [k,v] of fd.entries()) p[k]=String(v||'').trim(); localStorage.setItem('gt-business-profile',JSON.stringify(p)); const slug=encodeURIComponent((p.businessName||'business').toLowerCase().replace(/\s+/g,'-')); const link=`${location.origin}${location.pathname.replace(/[^/]+$/,'')}platform.html?merchant=${slug}`; if(customerLink) customerLink.value=link; profilePreview.innerHTML=`<strong>${p.businessName||'Business'}</strong><br>${p.businessType||''}<br>${p.country||''} • ${p.city||''} • ${p.local||''}<br>${p.services||''}<br>${p.email||''} • ${p.phone||''}`;});
  }
  $('#inviteForm')?.addEventListener('submit',(e)=>{e.preventDefault(); const fd=new FormData(e.target); const code=(String(fd.get('business')||'GAROM').slice(0,5).toUpperCase())+Math.floor(Math.random()*900+100); const out=$('#referralOutput'); if(out) out.value=`${location.origin}/pricing.html?ref=${code}`;});

  const debtForm=$('#debtForm'), debtTable=$('#debtTable');
  if(debtForm&&debtTable){
    let rows=[]; try{rows=JSON.parse(localStorage.getItem('gt-ledger')||'[]')}catch{rows=[]}
    const save=()=>localStorage.setItem('gt-ledger',JSON.stringify(rows)); const fmt=new Intl.NumberFormat('fr-HT');
    const render=()=>{const q=(($('#searchInput')?.value)||'').toLowerCase().trim(); const f=(($('#filterKind')?.value)||'all'); const list=rows.filter(r=>{const t=`${r.client} ${r.phone} ${r.item} ${r.note}`.toLowerCase(); if(q&&!t.includes(q)) return false; if(f==='receivable'||f==='payable') return r.kind===f; if(f==='paid') return r.paid; if(f==='unpaid') return !r.paid; return true;}); debtTable.innerHTML=list.length?list.map(r=>`<tr><td><strong>${r.client}</strong><br><span class='small'>${r.phone||'-'}</span><br><span class='small'>${r.item||''}</span></td><td><span class='badge ${r.kind==='receivable'?'rec':'pay'}'>${r.kind==='receivable'?'Kliyan dwe mwen':'Mwen dwe'}</span></td><td>${fmt.format(r.amount)} HTG</td><td>${r.dueDate||'-'}</td><td><span class='badge ${r.paid?'paid':'unpaid'}'>${r.paid?'Peye':'Louvri'}</span></td><td><button class='icon-btn' data-act='toggle' data-id='${r.id}'>${r.paid?'Retabli':'Make peye'}</button> <button class='icon-btn' data-act='del' data-id='${r.id}'>Efase</button></td></tr>`).join(''):'<tr><td colspan="6">Pa gen dosye.</td></tr>'; const rec=rows.filter(r=>r.kind==='receivable'&&!r.paid).reduce((a,b)=>a+b.amount,0); const pay=rows.filter(r=>r.kind==='payable'&&!r.paid).reduce((a,b)=>a+b.amount,0); const active=rows.filter(r=>!r.paid).length; $('#totalReceivable')&&( $('#totalReceivable').textContent=`${fmt.format(rec)} HTG`); $('#totalPayable')&&($('#totalPayable').textContent=`${fmt.format(pay)} HTG`); $('#activeCount')&&($('#activeCount').textContent=String(active)); const limits={free:30,week:200,month:1000,year:5000}; const limit=limits[$('#planSelect')?.value||'free']||30; $('#planLimitInfo')&&($('#planLimitInfo').textContent=`Plan limit: ${limit} active records.`); $('#autoMessage')&&($('#autoMessage').textContent=active>limit?tr('msg_limit'):tr('msg_ok')); };
    debtForm.addEventListener('submit',(e)=>{e.preventDefault(); const fd=new FormData(debtForm); const client=String(fd.get('clientName')||'').trim(); const amount=Number(fd.get('amount')||0); if(!client||amount<=0) return setNote('#formNote',tr('msg_required')); rows.unshift({id:crypto.randomUUID(),client,phone:String(fd.get('phone')||''),item:String(fd.get('item')||''),kind:String(fd.get('kind')||'receivable'),amount,dueDate:String(fd.get('dueDate')||''),note:String(fd.get('note')||''),paid:false}); save(); debtForm.reset(); setNote('#formNote',tr('msg_saved')); render();});
    debtTable.addEventListener('click',(e)=>{const b=e.target.closest('button'); if(!b) return; const id=b.dataset.id, act=b.dataset.act; if(act==='del') rows=rows.filter(r=>r.id!==id); if(act==='toggle') rows=rows.map(r=>r.id===id?{...r,paid:!r.paid}:r); save(); render();});
    $('#searchInput')?.addEventListener('input',render); $('#filterKind')?.addEventListener('change',render); $('#planSelect')?.addEventListener('change',render); render();
  }

  const bindList=(formSel,listSel,key,fmt)=>{const f=$(formSel), l=$(listSel); if(!f||!l) return; let a=[]; try{a=JSON.parse(localStorage.getItem(key)||'[]')}catch{} const save=()=>localStorage.setItem(key,JSON.stringify(a)); const render=()=>{l.innerHTML=a.length?a.map((it,i)=>`<li class='list-row'><div>${fmt(it)}</div><button class='icon-btn' data-del='${i}'>Retire</button></li>`).join(''):'<li class="small">Pa gen done ankò.</li>'}; f.addEventListener('submit',(e)=>{e.preventDefault(); const fd=new FormData(f); const o={}; for(const [k,v] of fd.entries()) o[k]=String(v||'').trim(); a.unshift(o); save(); f.reset(); render();}); l.addEventListener('click',(e)=>{const b=e.target.closest('button'); if(!b) return; const i=Number(b.dataset.del); if(Number.isInteger(i)){a.splice(i,1); save(); render();}}); render();};
  bindList('#productForm','#productList','gt-products',(p)=>`<strong>${p.name}</strong> • ${p.category||'Jeneral'} • ${p.price||0} HTG • stock ${p.stock||0}<br><span class='small'>${p.description||''}</span>`);
  bindList('#teamForm','#teamList','gt-team',(m)=>`<strong>${m.name}</strong> — ${m.role||'Manm'}<br><span class='small'>${m.phone||''} • ${m.email||''}</span>`);
  bindList('#agendaForm','#agendaList','gt-agenda',(a)=>`<strong>${a.title}</strong> (${a.priority||'Mwayen'}) — ${a.date}<br><span class='small'>${a.details||''}</span>`);

  $('#marketingForm')?.addEventListener('submit',(e)=>{e.preventDefault(); const fd=new FormData(e.target); const out=$('#marketingOutput'); if(out) out.innerHTML=`<strong>${String(fd.get('title')||'Kanpay')}</strong><br>Odyans: ${String(fd.get('audience')||'Jeneral')}<br>Sijè: ${String(fd.get('subject')||'')}<hr>${String(fd.get('message')||'')}<br><em>Draft pare. Ou ka itilize l nan zouti imèl ou.</em>`; e.target.reset();});
  $('#paymentForm')?.addEventListener('submit',(e)=>{e.preventDefault(); setNote('#paymentNote',tr('msg_payment')); e.target.reset();});
})();
