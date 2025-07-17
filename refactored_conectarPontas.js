function conectarPontas(nomeBtn) {
    if (!this.validarCondicoes("Ponta vermelha") || !this.validarCondicoes("Ponta preta")) return;

    this.app.ponta_vermelha_inicial_mc.visible = false;
    this.app.ponta_preta_inicial_mc.visible = false;
    this.app.ponta_vermelha_final_mc.visible = true;
    this.app.ponta_preta_final_mc.visible = true;

    // Mapping button names to their corresponding y positions for red and black tips
    const posicoes = {
        "J1G_btn": { vermelha: this.app.J1G_btn.y, preta: this.app.J1G0_btn.y },
        "J1G0_btn": { vermelha: this.app.J1G_btn.y, preta: this.app.J1G0_btn.y },
        "VdcJ2_btn": { vermelha: this.app.VdcJ2_btn.y, preta: this.app.gndJ2_btn.y },
        "gndJ2_btn": { vermelha: this.app.Vref5J2_btn.y, preta: this.app.gndJ2_btn.y }, // Note: gndJ2_btn shares preta y with itself, vermelha y from Vref5J2_btn
        "Vref5J2_btn": { vermelha: this.app.Vref5J2_btn.y, preta: this.app.gndJ2_btn.y },
        // For other buttons, no specific y adjustment needed
    };

    if (posicoes[nomeBtn]) {
        this.app.ponta_vermelha_final_mc.y = posicoes[nomeBtn].vermelha;
        this.app.ponta_preta_final_mc.y = posicoes[nomeBtn].preta;
    }

    this.pontaVermelha.conectada = true;
    this.pontaPreta.conectada = true;

    this.atualizarInterface();
    this.verificarMedicao();
}

const conexoes = [
    "J1G_btn", "J1G0_btn", "VdcJ2_btn", "gndJ2_btn", "Vref5J2_btn",
    "B1J3_btn", "B2J3_btn", "B3J3_btn", "B4J3_btn", "B5J3_btn",
    "B6J3_btn", "B7J3_btn", "GNDJ3_btn", "VdcJ3_btn"
];

conexoes.forEach(elemento => {
    this.app[elemento].addEventListener("click", conectarPontas.bind(this, elemento));
});
