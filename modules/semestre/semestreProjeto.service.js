export default class SemestreProjeto {
    static checarProjetoExiste(projetoNovo, projetos) {
        for (const projetoVelho of projetos) {
            if (projetoVelho['_id'].equals(projetoNovo['_id'])) {
                return true
            }
        }
        return false;
    }
}