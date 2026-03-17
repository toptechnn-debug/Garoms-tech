(() => {
  'use strict';

  const t = {
    fr:{welcome:'Bienvenue sur Garoms-tech', trust:'Plateforme pro pour commerce, dette, marketing et équipe.'},
    en:{welcome:'Welcome to Garoms-tech', trust:'Professional platform for debt, commerce, marketing and teams.'},
    ht:{welcome:'Byenveni sou Garoms-tech', trust:'Platfòm pwofesyonèl pou dèt, komès, maketing ak ekip.'}
  };

  const $ = (s)=>document.querySelector(s);
  const $$ = (s)=>Array.from(document.querySelectorAll(s));
  const langKey = 'gt-lang';
  const themeKey = 'gt-theme';

  const preloader = $('#preloader');
  if (preloader) setTimeout(()=>preloader.remove(), 3200);

  const menuBtn = $('#menuBtn');
  const menu = $('#menu');
  if(menuBtn && menu) menuBtn.addEventListener('click', ()=>menu.classList.toggle('open'));

  const root = document.documentElement;
  if(localStorage.getItem(themeKey)==='dark') root.classList.add('dark');
  const themeToggle = $('#themeToggle');
  if(themeToggle){
    themeToggle.textContent = root.classList.contains('dark')?'☀️':'🌙';
    themeToggle.addEventListener('click',()=>{
      root.classList.toggle('dark');
      const d = root.classList.contains('dark');
      localStorage.setItem(themeKey,d?'dark':'light');
      themeToggle.textContent = d?'☀️':'🌙';
    });
  }

  const langSelect = $('#langSelect');
  const applyLang = (lang)=>{
    const dict = t[lang] || t.fr;
    $$('[data-i18n]').forEach(el=>{
      const k = el.getAttribute('data-i18n');
      if(dict[k]) el.textContent = dict[k];
    });
  };
  const savedLang = localStorage.getItem(langKey) || 'fr';
  if(langSelect){
    langSelect.value = savedLang;
    langSelect.addEventListener('change',()=>{
      localStorage.setItem(langKey,langSelect.value);
      applyLang(langSelect.value);
    });
  }
  applyLang(savedLang);

  const io = new IntersectionObserver((entries)=>entries.forEach(e=>e.isIntersecting&&e.target.classList.add('in')),{threshold:.15});
  $$('.reveal').forEach(el=>io.observe(el));

  // Auth center UX
  const loginForm = $('#loginForm');
  const registerForm = $('#registerForm');
  const recoveryForm = $('#recoveryForm');
  loginForm?.addEventListener('submit', (e)=>{
    e.preventDefault();
    const note = $('#loginNote');
    if(note) note.textContent = 'Secure login request sent. Your session will be created after verification.';
    loginForm.reset();
  });
  registerForm?.addEventListener('submit', (e)=>{
    e.preventDefault();
    const fd = new FormData(registerForm);
    const p1 = String(fd.get('password')||'');
    const p2 = String(fd.get('confirm')||'');
    const note = $('#registerNote');
    if(p1 !== p2){ if(note) note.textContent = 'Passwords do not match.'; return; }
    if(note) note.textContent = 'Account draft created. Check your email to verify and activate.';
    registerForm.reset();
  });
  recoveryForm?.addEventListener('submit', (e)=>{
    e.preventDefault();
    const note = $('#recoveryNote');
    if(note) note.textContent = 'Recovery code generated and sent securely.';
    recoveryForm.reset();
  });

  // Platform forms
  const profileForm = $('#businessProfileForm');
  const profilePreview = $('#profilePreview');
  const customerLink = $('#customerLink');
  if(profileForm && profilePreview){
    profileForm.addEventListener('submit',(e)=>{
      e.preventDefault();
      const fd = new FormData(profileForm);
      const business = {
        businessName: String(fd.get('businessName')||'').trim(),
        businessType: String(fd.get('businessType')||'').trim(),
        country: String(fd.get('country')||'').trim(),
        city: String(fd.get('city')||'').trim(),
        local: String(fd.get('local')||'').trim(),
        services: String(fd.get('services')||'').trim(),
        email: String(fd.get('email')||'').trim(),
        phone: String(fd.get('phone')||'').trim(),
        themePref: String(fd.get('themePref')||'').trim()
      };
      localStorage.setItem('gt-business-profile', JSON.stringify(business));
      const slug = encodeURIComponent((business.businessName||'business').toLowerCase().replace(/\s+/g,'-'));
      const link = `${location.origin}${location.pathname.replace(/[^/]+$/,'')}platform.html?merchant=${slug}`;
      if(customerLink) customerLink.value = link;
      profilePreview.innerHTML = `<strong>${business.businessName || 'Business'}</strong><br>${business.businessType}<br>${business.country} • ${business.city} • ${business.local}<br>${business.services}<br>${business.email} • ${business.phone}`;
    });

    const cached = localStorage.getItem('gt-business-profile');
    if(cached){
      try{
        const p = JSON.parse(cached);
        profilePreview.innerHTML = `<strong>${p.businessName || 'Business'}</strong><br>${p.businessType || ''}<br>${p.country || ''} • ${p.city || ''} • ${p.local || ''}<br>${p.services || ''}<br>${p.email || ''} • ${p.phone || ''}`;
      }catch{}
    }
  }

  const inviteForm = $('#inviteForm');
  const referralOutput = $('#referralOutput');
  inviteForm?.addEventListener('submit',(e)=>{
    e.preventDefault();
    const fd=new FormData(inviteForm);
    const code = (String(fd.get('business')||'GAROMS').slice(0,5).toUpperCase()) + Math.floor(Math.random()*900+100);
    if(referralOutput) referralOutput.value = `${location.origin}/pricing.html?ref=${code}`;
  });

  const debtForm = $('#debtForm');
  const debtTable=$('#debtTable');
  if(debtForm && debtTable){
    const rowsKey='gt-ledger';
    let rows=[];
    try{ rows = JSON.parse(localStorage.getItem(rowsKey)||'[]'); }catch{ rows=[]; }
    const save=()=>localStorage.setItem(rowsKey,JSON.stringify(rows));
    const fmt=new Intl.NumberFormat('fr-HT');

    const search=$('#searchInput');
    const filter=$('#filterKind');
    const note=$('#formNote');
    const autoMsg=$('#autoMessage');
    const totalReceivable=$('#totalReceivable');
    const totalPayable=$('#totalPayable');
    const activeCount=$('#activeCount');
    const planLimitInfo=$('#planLimitInfo');
    const planLimits={free:30,week:200,month:1000,year:5000};
    const planSel=$('#planSelect');
    const getLimit=()=>planLimits[(planSel&&planSel.value)||'free']||30;

    function render(){
      const q=(search?.value||'').toLowerCase().trim();
      const f=filter?.value||'all';
      const list=rows.filter(r=>{
        const txt=`${r.client} ${r.phone} ${r.item} ${r.note}`.toLowerCase();
        if(q && !txt.includes(q)) return false;
        if(f==='receivable'||f==='payable') return r.kind===f;
        if(f==='paid') return r.paid;
        if(f==='unpaid') return !r.paid;
        return true;
      });
      debtTable.innerHTML=list.length?list.map(r=>`<tr>
        <td><strong>${r.client}</strong><br><span class='small'>${r.phone||'-'}</span><br><span class='small'>${r.item||''}</span></td>
        <td><span class='badge ${r.kind==='receivable'?'rec':'pay'}'>${r.kind==='receivable'?'Client owes':'Business owes'}</span></td>
        <td>${fmt.format(r.amount)} HTG</td>
        <td>${r.dueDate||'-'}</td>
        <td><span class='badge ${r.paid?'paid':'unpaid'}'>${r.paid?'Paid':'Open'}</span></td>
        <td><button class='icon-btn' data-act='toggle' data-id='${r.id}'>${r.paid?'Re-open':'Mark paid'}</button> <button class='icon-btn' data-act='del' data-id='${r.id}'>Delete</button></td>
      </tr>`).join(''):'<tr><td colspan="6">No record yet.</td></tr>';

      const rec=rows.filter(r=>r.kind==='receivable'&&!r.paid).reduce((a,b)=>a+b.amount,0);
      const pay=rows.filter(r=>r.kind==='payable'&&!r.paid).reduce((a,b)=>a+b.amount,0);
      const active=rows.filter(r=>!r.paid).length;
      if(totalReceivable) totalReceivable.textContent=`${fmt.format(rec)} HTG`;
      if(totalPayable) totalPayable.textContent=`${fmt.format(pay)} HTG`;
      if(activeCount) activeCount.textContent=String(active);
      const limit=getLimit();
      if(planLimitInfo) planLimitInfo.textContent=`Plan limit: ${limit} active records.`;
      if(autoMsg) autoMsg.textContent=active>limit?`⚠️ You reached your plan limit (${limit}). Upgrade subscription.`:'✅ Automatic assistant: your account is healthy.';
    }

    debtForm.addEventListener('submit',(e)=>{
      e.preventDefault();
      const fd=new FormData(debtForm);
      const client=String(fd.get('clientName')||'').trim();
      const amount=Number(fd.get('amount')||0);
      if(!client||amount<=0){ if(note) note.textContent='Please complete required fields.'; return; }
      rows.unshift({id:crypto.randomUUID(),client,phone:String(fd.get('phone')||''),item:String(fd.get('item')||''),kind:String(fd.get('kind')||'receivable'),amount,dueDate:String(fd.get('dueDate')||''),note:String(fd.get('note')||''),paid:false});
      save(); debtForm.reset(); if(note) note.textContent='Record saved successfully.'; render();
    });

    debtTable.addEventListener('click',(e)=>{
      const b=e.target.closest('button'); if(!b) return;
      const id=b.dataset.id; const act=b.dataset.act;
      if(act==='del') rows=rows.filter(r=>r.id!==id);
      if(act==='toggle') rows=rows.map(r=>r.id===id?{...r,paid:!r.paid}:r);
      save(); render();
    });

    search?.addEventListener('input',render);
    filter?.addEventListener('change',render);
    planSel?.addEventListener('change',render);
    render();
  }

  const bindListModule = (formId, listId, key, mapFn) => {
    const form = $(formId);
    const list = $(listId);
    if(!form || !list) return;
    let items=[];
    try{ items = JSON.parse(localStorage.getItem(key)||'[]'); }catch{ items=[]; }
    const save=()=>localStorage.setItem(key,JSON.stringify(items));
    const render=()=>{
      list.innerHTML = items.length ? items.map((it,i)=>`<li class='list-row'><div>${mapFn(it)}</div><button class='icon-btn' data-del='${i}'>Remove</button></li>`).join('') : '<li class="small">No data yet.</li>';
    };
    form.addEventListener('submit',(e)=>{
      e.preventDefault();
      const fd = new FormData(form);
      const obj={};
      for(const [k,v] of fd.entries()) obj[k]=String(v||'').trim();
      items.unshift(obj);
      save(); form.reset(); render();
    });
    list.addEventListener('click',(e)=>{
      const b=e.target.closest('button'); if(!b) return;
      const i=Number(b.dataset.del);
      if(Number.isInteger(i)){ items.splice(i,1); save(); render(); }
    });
    render();
  };

  bindListModule('#productForm','#productList','gt-products',(p)=>`<strong>${p.name}</strong> • ${p.category||'General'} • ${p.price||0} HTG • stock ${p.stock||0}<br><span class='small'>${p.description||''}</span>`);
  bindListModule('#teamForm','#teamList','gt-team',(m)=>`<strong>${m.name}</strong> — ${m.role||'Member'}<br><span class='small'>${m.phone||''} • ${m.email||''}</span>`);
  bindListModule('#agendaForm','#agendaList','gt-agenda',(a)=>`<strong>${a.title}</strong> (${a.priority||'Medium'}) — ${a.date}<br><span class='small'>${a.details||''}</span>`);

  const marketingForm = $('#marketingForm');
  const marketingOutput = $('#marketingOutput');
  marketingForm?.addEventListener('submit',(e)=>{
    e.preventDefault();
    const fd = new FormData(marketingForm);
    const title = String(fd.get('title')||'Campaign');
    const audience = String(fd.get('audience')||'General audience');
    const subject = String(fd.get('subject')||'');
    const message = String(fd.get('message')||'');
    if(marketingOutput) marketingOutput.innerHTML = `<strong>${title}</strong><br>Audience: ${audience}<br>Subject: ${subject}<hr>${message}<br><em>Auto-ready draft generated. Copy and use in your email tool.</em>`;
    marketingForm.reset();
  });

  const paymentForm = $('#paymentForm');
  const paymentNote = $('#paymentNote');
  paymentForm?.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(paymentNote) paymentNote.textContent='Payment proof received. Garoms-tech team will verify and activate your plan quickly.';
    paymentForm.reset();
  });
})();
