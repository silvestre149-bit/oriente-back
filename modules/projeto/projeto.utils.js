export const ATRIBUTOS_PROJETO =
    [
        'titulo',
        'descricao',
        'status',
    ]

export function filtrarParticipantes(participacoes) {
    const participantes = [];
    for (const participacao of participacoes) {
        participantes.push({
            ...participacao.usuarioId,
            semestreId: participacao.semestreId
        })
    }
    return participantes;
}