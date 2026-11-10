const menu = document.querySelector('.menu');
const nav = document.querySelector('#navigation');
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('open');}));
document.querySelector('#year').textContent = new Date().getFullYear();
const projects = {
 "accounts-payable": {
  title: "Accounts Payable Automation",
  tags: "WORKFLOW AUTOMATION · DOCUMENT PROCESSING",
  summary: "A workflow that takes invoices from email intake to reviewed accounting records.",
  problem: "Invoice processing was spread across emails, attachments, manual data entry, document folders, and approval steps. Missing details and duplicate invoices made the process harder to track.",
  contribution: "I built the workflow that extracts invoice details, validates the data, checks for duplicates, organizes the documents, and keeps review and approval states visible.",
  workflow: ["Collect invoice emails and supported attachments.", "Extract the key invoice fields and validate them.", "Flag duplicates, missing details, and unusual records for review.", "Organize approved documents and pass approved records to QuickBooks."],
  stack: "Workflow automation · Email and document processing · OCR / structured extraction · Validation rules · QuickBooks integration · Data storage",
  result: "Invoices move through one consistent process, while exceptions and approvals remain visible to the people responsible for reviewing them."
 },
 "hotel-reporting": {
  title: "Hotel Reporting Dashboard",
  tags: "DATA PIPELINES · BUSINESS INTELLIGENCE",
  summary: "A reporting workflow that turns daily revenue and booking files into a clear management view.",
  problem: "Revenue and booking reports arrived as separate files with different structures, dates, and totals. Bringing them together manually made daily checks and forward-looking reporting difficult.",
  contribution: "I built the process that extracts the reports, checks the data, combines the results, calculates the core hotel metrics, and prepares the dashboard and management summary.",
  workflow: ["Collect the daily revenue and booking reports.", "Check dates, expected fields, totals, and file completeness.", "Combine validated records and calculate revenue, occupancy, ADR, and RevPAR.", "Prepare the dashboard, management summary, and booking forecast."],
  stack: "Python · Data extraction · Validation pipelines · Tabular data processing · Dashboarding · Reporting automation",
  result: "The reporting process produces a consistent view of daily performance and forward bookings, while making data issues visible before the summary is shared."
 }
};
const dialog = document.querySelector('#project-dialog');
let opener;
for (const button of document.querySelectorAll('[data-project]')) button.addEventListener('click', () => {
 const p = projects[button.dataset.project]; opener = button;
 const content = document.querySelector('#dialog-content'); content.replaceChildren();
 const add = (tag, text, cls) => { const el = document.createElement(tag); el.textContent = text; if(cls) el.className=cls; content.append(el); return el; };
 add('p',p.tags,'dialog-tags'); add('h2',p.title).id='dialog-title'; add('p',p.summary); add('h3','The problem'); add('p',p.problem); add('h3','My contribution'); add('p',p.contribution); add('h3','Workflow');
 const list=add('ul',''); p.workflow.forEach(text=>{const li=document.createElement('li');li.textContent=text;list.append(li);});
 add('h3','Technologies');add('p',p.stack);add('h3','Resulting functionality');add('p',p.result);
 dialog.showModal();dialog.scrollTop=0;document.body.classList.add('modal-open');
});
document.querySelectorAll('.close-dialog').forEach(button => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', event => { if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();} });
dialog.addEventListener('close', () => {document.body.classList.remove('modal-open');opener?.focus();});

const heroArt = document.querySelector('[data-hero-art]');
if (heroArt && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
 const resetHero = () => { heroArt.style.setProperty('--mx', '0px'); heroArt.style.setProperty('--my', '0px'); };
 heroArt.addEventListener('pointermove', event => {
  const rect = heroArt.getBoundingClientRect();
  const relativeX = (event.clientX - rect.left) / rect.width;
  const relativeY = (event.clientY - rect.top) / rect.height;
  const x = (relativeX - .5) * 34;
  const y = (relativeY - .5) * 34;
  heroArt.style.setProperty('--mx', `${x}px`);
  heroArt.style.setProperty('--my', `${y}px`);
  heroArt.style.setProperty('--px', `${relativeX * 100}%`);
  heroArt.style.setProperty('--py', `${relativeY * 100}%`);
 });
 heroArt.addEventListener('pointerleave', resetHero);
 heroArt.addEventListener('blur', resetHero);
}

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
 document.querySelectorAll('[data-brand]').forEach(brand => {
  const resetBrand = () => { brand.style.setProperty('--bx', '0deg'); brand.style.setProperty('--by', '0deg'); };
  brand.addEventListener('pointermove', event => {
   const rect = brand.getBoundingClientRect();
   const x = ((event.clientX - rect.left) / rect.width - .5) * 12;
   const y = ((event.clientY - rect.top) / rect.height - .5) * -12;
   brand.style.setProperty('--bx', `${x}deg`);
   brand.style.setProperty('--by', `${y}deg`);
  });
  brand.addEventListener('pointerleave', resetBrand);
  brand.addEventListener('blur', resetBrand);
 });
}

const contactForm = document.querySelector('#contact-form');
if (contactForm) {
 const status = contactForm.querySelector('.form-status');
 const submit = contactForm.querySelector('button[type="submit"]');
 const submitLabel = submit.innerHTML;
 const showSuccess = name => {
  const note = document.createElement('span');
  note.className = 'success-note';
  const icon = document.createElement('span');
  icon.className = 'success-icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = '✓';
  const copy = document.createElement('span');
  const heading = document.createElement('strong');
  heading.textContent = `Message landed, ${name}.`;
  const detail = document.createElement('span');
  detail.textContent = 'Thanks for reaching out. I’ll read it personally and reply by email as soon as I can.';
  copy.append(heading, detail);
  note.append(icon, copy);
  status.replaceChildren(note);
  status.classList.add('success');
 };
 contactForm.elements.startedAt.value = String(Date.now());
 contactForm.addEventListener('submit', async event => {
  event.preventDefault();
  status.className = 'form-status';
  if (!contactForm.reportValidity()) return;
  const endpoint = contactForm.dataset.endpoint;
  if (!endpoint) {
   status.textContent = 'The secure form is temporarily unavailable. Please connect with me on LinkedIn.';
   status.classList.add('error');
   return;
  }
  submit.disabled = true;
  submit.textContent = 'Sending…';
  status.textContent = '';
  const payload = Object.fromEntries(new FormData(contactForm));
  try {
   const response = await fetch(endpoint, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
   const result = await response.json().catch(() => ({}));
   if (!response.ok) throw new Error(result.error || 'Unable to send your message.');
   const senderName = String(payload.name || '').trim().split(/\s+/)[0] || 'there';
   contactForm.reset();
   contactForm.elements.startedAt.value = String(Date.now());
   showSuccess(senderName);
  } catch (error) {
   status.textContent = `${error.message} Please try again or connect with me on LinkedIn.`;
   status.classList.add('error');
  } finally {
   submit.disabled = false;
   submit.innerHTML = submitLabel;
  }
 });
 if (location.hostname === 'localhost' && new URLSearchParams(location.search).get('message') === 'sent') {
  showSuccess('Alex');
 }
}
