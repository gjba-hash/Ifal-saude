const icons = {
  medico:'<path d="M11 2v2M5 2v2M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1M8 15a6 6 0 0 0 12 0v-3"/><circle cx="20" cy="10" r="2"/>',
  nutricao:'<path d="M12 20.9c-2.5 1.5-4.6 1.1-6.3-.5C3 17.8 3 11 6 8.5c2-1.6 4-1.3 6 0 2-1.3 4-1.6 6 0 3 2.5 3 9.3.3 11.9-1.7 1.6-3.8 2-6.3.5zM12 8.5c0-3 1-5 3-6"/>',
  psicologia:'<path d="M12 5a3 3 0 1 0-5.99.1A4 4 0 0 0 5 13a4 4 0 0 0 2 6.5 3 3 0 0 0 5-1.5V5zm0 0a3 3 0 1 1 6 .1A4 4 0 0 1 19 13a4 4 0 0 1-2 6.5 3 3 0 0 1-5-1.5"/>',
  atendimento:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
  odonto:'<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>'
};
const svg = k => `<svg class="ico" viewBox="0 0 24 24">${icons[k]}</svg>`;

const setores = {
  medico:{nome:'Setor Médico',icon:'medico',sub:'Atendimento médico no IFAL',local:'Bloco de Assistência Estudantil · Sala 04',resp:'Dra. Ana Beatriz Lima',
    periodo:'17 a 21 de novembro de 2026',desc:'Atendimento médico no IFAL',status:'Cronograma em vigor',
    dias:[2,3,4,5,6,9,10,11,12,13,16,17,18,19,20,23,24,25,26,27,30],horario:['08:00','12:00','Ordem de chegada'],selecionado:17,
    infos:['Os atendimentos seguem o cronograma acima.','Em caso de dúvidas, procure o setor de atendimento.','Horários sujeitos a alterações.']},
  nutricao:{nome:'Nutrição',icon:'nutricao',sub:'e cf',local:'Bloco C · Sala 12',resp:'Nut. Carla Mendes',
    periodo:'16 a 27 de novembro de 2026',desc:'Consultas nutricionais agendadas',status:'Cronograma em vigor',
    dias:[2,4,6,9,11,13,16,18,20,23,25,27,30],horario:['09:00','12:00','Com agendamento'],selecionado:16,
    infos:['As consultas são realizadas com agendamento prévio.','Traga seu cartão de estudante no dia do atendimento.','Horários sujeitos a alterações.']},
  psicologia:{nome:'Psicologia',icon:'psicologia',sub:'Atendimentos e cronograma',local:'Bloco de Assistência Estudantil · Sala 07',resp:'Psi. Mariana Alves',
    periodo:'18 de nov a 4 de dez de 2026',desc:'Atendimentos psicológicos',status:'Cronograma em vigor',
    dias:[3,5,10,12,17,19,24,26],horario:null,selecionado:18,
    infos:['O atendimento é individual e sigiloso.','Agendamentos são feitos na recepção da assistência estudantil.','Horários sujeitos a alterações.']},
  atendimento:{nome:'Atendimento',icon:'atendimento',sub:'Horários e informações',local:'Recepção da Assistência Estudantil',resp:'Equipe de Atendimento',
    periodo:'3 de nov a 18 de dez de 2026',desc:'Recepção e ética',status:'Cronograma em vigor',
    dias:[2,3,4,5,6,9,10,11,12,13,16,17,18,19,20,23,24,25,26,27,30],horario:['07:30','17:00','Intervalo das 12h às 13h30'],selecionado:3,
    infos:['A recepção orienta sobre todos os setores de saúde do campus.','Intervalo de atendimento das 12h às 13h30.','Horários sujeitos a alterações.']},
  odontologia:{nome:'Odontologia',icon:'odonto',sub:'Consultas e procedimentos',local:'Clínica Odontológica · Sala 02',resp:'Dr. Rafael Souza',
    periodo:'23 a 27 de novembro de 2026',desc:'Mutirão odontológico',status:'Previsto',prev:true,
    dias:[3,4,5,10,11,12,17,18,19,24,25,26],horario:null,selecionado:23,
    infos:['Atendimentos por agendamento na clínica odontológica.','Em urgências, procure a recepção do setor.','Horários sujeitos a alterações.']}
};
const ids = Object.keys(setores);
const $ = s => document.querySelector(s);
const dow = ['DOMINGO','SEGUNDA-FEIRA','TERÇA-FEIRA','QUARTA-FEIRA','QUINTA-FEIRA','SEXTA-FEIRA','SÁBADO'];

/* ---------- montagem das listas ---------- */
$('#count-setores').textContent = ids.length + ' setores';
$('#drawer-setores').innerHTML = ids.map(id =>
  `<a href="#/setor/${id}" data-route="setor/${id}">${svg(setores[id].icon)}${setores[id].nome}</a>`).join('');
$('#home-list').innerHTML = ids.filter(i=>i!=='medico').map(id => `
  <a class="card item" href="#/setor/${id}"><span class="tile">${svg(setores[id].icon)}</span>
  <div class="txt"><h3>${setores[id].nome}</h3><p class="muted small">${setores[id].sub}</p></div><span class="chev">›</span></a>`).join('');
