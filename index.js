///variaveis globais
var contar_botao_compressor = 0;
var contar_botao_circuitos = 0;
var altera_estados = false;
const este = this;

// Configurações dos componentes (mantido igual)
const COMPONENTES_CONFIG = {
    1: {
        nome: "Compressor",
        botoes: ["compressor_mecanica_btn", "compressor_electrica_btn"],
    },
    2: {
        nome: "Vavula de Expansão",
        botoes: ["vex_electrica_btn", "vex_mecanica_btn"],
    },
    3: {
        nome: "Ventilador Radial",
        botoes: [
            "ventilador_radial_mecanica_btn",
            "ventilador_radial_electricidade_btn",
        ],
    },
    4: {
        nome: "Sensor",
        botoes: ["sensor_mecanica_btn", "sensor_electrica_btn"],
    },
    5: {
        nome: "Ventilador Axial",
        botoes: ["ventilador_axial_mecanica_btn", "ventilador_axial_electrica_btn"],
    },
    6: {
        nome: "Transductor",
        botoes: ["transductor_mecanica_btn", "transductor_electrica_btn"],
    },
    7: {
        nome: "Pressostato",
        botoes: ["pressostato_mecanica_btn", "pressostato_electrica_btn"],
    },
    8: { nome: "Manometro", botoes: ["pda_mecanica_btn", "pda_electrica_btn"] },
    9: {
        nome: "Placa",
        botoes: [
            "placa_electronica_mecanica_btn",
            "placa_electronica_electrica_btn",
        ],
    },
};

// Configuração dos submenus - Sistema centralizado
const SUBMENU_CONFIG = {
    vex_electrica: { label: "Vavula de Expansão Eletrica", page: 10 },
    vex_mecanica: { label: "Vavula de Expansão Mecanica", page: 11 },
    compressor_mecanica: { label: "Mecânica do Compressor", page: 2 },
    compressor_electrica: { label: "Electricidade do Compressor", page: 3 },
    ventilador_radial_mecanica: { label: "Ventilador Radial Eletrica", page: 4 },
    ventilador_radial_electricidade: {
        label: "Ventilador Radial Mecanica",
        page: 5,
    },
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
    placa_electronica_mecanica: { label: "Placa Electronica Eletrica", page: 1 },
    placa_electronica_electrica: { label: "Placa Electronica Mecanica", page: 1 },
};

// Configuração dos dropdowns - Sistema centralizado
const DROPDOWN_CONFIG = {
    multimetro: {
        botao: "menu_multimetro_btn",
        itens: [
            "menu_tensao_ac_btn",
            "menu_tensao_dc_btn",
            "menu_tensao_ac_milivolts_btn",
            "menu_resistencia_btn",
            "menu_capacidade_btn",
            "menu_corrente_btn",
        ],
        acoes: {
            menu_tensao_ac_btn: () => this.multimetro.selecionarFuncao(1),
            menu_tensao_dc_btn: () => this.multimetro.selecionarFuncao(2),
            menu_tensao_ac_milivolts_btn: () => this.multimetro.selecionarFuncao(3),
            menu_resistencia_btn: () => this.multimetro.selecionarFuncao(4),
            menu_capacidade_btn: () => this.multimetro.selecionarFuncao(5),
            menu_corrente_btn: () => this.multimetro.selecionarFuncao(6),
        },
    },
    controle_remoto: {
        botao: "menu_controle_remoto_btn",
        itens: [
            "menu_setpoint_btn",
            "menu_valores_medidas_btn",
            "menu_entradas_saidas_btn",
        ],
    },
    avarias: {
        botao: "menu_avarias_btn",
        itens: [
            "menu_AL05_btn",
            "menu_AL06_btn",
            "menu_AL05a_btn",
            "menu_AL06a_btn",
            "menu_AL07_btn",
            "menu_AL08_btn",
            "menu_AL09_btn",
            "menu_AL10_btn",
            "menu_AL11_btn",
            "menu_AL12_btn",
            "menu_AL13_btn",
            "menu_AL12a_btn",
            "menu_AL13a_btn",
            "menu_AL12b_btn",
            "menu_AL12c_btn",
            "menu_AL13b_btn",
        ],
    },
    circuitos: {
        botao: "menu_circuitos_btn",
        itens: ["frigorifico_btn", "controle_btn", "potencia_btn"],
    },
};

