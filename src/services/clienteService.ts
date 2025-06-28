const API_BASE_URL = 'http://localhost:32832';

export interface ClienteAPI {
  id: number;
  nome: string;
  sobreNome: string;
  email?: string;
  endereco: {
    id: number;
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: string;
    codigoPostal: string;
    informacoesAdicionais: string;
  };
  telefones: Array<{
    id: number;
    ddd: string;
    numero: string;
  }>;
}

export interface ClienteForm {
  nome: string;
  sobreNome: string;
  email?: string;
  endereco: {
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: string;
    codigoPostal: string;
    informacoesAdicionais?: string;
  };
  telefones: Array<{
    ddd: string;
    numero: string;
  }>;
}

export class ClienteService {
  static async listarClientes(): Promise<ClienteAPI[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/clientes`);
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao listar clientes:', error);
      throw error;
    }
  }

  static async obterCliente(id: number): Promise<ClienteAPI> {
    try {
      const response = await fetch(`${API_BASE_URL}/cliente/${id}`);
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao obter cliente:', error);
      throw error;
    }
  }

  static async cadastrarCliente(cliente: ClienteForm): Promise<ClienteAPI> {
    try {
      const response = await fetch(`${API_BASE_URL}/cliente/cadastrar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cliente),
      });
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      // A API de cadastro retorna apenas status, então precisamos buscar todos os clientes
      // para obter o cliente recém-criado (não é ideal, mas é assim que a API funciona)
      const clientes = await this.listarClientes();
      const ultimoCliente = clientes[clientes.length - 1];
      return ultimoCliente;
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
      throw error;
    }
  }

  static async atualizarCliente(id: number, cliente: ClienteForm): Promise<ClienteAPI> {
    try {
      // A API de atualização requer o ID no corpo da requisição
      const clienteComId = { ...cliente, id };
      
      const response = await fetch(`${API_BASE_URL}/cliente/atualizar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clienteComId),
      });
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      // A API de atualização retorna apenas status, então buscamos o cliente atualizado
      return await this.obterCliente(id);
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      throw error;
    }
  }

  static async excluirCliente(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/cliente/excluir`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      throw error;
    }
  }

  // Função utilitária para converter dados da API para o formato usado no front-end
  static converterParaClienteFront(clienteAPI: ClienteAPI) {
    return {
      id: clienteAPI.id,
      nome: clienteAPI.nome,
      sobrenome: clienteAPI.sobreNome,
      telefone: clienteAPI.telefones.length > 0 
        ? `(${clienteAPI.telefones[0].ddd}) ${clienteAPI.telefones[0].numero}`
        : '',
      email: clienteAPI.email || '',
      cidade: clienteAPI.endereco.cidade,
      ativo: true // API não tem campo ativo, assumindo true
    };
  }

  // Função utilitária para converter dados do front-end para o formato da API
  static converterParaClienteAPI(clienteFront: any): ClienteForm {
    console.log('Dados recebidos do front-end:', clienteFront);
    
    // Extrair DDD e número do telefone
    const telefoneMatch = clienteFront.telefone.match(/\((\d{2})\)\s*(\d{4,5}-?\d{4})/);
    const ddd = telefoneMatch ? telefoneMatch[1] : '11';
    const numero = telefoneMatch ? telefoneMatch[2].replace('-', '') : clienteFront.telefone.replace(/\D/g, '');

    const clienteAPI = {
      nome: clienteFront.nome,
      sobreNome: clienteFront.sobrenome,
      email: clienteFront.email || null,
      endereco: {
        estado: 'São Paulo', // Valor padrão
        cidade: clienteFront.cidade || 'São Paulo',
        bairro: 'Centro', // Valor padrão
        rua: 'Rua Principal', // Valor padrão
        numero: '123', // Valor padrão
        codigoPostal: '01000-000', // Valor padrão
        informacoesAdicionais: ''
      },
      telefones: [{
        ddd: ddd,
        numero: numero
      }]
    };
    
    console.log('Dados convertidos para API:', clienteAPI);
    return clienteAPI;
  }
}
