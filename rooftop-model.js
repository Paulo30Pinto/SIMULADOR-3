(function (global) {
  function createComponent(state, extra) {
    return Object.assign({ estado: state, falha: null }, extra || {});
  }

  function createRooftopState() {
    return {
      alimentacao: { energizado: false, tensaoAc: 0 },
      controlador: { ativo: false, tensaoDc: 0 },
      componentes: {
        compressor: createComponent("parado"),
        valvulaExpansao: createComponent("fechada", { abertura: 0 }),
        ventiladorRadial: createComponent("parado"),
        ventiladorAxial: createComponent("parado"),
      },
      sensores: {},
      pressostatos: {},
      conexoes: {},
      diagnostico: { falhaAtiva: null },
    };
  }

  function recalculate(state) {
    const energized = state.alimentacao.energizado;
    state.alimentacao.tensaoAc = energized ? 220 : 0;
    state.controlador.ativo = energized;
    state.controlador.tensaoDc = energized ? 24 : 0;

    Object.values(state.componentes).forEach(function (component) {
      if (!energized) component.estado = component.abertura !== undefined ? "fechada" : "parado";
    });
    return state;
  }

  global.RooftopModel = {
    create: function () {
      var state = createRooftopState();
      return {
        state: state,
        setPower: function (energized) {
          state.alimentacao.energizado = Boolean(energized);
          return recalculate(state);
        },
        setFault: function (code) {
          state.diagnostico.falhaAtiva = code || null;
          return state;
        },
        getSignal: function (group, config) {
          if (!state.alimentacao.energizado) return 0;
          if (group === "J1") return state.alimentacao.tensaoAc;
          if (group === "J2" || group === "J3" || group === "J4" || group === "J5" || group === "J8" || group === "J10" || group === "J12" || group === "J13" || group === "J14" || group === "J15" || group === "J16" || group === "J18") return config.tensao || 0;
          return 0;
        },
      };
    },
  };
})(window);