// Classe genérica para gerenciar dropdowns
class DropdownManager {
    constructor(app, simulador) {
        this.app = app;
        this.simulador = simulador;
        this.dropdownAberto = null; // Controla qual dropdown está aberto
        this.initEventListeners();
    }

    initEventListeners() {
        // Configura todos os dropdowns
        Object.keys(DROPDOWN_CONFIG).forEach((dropdown) => {
            const config = DROPDOWN_CONFIG[dropdown];

            // Botão principal do dropdown
            this.app[config.botao].addEventListener("click", () => {
                this.toggleDropdown(dropdown);
            });

            // Itens do dropdown
            config.itens.forEach((item) => {
                if (this.app[item]) {
                    this.app[item].addEventListener("click", () => {
                        this.selecionarItem(dropdown, item);
                    });
                }
            });
        });
    }

    toggleDropdown(dropdown) {
        this.simulador.audio.tocarSom("SomBotao");

        // Se o mesmo dropdown está aberto, fecha
        if (this.dropdownAberto === dropdown) {
            this.fecharTodosDropdowns();
            this.dropdownAberto = null;
        } else {
            // Fecha todos e abre o selecionado
            this.fecharTodosDropdowns();
            this.abrirDropdown(dropdown);
            this.dropdownAberto = dropdown;
        }
    }

    abrirDropdown(dropdown) {
        const config = DROPDOWN_CONFIG[dropdown];
        config.itens.forEach((item) => {
            if (this.app[item]) {
                this.app[item].visible = true;
            }
        });

        // Ações específicas por dropdown
        this.executarAcaoEspecifica(dropdown, "abrir");
    }

    fecharTodosDropdowns() {
        Object.keys(DROPDOWN_CONFIG).forEach((dropdown) => {
            const config = DROPDOWN_CONFIG[dropdown];
            config.itens.forEach((item) => {
                if (this.app[item]) {
                    this.app[item].visible = false;
                }
            });
        });

        // Reset específico do multímetro
        if (this.dropdownAberto === "multimetro") {
            this.app.capa_display_mc.visible = true;
        }
    }

    selecionarItem(dropdown, item) {
        const config = DROPDOWN_CONFIG[dropdown];

        // Executa ação específica se existir
        if (config.acoes && config.acoes[item]) {
            config.acoes[item]();
        }

        // Fecha o dropdown após seleção
        this.fecharTodosDropdowns();
        this.dropdownAberto = null;

        this.simulador.audio.tocarSom("SomBotao");
    }

    executarAcaoEspecifica(dropdown, acao) {
        switch (dropdown) {
            case "multimetro":
                if (acao === "abrir") {
                    this.app.capa_display_mc.visible = false;
                }
                break;
            case "circuitos":
                if (acao === "abrir") {
                    this.app.estado_simulador_txt.text = "Circuitos";
                }
                break;
        }
    }
}


// CLASSE PRINCIPAL DO SIMULADOR
class Simulador {
    constructor(app) {
        this.app = app;
        this.model = window.RooftopModel ? window.RooftopModel.create() : null;
        this.tensaoAlimentacao = 0;
        this.ligado = false;
        this.estado = "Simulador Desligado";
        this.pontaVermelha = { conectada: false, posicao: null };
        this.pontaPreta = { conectada: false, posicao: null };

        this.multimetro = new Multimetro(app, this);
        this.dropdownManager = new DropdownManager(app, this);
        this.audio = new Audio();
        this.gerenciadorConexoes = new GerenciadorConexoes();
        this.gerenciadorConexoes.inicializarEventos(this.app, this);

        this.initEventListeners();
    }

