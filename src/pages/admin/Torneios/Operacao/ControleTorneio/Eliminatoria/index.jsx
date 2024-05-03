import { useEffect, useState, React } from "react";
import { useParams } from "react-router-dom";
import ControleEliminatoriaService from "../../../../../../services/controleEliminatoria.service";

export default function ControleEliminatoria() {
  const { id } = useParams();
  const [equipesEliminatoria, setEquipesEliminatoria] = useState([]);

  useEffect(() => {
    const _controleEliminatoriaService = new ControleEliminatoriaService();

    async function init() {
      const responseControleEliminatoria =
        await _controleEliminatoriaService.GetAllEquipesCredenciadasEliminatoria(
          id
        );

      setEquipesEliminatoria(
        responseControleEliminatoria.controleEliminatoriaEquipes
      );
    }

    init();
  }, [id]);

  return (
    <div>
      <h1>Controle de eliminatória</h1>
      
      <hr />

      {equipesEliminatoria?.map((equipe) => (
        <div style={{ display: "flex", gap: "20px" }}>
          <br />

          <h1>{equipe.equipe.nome}</h1>
          <p>{equipe.statusValidacao}</p>
        </div>
      ))}
    </div>
  );
}
