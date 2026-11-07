const form = document.getElementById('signup');
const fstatus = document.getElementById('form-status');
const skills = document.getElementById('skills');
const counter = document.getElementById('skills-count');
const MAX = 15;
  
form.addEventListener('change', (e) => {
  if (e.target.name !== 'skills') return;
  const n = form.querySelectorAll('input[name="skills"]:checked').length;
  counter.textContent = `${n} de ${MAX}`;
  skills.forEach(s => { if (!s.checked) s.disabled = n >= MAX; }); // Erro nessa função foeEach
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  fstatus.textContent = 'Enviando...';
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new URLSearchParams(new FormData(form)),
    });
    if (!res.ok) throw new Error();
    fstatus.textContent = 'Quase lá! Confirme seu e-mail na caixa de entrada.';
    form.reset();
  } catch {
    fstatus.textContent = 'Não foi possivel enviar, por favor tente novamente!';
  }
});