    initEventListeners() {
        // Botões de ligar/desligar
        ["botao_off_btn", "botao_on_btn"].forEach((btn) => {
            this.app[btn].addEventListener("click", this.togglePower.bind(this));
        });

        this.app.menu_ligar_btn.addEventListener(
            "click",
            this.ligarSimulador.bind(this)
        );
        this.app.menu_desligar_btn.addEventListener(
            "click",
            this.desligarSimulador.bind(this)
        );

        // Pontos de conexão

        // Menu lateral principal
        const menuBotoes = [
            "compressor_btn",
            "vex_btn",
            "ventilador_radial_btn",
            "sensor_btn",
            "ventilador_axial_btn",
            "transductor_btn",
            "pressostato_btn",
            "pda_btn",
            "placa_electronica_btn",
        ];

        menuBotoes.forEach((btn, index) => {
            this.app[btn].addEventListener(
                "click",
                this.esconderBtnMenuLateral.bind(this, index + 1)
            );
        });

        // Submenu lateral
        Object.keys(SUBMENU_CONFIG).forEach((acao) => {
            const btnName = acao + "_btn";
            if (this.app[btnName]) {
                const page = SUBMENU_CONFIG[acao].page;
                this.app[btnName].addEventListener(
                    "click",
                    this.subMenuFuncao.bind(this, acao, page)
                );
            }
        });
    }

    // Função unificada para esconder todos os botões do submenu
    esconderTodosBotoesSubmenu() {
        this.audio.tocarSom("SomBotao");
        Object.values(COMPONENTES_CONFIG).forEach((config) => {
            config.botoes.forEach((btn) => {
                this.app[btn].visible = false;
            });
        });
    }

    esconderBtnMenuLateral(nClick) {
        this.audio.tocarSom("SomBotao");
        this.altera_estados = !this.altera_estados;

        this.esconderTodosBotoesSubmenu();

        if (this.altera_estados && COMPONENTES_CONFIG[nClick]) {
            const config = COMPONENTES_CONFIG[nClick];
            config.botoes.forEach((btn) => {
                this.app[btn].visible = true;
            });
            this.app.estado_simulador_txt.text = config.nome;
        }
    }

    subMenuFuncao(acao, page) {
        this.esconderTodosBotoesSubmenu();
        const config = SUBMENU_CONFIG[acao];
        this.app.estado_simulador_txt.text = config
            ? config.label
            : "Estado não definido";
        this.altera_estados = false;
        if (typeof page === "number") {
            this.app.gotoAndStop(page);
        }
    }

    // Funções de controle de energia
    setPowerState(ligado) {
        this.ligado = ligado;
        this.app.botao_off_btn.visible = !ligado;
        this.app.botao_on_btn.visible = ligado;
        this.estado = ligado ? "Simulador Ligado" : "Simulador Desligado";
        if (this.model) {
            this.model.setPower(ligado);
            this.tensaoAlimentacao = this.model.state.alimentacao.tensaoAc;
        } else {
            this.tensaoAlimentacao = ligado ? 220 : 0;
        }
        this.audio.tocarSom("SomBotao");
        this.atualizarInterface();
    }

    ligarSimulador() {
        this.setPowerState(true);
    }
    desligarSimulador() {
        this.setPowerState(false);
    }
    togglePower() {
        this.setPowerState(!this.ligado);
    }

    atualizarInterface() {
        this.app.estado_simulador_txt.text = this.estado;
    }

    validarCondicoes(ponta) {
        if (!this.ligado) {
            this.estado = "Ligar Tensão de Alimentação";
            this.resetarPonta(ponta);
            this.atualizarInterface();
            return false;
        }

        if (this.multimetro.posicaoRoda !== 1) {
            this.estado = "Colocar multimetro em tensao AC";
            this.resetarPonta(ponta);
            this.atualizarInterface();
            return false;
        }

        return true;
    }

    resetarPonta(ponta) {
        const isVermelha = ponta === "Ponta vermelha";
        this.app[
            isVermelha ? "ponta_vermelha_inicial_mc" : "ponta_preta_inicial_mc"
        ].visible = true;
        this.app[
            isVermelha ? "ponta_vermelha_final_mc" : "ponta_preta_final_mc"
        ].visible = false;
    }

    verificarMedicao() {
        if (this.pontaVermelha.conectada && this.pontaPreta.conectada) {
            if (
                this.pontaVermelha.posicao === "J1G" &&
                this.pontaPreta.posicao === "J1G0"
            ) {
                this.app.display_inferior_txt.text = this.tensaoAlimentacao.toString();
            }
            this.pontaVermelha.conectada = false;
            this.pontaPreta.conectada = false;
        }
    }
}

