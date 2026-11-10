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
 },
 "clinic-operations": {
  title: "Clinic Lead & Marketing Operations",
  tags: "CRM · LEAD MANAGEMENT · MARKETING OPERATIONS",
  summary: "A focused workspace for coordinating enquiries, follow-ups, campaign sources, and team activity.",
  problem: "Lead information and marketing activity can become scattered across forms, inboxes, spreadsheets, and individual follow-up notes. That makes it difficult to understand where an enquiry came from, what should happen next, and which conversations still need attention.",
  contribution: "I designed the operational flow around a shared lead record, clear stages, ownership, follow-up dates, and campaign-source visibility. The interface keeps day-to-day actions visible without mixing them with clinical records.",
  workflow: ["Collect enquiries from approved lead sources.", "Create a shared lead record with source, owner, stage, and next action.", "Move each conversation through follow-up and consultation stages.", "Review campaign activity and outstanding team actions from one dashboard."],
  stack: "Web application · CRM workflows · Forms and API connections · Relational data · Reporting views · Role-based operations",
  result: "The system provides one operational view for lead handling and marketing coordination, with clear ownership and next steps for each enquiry."
 },
 "ai-email-dashboard": {
  title: "AI-Assisted Email Dashboard",
  tags: "EMAIL OPERATIONS · AI CLASSIFICATION · HUMAN REVIEW",
  summary: "A customized inbox workspace that helps teams review, classify, and act on incoming messages.",
  problem: "Important messages can be difficult to identify when operational, financial, customer, and informational emails all arrive in the same inbox. Manual sorting takes time and can leave follow-ups buried.",
  contribution: "I designed the message intake and review experience, including configurable categories, priority suggestions, routing states, search, and a human confirmation step before downstream action.",
  workflow: ["Collect messages and the metadata required for review.", "Suggest a category, priority, and intended workflow using AI-assisted classification.", "Present the suggestion with the original message for human confirmation.", "Route confirmed messages into focused queues and track follow-up status."],
  stack: "Email APIs · AI-assisted classification · Natural language processing · Web dashboard · Search and filtering · Workflow automation",
  result: "The dashboard creates a more focused review process while keeping classification and routing decisions visible to the person handling the inbox."
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

const systemConsole = document.querySelector('.system-console');
if (systemConsole) {
 const stages = [
  {title:'Understand', copy:'Find the real problem before choosing the solution.', outcome:'CLARITY → DIRECTION'},
  {title:'Engineer', copy:'Connect the right components into a dependable working system.', outcome:'DESIGN → DELIVERY'},
  {title:'Improve', copy:'Learn from real use and make the system clearer and more reliable.', outcome:'FEEDBACK → IMPACT'}
 ];
 const buttons = [...systemConsole.querySelectorAll('[data-system-step]')];
 const title = systemConsole.querySelector('[data-engine-title]');
 const copy = systemConsole.querySelector('[data-engine-copy]');
 const count = systemConsole.querySelector('[data-console-count]');
 const outcome = systemConsole.querySelector('[data-console-outcome]');
 let activeIndex = 0;
 let userControlled = false;
 const selectStage = (index, focus = false) => {
  activeIndex = (index + stages.length) % stages.length;
  systemConsole.dataset.stage = String(activeIndex);
  buttons.forEach((button, buttonIndex) => {
   const selected = buttonIndex === activeIndex;
   button.classList.toggle('is-active', selected);
   button.setAttribute('aria-pressed', String(selected));
  });
  title.textContent = stages[activeIndex].title;
  copy.textContent = stages[activeIndex].copy;
  count.textContent = `0${activeIndex + 1} / 03`;
  outcome.textContent = stages[activeIndex].outcome;
  if (focus) buttons[activeIndex].focus();
 };
 buttons.forEach((button, index) => {
  button.addEventListener('pointerenter', () => selectStage(index));
  button.addEventListener('focus', () => selectStage(index));
  button.addEventListener('click', () => { userControlled = true; selectStage(index); });
  button.addEventListener('keydown', event => {
   if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    userControlled = true;
    selectStage(activeIndex + (event.key === 'ArrowRight' ? 1 : -1), true);
   }
  });
 });
 if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.setInterval(() => { if (!userControlled && !document.hidden) selectStage(activeIndex + 1); }, 4800);
 }
 selectStage(0);
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

const projectTrack = document.querySelector('.selected-grid');
const carouselPrevious = document.querySelector('.carousel-prev');
const carouselNext = document.querySelector('.carousel-next');
const carouselStatus = document.querySelector('.carousel-status');
if (projectTrack && carouselPrevious && carouselNext && carouselStatus) {
 const projectCards = [...projectTrack.querySelectorAll('.project')];
 projectTrack.setAttribute('role', 'region');
 projectTrack.setAttribute('aria-label', 'Selected projects');
 projectTrack.tabIndex = 0;
 const visibleCount = () => window.matchMedia('(max-width: 700px)').matches ? 1 : 2;
 const currentIndex = () => {
  const left = projectTrack.scrollLeft;
  const firstLeft = projectCards[0].offsetLeft;
  return projectCards.reduce((closest, card, index) => Math.abs((card.offsetLeft - firstLeft) - left) < Math.abs((projectCards[closest].offsetLeft - firstLeft) - left) ? index : closest, 0);
 };
 const updateCarousel = () => {
  const count = visibleCount();
  const index = Math.min(currentIndex(), projectCards.length - count);
  carouselStatus.textContent = count === 1 ? `${index + 1} of ${projectCards.length}` : `${index + 1}–${Math.min(index + count, projectCards.length)} of ${projectCards.length}`;
  carouselPrevious.disabled = index === 0;
  carouselNext.disabled = index >= projectCards.length - count;
 };
 const moveCarousel = direction => {
  const count = visibleCount();
  const target = Math.max(0, Math.min(currentIndex() + direction * count, projectCards.length - count));
  projectTrack.scrollTo({left: projectCards[target].offsetLeft - projectCards[0].offsetLeft, behavior: 'smooth'});
 };
 carouselPrevious.addEventListener('click', () => moveCarousel(-1));
 carouselNext.addEventListener('click', () => moveCarousel(1));
 projectTrack.addEventListener('scroll', updateCarousel, {passive:true});
 projectTrack.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
   event.preventDefault();
   moveCarousel(event.key === 'ArrowRight' ? 1 : -1);
  }
 });
 window.addEventListener('resize', updateCarousel);
 updateCarousel();
 if (location.hostname === 'localhost' && new URLSearchParams(location.search).get('projects') === 'more') {
  requestAnimationFrame(() => {
   projectTrack.scrollTo({left: projectCards[2].offsetLeft - projectCards[0].offsetLeft, behavior:'auto'});
   updateCarousel();
  });
 }
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
