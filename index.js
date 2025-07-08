// Variáveis globais
var contar_botao_compressor = 0;
var contar_botao_circuitos = 0;
var altera_estados = false;
let dropdownAtivo = null;

// Configuração centralizada dos dropdowns
const DROPDOWN_CONFIG = {
    menu_controle_remoto_btn: {
        submenus: ["menu_setpoint_btn", "menu_valores_medidas_btn", "menu_entradas_saidas_btn"],
        label: "Controle Remoto"
    },
    menu_multimetro_btn: {
        submenus: [
            "menu_tensao_ac_btn", "menu_tensao_dc_btn", "menu_tensao_ac_milivolts_btn",
            "menu_resistencia_btn", "menu_capacidade_btn", "menu_corrente_btn"
        ],
        label: "Multímetro"
    },
    menu_circuitos_btn: {
        submenus: ["frigorifico_btn", "controle_btn", "potencia_btn"],
        label: "Circuitos"
    },
    menu_avarias_btn: {
        submenus: [
            "menu_AL05_btn", "menu_AL06_btn", "menu_AL05a_btn", "menu_AL06a_btn",
            "menu_AL07_btn", "menu_AL08_btn", "menu_AL09_btn", "menu_AL10_btn",
            "menu_AL11_btn", "menu_AL12_btn", "menu_AL13_btn", "menu_AL12a_btn",
            "menu_AL13a_btn", "menu_AL12b_btn", "menu_AL12c_btn", "menu_AL13b_btn"
        ],
        label: "Avarias"
    }
};

// Configurações dos componentes laterais (mantidas do código original)
const COMPONENTES_CONFIG = {
    1: { nome: "Compressor", botoes: ["compressor_mecanica_btn", "compressor_electrica_btn"] },
    2: { nome: "Vavula de Expansão", botoes: ["vex_electrica_btn", "vex_mecanica_btn"] },
    3: { nome: "Ventilador Radial", botoes: ["ventilador_radial_mecanica_btn", "ventilador_radial_electricidade_btn"] },
    4: { nome: "Sensor", botoes: ["sensor_mecanica_btn", "sensor_electrica_btn"] },
    5: { nome: "Ventilador Axial", botoes: ["ventilador_axial_mecanica_btn", "ventilador_axial_electrica_btn"] },
    6: { nome: "Transductor", botoes: ["transductor_mecanica_btn", "transductor_electrica_btn"] },
    7: { nome: "Pressostato", botoes: ["pressostato_mecanica_btn", "pressostato_electrica_btn"] },
    8: { nome: "Manometro", botoes: ["pda_mecanica_btn", "pda_electrica_btn"] },
    9: { nome: "Placa", botoes: ["placa_electronica_mecanica_btn", "placa_electronica_electrica_btn"] }
};

const SUBMENU_CONFIG = {
    vex_electrica: { label: "Vavula de Expansão Eletrica", page: 10 },
    vex_mecanica: { label: "Vavula de Expansão Mecanica", page: 11 },
    compressor_mecanica: { label: "Mecânica do Compressor", page: 2 },
    compressor_electrica: { label: "Electricidade do Compressor", page: 3 },
    ventilador_radial_mecanica: { label: "Ventilador Radial Eletrica", page: 4 },
    ventilador_radial_electricidade: { label: "Ventilador Radial Mecanica", page: 5 },
    sensor_mecanica: { label: "Sensor Eletrica", page: 6 },
    sensor_electrica: { label: "Sensor Mecanica", page: 7 },
    ventilador_axial_mecanica: { label: "Ventilador Axial Eletrica", page: 8 },
    ventilador_axial_electrica: { label: "Ventilador Axial Mecanica", page: 9 },
    transductor_mecanica: { label: "Transductor Eletrica", page: 12 },
    transductor_electrica: { label: "Transductor Mecanica", page: 13 },
    pressostato_mecanica: { label: "Pressostato Eletrica", page: 14 },
    pressostato_electrica: { label: "Pressostato Mecanica", page: 15 },
    pda_mecanica: { label: "PDA Eletrica", page: 16 },
    pda_electrica: { label: "PDA Mecanica", page: 17 },
    placa_electronica_mecanica: { label: "Placa Electronica Eletrica", page: 18 },
    placa_electronica_electrica: { label: "Placa Electronica Mecanica", page: 19 }
};