// Configuração centralizada de conexões
class GerenciadorConexoes {
    constructor() {
        this.configuracaoConexoes = {
            // Grupo J1 - Alimentação AC (220V)
            J1G_btn: { grupo: "J1", tipo: "fase", par: "J1G0_btn", tensao: 220 },
            J1G0_btn: { grupo: "J1", tipo: "neutro", par: "J1G_btn", tensao: 0 },

            // Grupo J2 - Alimentação DC
            VdcJ2_btn: {
                grupo: "J2",
                tipo: "positivo",
                par: "gndJ2_btn",
                tensao: 24,
            },
            Vref5J2_btn: {
                grupo: "J2",
                tipo: "positivo",
                par: "gndJ2_btn",
                tensao: 5,
            },
            gndJ2_btn: {
                grupo: "J2",
                tipo: "negativo",
                pares: ["VdcJ2_btn", "Vref5J2_btn"],
                tensao: 0,
            },

// Grupo J8 - Sinais digitais
            J8RX0TX0_btn: {
                grupo: "J8",
                tipo: "positivo",
                par: "J8GND_btn",
                tensao: 24,
            },
            J8RX1TX1_btn: {
                grupo: "J8",
                tipo: "positivo",
                par: "J8GND_btn",
                tensao: 24,
            },
            J8GND_btn: {
                grupo: "J8",
                tipo: "negativo",
                pares: ["J8RX0TX0_btn", "J8RX1TX1_btn"],
                tensao: 0,
            },

            // Grupo J14 - Sinais digitais
            J14NO7_btn:{
                grupo: "J14",
                tipo: "sinal",
                par: "J14C3_btn",
                tensao: 24,
            },
            J14NC7_btn:{
                grupo: "J14",
                tipo: "sinal",
                par: "J14C3_btn",
                tensao: 24,
            },
            J14C3_btn: {
                grupo: "J14",
                tipo: "terra",
                pares: ["J14NO7_btn"],
                tensao: 0,
            },

            // Grupo J3 - Sinais digitais
            ...this.gerarSinaisDigitais(),

            // Grupo J4 - Sinais digitais
            ...this.GrupoJ4(),

            // Grupo J5 - Sinais digitais
            ...this.GrupoJ5(),

            // Grupo J10 - Sinais digitais
            ...this.GrupoJ10(),

            // Grupo J12 - Sinais digitais
            ...this.GrupoJ12(),

            // Grupo J13 - Sinais digitais
            ...this.GrupoJ13(),

            // Grupo J15 - Sinais digitais
            ...this.GrupoJ15(),

            // Grupo J16 - Sinais digitais
            ...this.GrupoJ16(),

            // Grupo J18 - Sinais digitais
            ...this.GrupoJ18(),
        };
    }

    // Gera configuração para sinais digitais automaticamente
    gerarSinaisDigitais() {
        const sinais = {};
        for (let i = 1; i <= 7; i++) {
            sinais[`B${i}J3_btn`] = {
                grupo: "J3",
                tipo: "sinal",
                par: "GNDJ3_btn",
                tensao: 24,
            };
        }
        sinais["GNDJ3_btn"] = {
            grupo: "J3",
            tipo: "terra",
            pares: Object.keys(sinais),
            tensao: 0,
        };
        sinais["VdcJ3_btn"] = {
            grupo: "J3",
            tipo: "alimentacao",
            par: "GNDJ3_btn",
            tensao: 24,
        };
        return sinais;
    }
    GrupoJ4() {
        const j4grupo = {};
        for (let i = 1; i <= 7; i++) {
            j4grupo[`J4DI${i}_btn`] = {
                grupo: "J4",
                tipo: "sinal",
                par: "J4DIC1_btn",
                tensao: 24,
            };
        }
        j4grupo["J4DIC1_btn"] = {
            grupo: "J4",
            tipo: "terra",
            pares: Object.keys(j4grupo),
            tensao: 0,
        };

        return j4grupo;
    }