$('#cron-list').innerHTML = ids.map(id => { const s = setores[id]; return `
  <a class="card item" href="#/setor/${id}"><span class="tile">${svg(s.icon)}</span>
  <div class="txt"><h3>${s.nome}</h3><p class="muted small">${s.periodo}</p>
  <span class="pill ${s.prev?'prev':''}">${s.prev?'PREVISTO':'CRONOGRAMA EM VIGOR'}</span></div>
  ${s.prev?'':'<span class="chev">›</span>'}</a>`; }).join('');
$('#avisos-list').innerHTML = ids.map(id => { const s = setores[id]; return `
  <article class="card aviso"><div class="aviso-head"><span class="tile sm">${svg(s.icon)}</span><h3>${s.nome}</h3><span class="arr">↗</span></div>
  <ul class="bullets">${s.infos.map(t=>`<li>${t}</li>`).join('')}</ul></article>`; }).join('');

/* ---------- tela do setor ---------- */
function renderSetor(id, dia) {
  const s = setores[id]; if (!s) return;
  dia = dia || s.selecionado;
  $('#s-icon').innerHTML = svg(s.icon);
  $('#s-nome').textContent = s.nome;
  $('#s-local').textContent = s.local;
  $('#s-resp').textContent = s.resp;
  $('#s-periodo').textContent = s.periodo;
  $('#s-desc').textContent = s.desc;
  const st = $('#s-status'); st.textContent = '✓ ' + s.status; st.className = 'pill' + (s.prev ? ' prev' : '');
  $('#s-infos').innerHTML = s.infos.map(t => `<li>${t}</li>`).join('');
  $('#s-hor-txt').textContent = s.horario ? `${s.horario[0]} às ${s.horario[1]} · ${s.horario[2]}` : 'Horários definidos junto ao setor.';
  $('#s-fav').classList.toggle('on', id === 'medico');

  // Novembro/2026 começa em domingo (dia 1 = DOM)
  let html = '';
  for (let d = 1; d <= 30; d++) {
    const on = s.dias.includes(d), sel = d === dia;
    html += `<button class="d ${on?'on':''} ${sel?'sel':''}" data-d="${d}" ${on?'':'disabled'}>${d}</button>`;
  }
  $('#cal-days').innerHTML = html;

  const w = new Date(2026, 10, dia).getDay();
  $('#s-dia').textContent = `${dow[w]}, ${dia} DE NOVEMBRO`;
  $('#s-dia-info').innerHTML = (s.dias.includes(dia) && s.horario)
    ? `<div class="day-row"><svg class="ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg><b>${s.horario[0]} às ${s.horario[1]}</b><small>${s.horario[2]}</small></div>`
    : '<p class="muted">Sem atendimento neste dia.</p>';

  $('#cal-days').onclick = e => { const b = e.target.closest('.d.on'); if (b) renderSetor(id, +b.dataset.d); };
}
document.querySelectorAll('.tab').forEach(t => t.onclick = () => {
  document.querySelectorAll('.tab').forEach(x => x.classList.toggle('on', x === t));
  $('#tab-cron').hidden = t.dataset.tab !== 'cron';
  $('#tab-hor').hidden = t.dataset.tab !== 'hor';
});
$('#s-fav').onclick = e => e.currentTarget.classList.toggle('on');

/* ---------- menu lateral ---------- */
const drawer = $('#drawer'), overlay = $('#overlay');
const menu = open => { drawer.classList.toggle('open', open); overlay.hidden = !open; drawer.setAttribute('aria-hidden', !open); };
$('#open-menu').onclick = () => menu(true);
$('#close-menu').onclick = () => menu(false);
overlay.onclick = () => menu(false);

/* ---------- rotas (#/login, #/, #/cronogramas, #/avisos, #/setor/<id>) ---------- */
const titles = {home:'Lar', cronogramas:'Cronogramas', avisos:'Avisos'};
function route() {
  const h = location.hash.replace(/^#\/?/, '') || 'home';
  const isLogin = h === 'login';
  $('#login').hidden = !isLogin;
  $('#app').hidden = isLogin;
  if (isLogin) return;
  ['home','cronogramas','avisos','setor'].forEach(p => $('#'+p).hidden = true);
  let page = h.startsWith('setor/') ? 'setor' : (titles[h] ? h : 'home');
  $('#'+page).hidden = false;
  if (page === 'setor') {
    const id = h.split('/')[1]; renderSetor(id);
    $('#topbar-title').textContent = setores[id]?.nome || '';
    $('#drawer .drawer-head strong').textContent = setores[id]?.nome || 'Setor Médico';
  } else $('#topbar-title').textContent = titles[page];
  document.querySelectorAll('.drawer nav a').forEach(a => a.classList.toggle('active', a.dataset.route === h));
  menu(false); window.scrollTo(0, 0);
}
$('#login-form').onsubmit = e => { e.preventDefault(); location.hash = '#/'; };
addEventListener('hashchange', route);
if (!location.hash) location.hash = '#/login';
route();