// Funções de conexão das pontas
function conectPontaVermelha(posY) {
    if (!this.validarCondicoes("Ponta vermelha")) return;
    this.app.ponta_vermelha_inicial_mc.visible = false;
    this.app.ponta_vermelha_final_mc.visible = true;
    this.app.ponta_vermelha_final_mc.y = posY;
    this.pontaVermelha.conectada = true;
    this.pontaVermelha.posicao = "J1G";
    this.estado = "Ponta vermelha ligada";
    this.atualizarInterface();
    this.verificarMedicao();
}

function conectarPontaPreta(posY) {
    if (!this.validarCondicoes("Ponta preta")) return;
    this.app.ponta_preta_inicial_mc.visible = false;
    this.app.ponta_preta_final_mc.visible = true;
    this.app.ponta_preta_final_mc.y = posY;
    this.pontaPreta.conectada = true;
    this.pontaPreta.posicao = "J1G0";
    this.estado = "Ponta preta ligada";
    this.atualizarInterface();
    this.verificarMedicao();
}

class Simulador {
    constructor(app) {
        this.app = app;
        this.tensaoAlimentacao = 0;
        this.ligado = false;
        this.estado = "Simulador Desligado";
        this.pontaVermelha = { conectada: false, posicao: null };
        this.pontaPreta = { conectada: false, posicao: null };
        this.audio = new Audio();
        this.initEventListeners();
    }

    initEventListeners() {
        // Botões de ligar/desligar
        ["botao_off_btn", "botao_on_btn"].forEach(btn => {
            this.app[btn].addEventListener("click", this.togglePower.bind(this));
        });

        this.app.menu_ligar_btn.addEventListener("click", this.ligarSimulador.bind(this));
        this.app.menu_desligar_btn.addEventListener("click", this.desligarSimulador.bind(this));

        // Pontos de conexão
        const conexoes = [
            { elemento: "J1G_btn", funcao: conectPontaVermelha, posY: 288 },
            { elemento: "J1G0_btn", funcao: conectarPontaPreta, posY: 440 },
            { elemento: "VdcJ2", funcao: conectPontaVermelha, posY: 332 },
            { elemento: "gndJ2", funcao: conectarPontaPreta, posY: 485 },
            { elemento: "Vref5J2", funcao: conectPontaVermelha, posY: 495 }
        ];
        conexoes.forEach(({ elemento, funcao, posY }) => {
            this.app[elemento].addEventListener("click", funcao.bind(this, posY));
        });

        // Menu lateral principal
        const menuBotoes = [
            "compressor_btn", "vex_btn", "ventilador_radial_btn", "sensor_btn",
            "ventilador_axial_btn", "transductor_btn", "pressostato_btn", "pda_btn",
            "placa_electronica_btn"
        ];
        menuBotoes.forEach((btn, index) => {
            this.app[btn].addEventListener("click", this.esconderBtnMenuLateral.bind(this, index + 1));
        });

        // Submenu lateral
        Object.keys(SUBMENU_CONFIG).forEach(acao => {
            const btnName = acao + "_btn";
            if (this.app[btnName]) {
                const page = SUBMENU_CONFIG[acao].page;
                this.app[btnName].addEventListener("click", this.subMenuFuncao.bind(this, acao, page));
            }
        });

        // Dropdown menus horizontais
        Object.entries(DROPDOWN_CONFIG).forEach(([btn, config]) => {
            this.app[btn].addEventListener("click", this.toggleDropdown.bind(this, btn));
            config.submenus.forEach(subBtn => {
                this.app[subBtn].addEventListener("click", this.fecharDropdown.bind(this));
            });
        });
    }