    GrupoJ5() {
        const j5grupo = {};
        for (let i = 1; i <= 4; i++) {
            j5grupo[`J5Y${i}_btn`] = {
                grupo: "J5",
                tipo: "sinal",
                par: "J5GND_btn",
                tensao: 24,
            };
        }
        j5grupo["J5GND_btn"] = {
            grupo: "J5",
            tipo: "terra",
            pares: Object.keys(j5grupo),
            tensao: 0,
        };

        return j5grupo;
    }

    GrupoJ10() {
        const j10grupo = {};
        for (let i = 0; i <= 1; i++) {
            j10grupo[`J10RX${i}TX${i}_btn`] = {
                grupo: "J10",
                tipo: "sinal",
                par: "J10GND_btn",
                tensao: 24,
            };
        }
        j10grupo["J10GND_btn"] = {
            grupo: "J10",
            tipo: "terra",
            pares: Object.keys(j10grupo),
            tensao: 0,
        };
         j10grupo["J10Vout_btn"] = {
            grupo: "J10",
            tipo: "alimentacao",
            par: "J10GND_btn",
            tensao: 24,
        };

        return j10grupo;
    }

    GrupoJ12(){
        const j12grupo = {};
        for (let i = 1; i <= 3; i++) {
            j12grupo[`J12NO${i}_btn`] = {
                grupo: "J12",
                tipo: "sinal",
                par: "J12C1_btn",
                tensao: 24,
            };
        }
        j12grupo["J12C1_btn"] = {
            grupo: "J12",
            tipo: "terra",
            pares: Object.keys(j12grupo),
            tensao: 0,
        };
        return j12grupo;
    }

    GrupoJ13(){
        const j13grupo = {};
        for (let i = 4; i <= 6; i++) {
            j13grupo[`J13NO${i}_btn`] = {
                grupo: "J13",
                tipo: "sinal",
                par: "J13C2_btn",
                tensao: 24,
            };
        }
        j13grupo["J13C2_btn"] = {
            grupo: "J13",
            tipo: "terra",
            pares: Object.keys(j13grupo),
            tensao: 0,
        };
        return j13grupo;
    }

    GrupoJ15(){
        const j15grupo = {};
        for (let i = 8; i <= 12; i++) {
            j15grupo[`J15NO${i}_btn`] = {
                grupo: "J15",
                tipo: "sinal",
                par: "J15C4_btn",
                tensao: 24,
            };
        }
        j15grupo["J15C4_btn"] = {
            grupo: "J15",
            tipo: "terra",
            pares: Object.keys(j15grupo),
            tensao: 0,
        };
        return j15grupo;
    }

    GrupoJ16() {
        const j16grupo = {};
        for (let i = 8; i <= 10; i++) {
            j16grupo[`J16ID${i}_btn`] = {
                grupo: "J16",
                tipo: "sinal",
                par: "J16IDC2_btn",
                tensao: 24,
            };
        }
        j16grupo["J16IDC2_btn"] = {
            grupo: "J16",
            tipo: "terra",
            pares: Object.keys(j16grupo),
            tensao: 0,
        };

        return j16grupo;
    }


    GrupoJ18() {
        const j18grupo = {};
        for (let i = 8; i <= 12; i++) {
            j18grupo[`J18B${i}_btn`] = {
                grupo: "J18",
                tipo: "sinal",
                par: "J18GND_btn",
                tensao: 24,
            };
        }
        j18grupo["J18GND_btn"] = {
            grupo: "J18",
            tipo: "terra",
            pares: Object.keys(j18grupo),
            tensao: 0,
        };

        return j18grupo;
    }



