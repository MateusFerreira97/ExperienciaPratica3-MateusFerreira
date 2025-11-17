// Templates para cada página
const templates = {
  home: `
    <section id="banner">
      <img src="imagens/banner.jpg" alt="Banner ONG">
      <h1>Transformando vidas através do amor</h1>
    </section>
    <section id="sobre">
      <h2>Sobre Nós</h2>
      <p>A ONG Patas do Bem quer te ajudar a encontrar seu novo melhor amigo!</p>
    </section>
    <section id="contato">
      <h2>Contato</h2>
      <p>Email: contato@patasdobem.org</p>
      <p>Telefone: (11) 3000-4000</p>
    </section>
  `,
 projetos: `
    <h1>Nossos Projetos</h1>
    <section id="lista-projetos">
        <article class="card">
            <h2>Feira de Adoção</h2>
            <p>Temos feiras de adoções espalhadas por todo Brasil!</p>
        </article>

        <article class="card">
            <h2>Cestas Solidárias</h2>
            <p>Distribuímos rações para famílias com baixa renda.</p>
        </article>

        <article class="card">
            <h2>Campanhas Educativas</h2>
            <p>Promovemos eventos para conscientizar sobre cuidados com animais.</p>
        </article>
    </section>
  `,
  cadastro: `
    <h2>Faça seu cadastro:</h2>
    <form id="formCadastro">
      <fieldset>
        <legend>Dados Pessoais</legend>
        <label>Nome Completo:
          <input type="text" name="nome" required>
          <span class="error"></span>
        </label>
        <label>E-mail:
          <input type="email" name="email" required>
          <span class="error"></span>
        </label>
        <label>CPF:
          <input type="text" name="cpf" required maxlength="14">
          <span class="error"></span>
        </label>
      </fieldset>
      <button type="submit">Enviar Cadastro</button>
    </form>
  `
};

// Carregar template no main
function loadPage(page) {
  const main = document.getElementById("main-content");
  main.innerHTML = templates[page] || templates['home'];
  if(page === 'cadastro') initFormValidation();
}

// Inicializar links do menu
document.querySelectorAll('#menu a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const page = link.dataset.page;
    loadPage(page);
    // fecha menu mobile
    document.getElementById('menu').classList.remove('open');
  });
});

// Menu hambúrguer
function toggleMenu() {
  document.getElementById('menu').classList.toggle('open');
}

// Validação de formulário
// Validação de formulário com máscara de CPF
function initFormValidation() {
  const form = document.getElementById('formCadastro');
  const cpfInput = form.querySelector('input[name="cpf"]');

  // Função para aplicar máscara CPF
  cpfInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é número
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    e.target.value = value;
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('input').forEach(input => {
      const error = input.nextElementSibling;
      if(!input.value) {
        error.textContent = 'Preenchimento obrigatório';
        valid = false;
      } else {
        error.textContent = '';
      }
    });

    // Validação CPF
    const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if(!cpfPattern.test(cpfInput.value)) {
      cpfInput.nextElementSibling.textContent = 'CPF inválido. Formato: XXX.XXX.XXX-XX';
      valid = false;
    }

    if(valid) {
      alert('Cadastro enviado com sucesso!');
      form.reset();
    }
  });
}

// Carregar home por padrão
loadPage('home');
