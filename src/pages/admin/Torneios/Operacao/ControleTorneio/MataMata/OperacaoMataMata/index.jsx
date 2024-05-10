import { Flex, Popconfirm } from "antd";
import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EtapaMataMata from "../../../../../../app/EtapaMataMata";

import "./styles.scss";
import { Button } from "antd/es/radio";
import RodadaMataMataService from "../../../../../../../services/rodadaMataMata.service";
import ControleMataMataService from "../../../../../../../services/controleMataMata.service";

export default function OperacaoMataMata() {
  const { id } = useParams();
  const [controleMataMata, setControleMataMata] = useState([]);

  const _rodadaMataMataService = new RodadaMataMataService();
  const _controleMataMataService = new ControleMataMataService();

  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      debugger;
      const controleMataMataService =
        await _controleMataMataService.GetEquipesClassificadasMataMata(id);

      setControleMataMata(controleMataMataService.controleMataMataEquipes);

      debugger;
    }

    init();
  }, [id]);

  async function CriaRodadas() {
    await _rodadaMataMataService
      .CriaRodadasEtapaMataMata(id)
      .then((res) => {
        alert(res);
        window.location.reload();
      })
      .catch((res) => {
        alert(res.response.data);
      });
  }

  async function AlterarStatusValidacao(controleEquipeId, status) {
    await _controleMataMataService
      .AlteraStatusValidacaoMataMata({
        id: controleEquipeId,
        statusValidacao: status,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((res) => {
        console.log(res);
        alert(res.response.data);
      });
  }

  return (
    <div className="admin-page">
      <div style={{ paddingBottom: "2rem" }}>
        <h1>Operação mata-mata</h1>
      </div>

      <Flex align="flex-start" gap="small" vertical>
        <Button
          htmlType="submit"
          type="primary"
          onClick={() => {
            CriaRodadas();
          }}
        >
          Criar rodadas
        </Button>

        <Button
          htmlType="submit"
          type="primary"
          onClick={() => {
            alert("estudando possibilidades");
          }}
        >
          Criar chaves
        </Button>
      </Flex>

      {controleMataMata?.map((controleEquipe) => (
        <Popconfirm
          title="Alterar status"
          description={`Deseja alterar o status para validando"?`}
          onConfirm={() =>
            AlterarStatusValidacao(controleEquipe.id, "Validando")
          }
        >
          <div style={{ display: "flex", gap: "20px" }}>
            <br />

            <h1>{controleEquipe.nome}</h1>
            <p>{controleEquipe.statusValidacao}</p>
          </div>
        </Popconfirm>
      ))}

      <Flex
        gap="small"
        wrap
        style={{ paddingTop: "2rem" }}
        justify={"space-between"}
      >
        <Button
          onClick={() => navigate(`/admin/torneio/${id}/controles/mata-mata`)}
        >
          Voltar
        </Button>
      </Flex>
    </div>
  );
}