    // Método principal simplificado
    conectarPonto(elemento, simulador) {
        if (!simulador.validarCondicoes("Ponta vermelha")) return;

        const config = this.configuracaoConexoes[elemento];
        if (!config) return;

        const pontoReferencia = this.obterPontoReferencia(config);

        // Atualizar interface
        this.atualizarVisualizacao(simulador.app, elemento, pontoReferencia);

        // Atualizar estado das pontas
        simulador.pontaVermelha.conectada = true;
        simulador.pontaPreta.conectada = true;
        simulador.pontaVermelha.ponto =
            this.definirCor(config) === "vermelha" ? elemento : pontoReferencia;
        simulador.pontaPreta.ponto =
            this.definirCor(config) === "preta" ? elemento : pontoReferencia;
        simulador.pontaVermelha.posicao = simulador.pontaVermelha.ponto;
        simulador.pontaPreta.posicao = simulador.pontaPreta.ponto;

        // Calcular e exibir tensão
        const tensao = this.calcularTensao(config, simulador);
        simulador.app.display_inferior_txt.text = tensao.toString();

        simulador.atualizarInterface();
    }
    // Desconectar ponta
    desconectarPonto(simulador) {
        simulador.pontaVermelha.conectada = false;
        simulador.pontaPreta.conectada = false;
        simulador.app.ponta_preta_final_mc.visible = false;
        simulador.app.ponta_vermelha_final_mc.visible = false;
        this.app.ponta_preta_inicial_mc.visible = true;
        this.app.ponta_vermelha_inicial_mc.visible = true;
        simulador.atualizarInterface();
    }

    // Define qual ponta usar baseado no tipo do sinal
    definirCor(config) {
        const tiposVermelha = ["fase", "positivo", "sinal", "alimentacao"];
        return tiposVermelha.includes(config.tipo) ? "vermelha" : "preta";
    }

    // Obtém o ponto de referência para a medição
    obterPontoReferencia(config) {
        return config.par || (config.pares && config.pares[0]) || null;
    }

    // Atualiza a visualização das pontas
    atualizarVisualizacao(app, pontoPrimario, pontoReferencia) {
        // Esconder pontas iniciais
        app.ponta_vermelha_inicial_mc.visible = false;
        app.ponta_preta_inicial_mc.visible = false;

        // Mostrar pontas finais
        app.ponta_vermelha_final_mc.visible = true;
        app.ponta_preta_final_mc.visible = true;

        // Posicionar pontas
        const configPrimario = this.configuracaoConexoes[pontoPrimario];
        const corPrimario = this.definirCor(configPrimario);

        if (corPrimario === "vermelha") {
            app.ponta_vermelha_final_mc.y = app[pontoPrimario].y;
            app.ponta_vermelha_final_mc.x = (app[pontoPrimario].x + 140);
            app.ponta_preta_final_mc.y = app[pontoReferencia].y;
            app.ponta_preta_final_mc.x = (app[pontoReferencia].x - 140);
        } else {
            app.ponta_preta_final_mc.y = app[pontoPrimario].y;
            app.ponta_preta_final_mc.x = (app[pontoPrimario].x - 140);
            app.ponta_vermelha_final_mc.y = app[pontoReferencia].y;
            app.ponta_vermelha_final_mc.x = (app[pontoReferencia].x + 140);
        }
    }

    // Calcula a tensão baseada na configuração e estado do simulador
    calcularTensao(config, simulador) {
        if (!simulador.ligado) return 0;

        // Verificar se o multímetro está na posição correta
        const posicaoMultimetro = simulador.multimetro.posicaoRoda;
        if (posicaoMultimetro === 0) return "----";

        // Medir o sinal calculado pelo modelo; manter fallback para compatibilidade.
        if (simulador.model) return simulador.model.getSignal(config.grupo, config);
        switch (config.grupo) {
            case "J1": return simulador.tensaoAlimentacao;
            default: return config.tensao || 0;
        }
    }

    // Inicializa todos os eventos de uma só vez
    inicializarEventos(app, simulador) {
        Object.keys(this.configuracaoConexoes).forEach((elemento) => {
            app[elemento]?.addEventListener("click", () => {
                this.conectarPonto(elemento, simulador);
            });
        });


    }
}

