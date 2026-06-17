const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
const form = document.getElementById('analyzerForm');
const uploadBtn = document.getElementById('uploadBtn');
const fileInput = document.getElementById('fileInput');
const resumeText = document.getElementById('resumeText');

menuBtn.addEventListener('click', () => mobileNav.classList.toggle('open'));
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => mobileNav.classList.remove('open')));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.16 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

uploadBtn.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', async event => {
  const file = event.target.files[0];
  if (!file) return;
  const text = await file.text();
  resumeText.value = text.trim();
  uploadBtn.textContent = `הקובץ נטען: ${file.name}`;
});

const keywords = {
  project: ['project', 'פרויקט', 'ניהול', 'manager', 'program', 'stakeholders', 'בעלי עניין'],
  cyber: ['cyber', 'סייבר', 'security', 'אבטחת מידע', 'dlp', 'purview', 'privacy', 'data protection'],
  analysis: ['analysis', 'ניתוח', 'data', 'requirements', 'אפיון', 'business'],
  communication: ['communication', 'תקשורת', 'presentation', 'הצגה', 'training', 'הדרכה'],
  ai: ['ai', 'בינה מלאכותית', 'gemini', 'automation', 'אוטומציה']
};

function normalize(text) {
  return text.toLowerCase().replace(/[.,;:!?()\[\]{}"']/g, ' ');
}

function countMatches(text, terms) {
  const normalized = normalize(text);
  return terms.filter(term => normalized.includes(term.toLowerCase())).length;
}

function calculateScore(resume, job) {
  let score = 48;
  Object.values(keywords).forEach(group => {
    const inResume = countMatches(resume, group);
    const inJob = countMatches(job, group);
    if (inResume && inJob) score += 9;
    else if (inResume || inJob) score += 3;
  });
  const resumeWords = new Set(normalize(resume).split(/\s+/).filter(w => w.length > 3));
  const jobWords = normalize(job).split(/\s+/).filter(w => w.length > 3);
  const overlap = jobWords.filter(w => resumeWords.has(w)).length;
  score += Math.min(22, Math.round(overlap / 3));
  if (resume.length > 500) score += 5;
  if (job.length > 300) score += 4;
  return Math.max(42, Math.min(96, score));
}

function buildStrengths(resume, job) {
  const strengths = [];
  if (countMatches(resume + job, keywords.project)) strengths.push('ניסיון רלוונטי בניהול משימות/פרויקטים והובלת תהליכים מקצה לקצה.');
  if (countMatches(resume + job, keywords.cyber)) strengths.push('התאמה לתחומי סייבר, אבטחת מידע, פרטיות או הגנה על נתונים.');
  if (countMatches(resume + job, keywords.analysis)) strengths.push('יכולת ניתוח דרישות, הבנת צרכים עסקיים והפיכת מידע לתובנות פרקטיות.');
  if (countMatches(resume + job, keywords.communication)) strengths.push('פוטנציאל חזק בעבודה מול ממשקים, הצגת תוצרים והעברת מסרים מקצועיים.');
  if (strengths.length < 3) strengths.push('הרקע הכללי מצביע על יכולת למידה, הסתגלות ורלוונטיות לתפקיד היעד.');
  return strengths.slice(0, 4);
}

function buildImprovements(resume, job, role) {
  const improvements = [
    `להוסיף בתחילת קורות החיים תקציר מקצועי קצר שמדגיש התאמה ל-${role}.`,
    'לשלב מילות מפתח מתוך תיאור המשרה כדי לשפר התאמה אוטומטית ומקצועית.',
    'להציג הישגים מדידים: היקף פרויקט, מספר משתמשים, חיסכון בזמן, שיפור תהליך או תוצאה עסקית.',
    'לחזק את החיבור בין ניסיון קודם לבין דרישות התפקיד באמצעות ניסוח ממוקד יותר.'
  ];
  if (!/\d/.test(resume)) improvements.unshift('מומלץ להוסיף מספרים ונתונים כמותיים כדי להפוך את הניסיון למשכנע יותר.');
  return improvements.slice(0, 5);
}

function buildQuestions(role) {
  return [
    `ספרי על פרויקט משמעותי שהובלת וכיצד הוא רלוונטי לתפקיד ${role}.`,
    'איך את מתעדפת משימות כאשר יש כמה בעלי עניין עם דרישות שונות?',
    'תארי אתגר מקצועי שנתקלת בו ואיך פתרת אותו בצורה מסודרת.',
    'איך את מודדת הצלחה של תהליך או פרויקט לאחר ההטמעה?',
    'איזה ערך ייחודי את מביאה לתפקיד לעומת מועמדים אחרים?'
  ];
}

function buildLetter(name, role, strengths) {
  return `שלום רב,\n\nשמי ${name}, וברצוני להגיש מועמדות לתפקיד ${role}. הרקע המקצועי שלי משלב ${strengths[0] || 'יכולת למידה מהירה, אחריות וחשיבה מערכתית'}\n\nאני מביאה איתי יכולת להבין צרכים עסקיים, לעבוד מול ממשקים שונים, להוביל תהליכים בצורה מסודרת ולתרגם דרישות לתוצרים פרקטיים. לאחר קריאת דרישות התפקיד, אני רואה התאמה בין הניסיון והיכולות שלי לבין הערך הנדרש לארגון.\n\nאשמח להזדמנות להציג את עצמי ולהרחיב כיצד אוכל לתרום לתפקיד ולצוות.\n\nבברכה,\n${name}`;
}

function renderList(elementId, items) {
  const list = document.getElementById(elementId);
  list.innerHTML = '';
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  });
}

function animateScore(target) {
  const scoreEl = document.getElementById('matchScore');
  let current = 0;
  const interval = setInterval(() => {
    current += 2;
    if (current >= target) {
      current = target;
      clearInterval(interval);
    }
    scoreEl.textContent = `${current}%`;
  }, 14);
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('fullName').value.trim();
  const role = document.getElementById('targetRole').value.trim();
  const resume = resumeText.value.trim();
  const job = document.getElementById('jobText').value.trim();

  const score = calculateScore(resume, job);
  const strengths = buildStrengths(resume, job);
  const improvements = buildImprovements(resume, job, role);
  const questions = buildQuestions(role);
  const letter = buildLetter(name, role, strengths);

  document.getElementById('emptyState').hidden = true;
  document.getElementById('results').hidden = false;
  document.getElementById('resultTitle').textContent = `התאמה לתפקיד ${role}`;
  renderList('strengthsList', strengths);
  renderList('improvementsList', improvements);
  renderList('questionsList', questions);
  document.getElementById('coverLetter').textContent = letter;
  animateScore(score);
});

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

document.getElementById('copyLetter').addEventListener('click', async () => {
  const text = document.getElementById('coverLetter').textContent;
  await navigator.clipboard.writeText(text);
  const btn = document.getElementById('copyLetter');
  const original = btn.textContent;
  btn.textContent = 'המכתב הועתק ✓';
  setTimeout(() => btn.textContent = original, 1600);
});