    toggleDropdown(btn) {
        this.audio.tocarSom("SomBotao");
        const config = DROPDOWN_CONFIG[btn];
        if (dropdownAtivo === btn) {
            this.esconderTodosSubmenus();
            dropdownAtivo = null;
            this.app.estado_simulador_txt.text = "Menu Principal";
        } else {
            this.esconderTodosSubmenus();
            config.submenus.forEach(subBtn => this.app[subBtn].visible = true);
            this.app.estado_simulador_txt.text = config.label;
            dropdownAtivo = btn;
        }
    }

    esconderTodosSubmenus() {
        Object.values(DROPDOWN_CONFIG).forEach(config => {
            config.submenus.forEach(subBtn => this.app[subBtn].visible = false);
        });
    }

    fecharDropdown() {
        this.esconderTodosSubmenus();
        dropdownAtivo = null;
        this.app.estado_simulador_txt.text = "Menu Principal";
    }

    esconderTodosBotoesSubmenu() {
        this.audio.tocarSom("SomBotao");
        Object.values(COMPONENTES_CONFIG).forEach(config => {
            config.botoes.forEach(btn => this.app[btn].visible = false);
        });
    }

    esconderBtnMenuLateral(nClick) {
        this.audio.tocarSom("SomBotao");
        altera_estados = !altera_estados;
        this.esconderTodosBotoesSubmenu();
        if (altera_estados && COMPONENTES_CONFIG[nClick]) {
            const config = COMPONENTES_CONFIG[nClick];
            config.botoes.forEach(btn => this.app[btn].visible = true);
            this.app.estado_simulador_txt.text = config.nome;
        }
    }

    subTechnoFuncao(acao, page) {
        this.esconderTodosBotoesSubmenu();
        const config = SUBMENU_CONFIG[acao];
        this.app.estado_simulador_txt.text = config ? config.label : "Estado não definido";
        altera_estados = false;
        if (typeof page === "number") this.app.gotoAndStop(page);
    }

    setPowerState(ligado) {
        this.ligado = ligado;
        this.app.botao_off_btn.visible = !ligado;
        this.app.botao_on_btn.visible = ligado;
        this.estado = ligado ? "Simulador Ligado" : "Simulador Desligado";
        this.tensaoAlimentacao = ligado ? 220 : 0;
        this.audio.tocarSom(ligado ? "SomLigacao" : "SomDesligacao");
        this.atualizarInterface();
    }

    ligarSimulador() { this.setPowerState(true); }
    desligarSimulador() { this.setPowerState(false); }
    togglePower() { this.setPowerState(!this.ligado); }
    atualizarInterface() { this.app.estado_simulador_txt.text = this.estado; }

    validarCondicoes(ponta) {
        if (!this.ligado) {
            this.estado = "Ligar Tensão de Alimentação";
            this.resetarPonta(ponta);
            this.atualizarInterface();
            return false;
        }
        return true;
    }

    resetarPonta(ponta) {
        const isVermelha = ponta === "Ponta vermelha";
        this.app[isVermelha ? "ponta_vermelha_inicial_mc" : "ponta_preta_inicial_mc"].visible = true;
        this.app[isVermelha ? "ponta_vermelha_final_mc" : "ponta_preta_final_mc"].visible = false;
    }

    verificarMedicao() {
        if (this.pontaVermelha.conectada && this.pontaPreta.conectada) {
            if (this.pontaVermelha.posicao === "J1G" && this.pontaPreta.posicao === "J1G0") {
                this.app.display_inferior_txt.text = this.tensaoAlimentacao.toString();
            }
            this.pontaVermelha.conectada = false;
            this.pontaPreta.conectada = false;
        }
    }
}

class Audio {
    tocarSom(nomeSom, volume = 0.5) {
        const som = createjs.Sound.createInstance(nomeSom);
        som.volume = volume;
        som.play();
    }
}

const iniciarSimulador = function () {
    const simulador = new Simulador(this);
};

iniciarSimulador.call(this);