// Classe Multimetro simplificada
class Multimetro {
    constructor(app, simulador) {
        this.app = app;
        this.simulador = simulador;
        this.posicaoRoda = 0;
        this.menuAberto = false;

        this.posicoes = [
            {
                nome: "Desligado",
                rotacao: 0,
                displayText: "--------",
                statusText: "",
            },
            {
                nome: "Volts AC",
                rotacao: 25,
                displayText: "Volts AC",
                statusText: "Multímetro ligado para Volts AC",
            },
            {
                nome: "Volts DC",
                rotacao: 50,
                displayText: "Volts DC",
                statusText: "Multímetro ligado para Volts DC",
            },
            {
                nome: "Volts mV",
                rotacao: 75,
                displayText: "Volts mV",
                statusText: "Multímetro ligado para Volts mV",
            },
            {
                nome: "Ohms",
                rotacao: 100,
                displayText: "Ohms",
                statusText: "Multímetro ligado para Ohms",
            },
            {
                nome: "Microfarads",
                rotacao: 125,
                displayText: "Microfarads",
                statusText: "Multímetro ligado para Microfarads",
            },
            {
                nome: "Anpers",
                rotacao: 150,
                displayText: "Anpers",
                statusText: "Multímetro ligado para Anpers",
            },
        ];

        this.initEventListeners();
    }

    initEventListeners() {
        this.app.menu_multimetro_btn.addEventListener(
            "click",
            this.toggleMenu.bind(this)
        );
        this.app.roda_multimetro_btn.addEventListener(
            "click",
            this.girarRoda.bind(this)
        );

        const menuOpcoes = [
            "menu_tensao_ac_btn",
            "menu_tensao_dc_btn",
            "menu_tensao_ac_milivolts_btn",
            "menu_resistencia_btn",
            "menu_capacidade_btn",
            "menu_corrente_btn",
        ];

        menuOpcoes.forEach((btn, index) => {
            this.app[btn].addEventListener("click", () =>
                this.selecionarFuncao(index + 1)
            );
        });
    }

    toggleMenu() {
        this.menuAberto = !this.menuAberto;
        this.setMenuVisibility(this.menuAberto);

        if (!this.menuAberto) {
            this.resetarMultimetro();
        } else {
            this.app.capa_display_mc.visible = false;
        }
    }

    setMenuVisibility(visible) {
        const menuBotoes = [
            "menu_tensao_ac_btn",
            "menu_tensao_dc_btn",
            "menu_tensao_ac_milivolts_btn",
            "menu_resistencia_btn",
            "menu_capacidade_btn",
            "menu_corrente_btn",
        ];

        menuBotoes.forEach((btn) => {
            this.app[btn].visible = visible;
        });

        this.app.menu_ligar_btn.visible = false;
        this.app.menu_desligar_btn.visible = false;
    }

    resetarMultimetro() {
        this.posicaoRoda = 0;
        this.app.roda_multimetro_btn.rotation = 0;
        this.app.capa_display_mc.visible = true;
        this.app.display_texto_superior_txt.text = "--------";
    }

    girarRoda() {
        this.posicaoRoda = (this.posicaoRoda + 1) % this.posicoes.length;
        this.atualizarPosicaoRoda();
    }

    selecionarFuncao(posicao) {
        this.posicaoRoda = posicao;
        this.atualizarPosicaoRoda();
        this.simulador.audio.tocarSom("SomBotao");
    }

    atualizarPosicaoRoda() {
        const posicao = this.posicoes[this.posicaoRoda];
        this.app.roda_multimetro_btn.rotation = posicao.rotacao;
        this.app.display_texto_superior_txt.text = posicao.displayText;
        this.app.capa_display_mc.visible = this.posicaoRoda === 0;

        if (posicao.statusText) {
            this.simulador.estado = posicao.statusText;
            this.simulador.atualizarInterface();
        }

        this.simulador.audio.tocarSom("SomBotao");
    }
}

class Audio {
    tocarSom(nomeSom, volume = 0.5) {
        const som = createjs.Sound.createInstance(nomeSom);
        som.volume = volume;
        som.play();
    }
}

// Inicialização
const iniciarSimulador = function () {
    const simulador = new Simulador(this);
};

iniciarSimulador.call(this);

this.ponta_preta_final_mc.addEventListener("click", fl_MouseClickHandler_24.bind(this));

function fl_MouseClickHandler_24() {
    this.ponta_preta_final_mc.visible = false;

    this.ponta_preta_inicial_mc.visible = true;

}

this.ponta_vermelha_final_mc.addEventListener("click", fl_MouseClickHandler_25.bind(this));

function fl_MouseClickHandler_25() {

    this.ponta_vermelha_final_mc.visible = false;

    this.ponta_vermelha_inicial_mc.visible = true;
}
