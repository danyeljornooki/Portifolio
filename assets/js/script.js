let default_lang = 'en'
let data_lang_elements = document.querySelectorAll('[data-lang-str]');

let translation = {
    'en': {
        'sobre': 'About',
        'projetos': 'Projects',
        'contato': 'Contact',
        'title_home': 'I am Danyel Jornooki',
        'subtitle_home': 'Frontend Developer',
        'text_home': 'I code simple things, and I love what I do',
        'hi_intro': 'Hi, I’m Danyel.',
        'nice_to_meet_you': 'Nice to meet you.',
        'about_me': 'With a solid start as a diagrammer for 2 years and a year of hands-on experience as a web developer, I’ve contributed to website builds and API development, always driven by a passion for frontend technologies. I’m constantly exploring new tools and frameworks, always aiming to sharpen my skills and bring creative ideas to life.',
        'designer_title': 'Designer',
        'designer_text': 'I appreciate straightforward content organization, minimalistic design, and intentional user interactions',
        'design_interests': 'Some of my design interests:',
        'design_tools': 'UX, UI, Web, Apps',
        'design_tools_title': 'Design Tools:',
        'frontend_dev_title': 'Frontend Developer',
        'frontend_dev_text': 'I enjoy developing projects from scratch and turning concepts into reality in the browser.',
        'languages': 'Languages:',
        'languages_list': 'CSS, JavaScript, API, WordPress',
        'tools_title': 'Development Tools:',
        'study_title': 'Study',
        'study_text': 'I’m passionate about learning and improving my skills to create innovative solutions.',
        'experiences': 'Experiences I’m looking for:',
        'experiences_list': 'Apache, PHP, MySQL, Git, IONIC',
        'my_landings': 'My Landings Pages',
        'only_html_css': 'Only Html And CSS',
        'ia_project': 'IA',
        'website_layout_ai': 'Website layout for an AI',
        'nft_project': 'NFT',
        'nft_game_website': 'NFT game website',
        'travel_project': 'Travel',
        'travel_agency_website': 'Travel agency website',
        'using_bootstrap': 'Using Bootstrap',
        'finance_service': 'Finans',
        'finance_service_layout': 'Website layout for finance service',
        'spotify_clone': 'Spotify',
        'spotify_clone_layout': 'Spotify clone website(2017)',
        'using_js': 'Using JavaScript',
        'calculator': 'Calculator',
        'calculator_js': 'Calculator using JavaScript',
        'fly_game': 'Fly Swatting Game',
        'fly_game_js': 'Fly swatting game built with JavaScript',
        'account_manager': 'account manager',
        'account_manager_layout': 'Website to manage incoming and outgoing expenses',
        'collaborating_title': 'Interested in collaborating with me?',
        'collaborating_subtitle': 'I’m always open to discussing product design work or partnership opportunities.',
        'footer_text': 'Living, learning, & leveling up <br> one day at a time.'
    },
    'pt': {
        'sobre': 'Sobre',
        'projetos': 'Projetos',
        'contato': 'Contato',
        'title_home': 'Eu sou Danyel Jornooki',
        'subtitle_home': 'Desenvolvedor front-end',
        'text_home': 'Eu programo coisas simples e amo o que faço',
        'hi_intro': 'Oi, eu sou o Danyel.',
        'nice_to_meet_you': 'Prazer em conhecer você.',
        'about_me': 'Com uma base sólida como diagramador por 2 anos e um ano de experiência prática como desenvolvedor web, contribuí para a construção de sites e desenvolvimento de APIs, sempre impulsionado por uma paixão por tecnologias de frontend. Estou constantemente explorando novas ferramentas e frameworks, sempre buscando aprimorar minhas habilidades e trazer ideias criativas à vida.',
        'designer_title': 'Designer',
        'designer_text': 'Eu aprecio uma organização de conteúdo direta, design minimalista e interações de usuário intencionais',
        'design_interests': 'Interesses de design:',
        'design_tools': 'UX, UI, Web, Apps',
        'design_tools_title': 'Ferramentas de Design:',
        'frontend_dev_title': 'Desenvolvedor Frontend',
        'frontend_dev_text': 'Eu gosto de desenvolver projetos do zero e transformar conceitos em realidade no navegador.',
        'languages': 'Linguagens:',
        'languages_list': 'CSS, JavaScript, API, WordPress',
        'tools_title': 'Ferramentas de Desenvolvimento:',
        'study_title': 'Estudo',
        'study_text': 'Sou apaixonado por aprender e melhorar minhas habilidades para criar soluções inovadoras.',
        'experiences': 'Estou buscando:',
        'experiences_list': 'Apache, PHP, MySQL, Git, IONIC',
        'my_landings': 'Minhas Landings Pages',
        'only_html_css': 'Somente HTML e CSS',
        'ia_project': 'IA',
        'website_layout_ai': 'Layout de site para uma IA',
        'nft_project': 'NFT',
        'nft_game_website': 'Site de jogo NFT',
        'travel_project': 'Viagem',
        'travel_agency_website': 'Site de agência de viagens',
        'using_bootstrap': 'Usando Bootstrap',
        'finance_service': 'Finans',
        'finance_service_layout': 'Layout de site para serviço financeiro',
        'spotify_clone': 'Spotify',
        'spotify_clone_layout': 'Site clone do Spotify(2017)',
        'using_js': 'Usando JavaScript',
        'calculator': 'Calculadora',
        'calculator_js': 'Calculadora usando JavaScript',
        'fly_game': 'Jogo de matar moscas',
        'fly_game_js': 'Jogo de matar moscas feito com JavaScript',
        'account_manager': 'Gerenciador de Contas',
        'account_manager_layout': 'Site para gerenciar despesas de entrada e saída',
        'collaborating_title': 'Interessado em colaborar comigo?',
        'collaborating_subtitle': 'Estou sempre aberto para discutir trabalho de design de produtos ou oportunidades de parceria.',
        'footer_text': 'Vivendo, aprendendo e subindo de nível, <br> um dia de cada vez.'
    }
}


// Função para alterar o idioma
function changeLanguage(lang) {

    data_lang_elements.forEach(el => {
        let key = el.getAttribute('data-lang-str');
        if (translation[lang] && translation[lang][key]) {
            el.innerHTML = translation[lang][key];
        }
    });
}

// Trocar para o idioma default
changeLanguage(default_lang);

document.querySelector('.translate-buttom').addEventListener('click', function () {

    let currentLang = this.getAttribute('data-lang');
    let newLang = currentLang === 'pt' ? 'en' : 'pt';
    this.setAttribute('data-lang', newLang);
    
    if (newLang === 'en') {
        this.innerText = 'PT'
        console.log('EN');
        
    } else{
        this.innerText = 'EN'
        console.log('PT');
    }

    changeLanguage(newLang);
});
