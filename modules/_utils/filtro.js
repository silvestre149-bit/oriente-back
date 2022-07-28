
/**
 * @param {String[]} listaAtributos 
 * @param {Object} filtros 
 * @returns 
 */
function definirFiltros(listaAtributos, filtros) {
    let filtrosBusca = {}
    Object.keys(filtros).forEach(chavefiltro => {
        if (listaAtributos.includes(chavefiltro)) {
            filtrosBusca[chavefiltro] = filtros[chavefiltro]
        }
    })
    return Object.keys(filtrosBusca).length > 0
        ? filtrosBusca
        : undefined
}

/**
 * @param {import("express").Request} request 
 * @param {String[]} listaAtributos 
 */
export function buscarFiltros(request, listaAtributos) {
    const temFiltros = request.query;
    const filtros = temFiltros
        ? definirFiltros(listaAtributos, temFiltros)
        : undefined;

    return filtros;
}