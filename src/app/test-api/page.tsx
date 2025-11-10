"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { testGetPerfil } from '@/services/perfil/perfil_service';
import { testGetMarcacoes } from '@/services/perfil/marcacao_service';
import type { Marcacao } from '@/services/perfil/marcacao_service'; 
import { useAuth } from '@/hooks/auth/AuthContext'; 

const buttonStyle: React.CSSProperties = {
  padding: '10px 15px',
  fontSize: '16px',
  cursor: 'pointer',
  backgroundColor: '#0070f3',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  marginRight: '10px',
  marginTop: '10px'
};

const preStyle: React.CSSProperties = {
  backgroundColor: '#f4f4f4',
  border: '1px solid #ddd',
  padding: '15px',
  borderRadius: '5px',
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  minHeight: '100px',
  marginTop: '20px'
};

const cardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '16px',
  margin: '10px 0',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

export default function TestApiPage() {
  const { logout } = useAuth();
  const router = useRouter(); 
  
  const [result, setResult] = useState<string | object | null>('Clique em um botão para testar a API');
  const [marcacoesList, setMarcacoesList] = useState<Marcacao[]>([]);

  const handleLogout = async () => {
    setResult('Testando Logout (POST /api/cidadao/logout)...');
    setMarcacoesList([]);

    try {
      await logout();
      setResult('Logout realizado com sucesso. Redirecionando...');
    } catch (error) {
      setResult(`Erro no Logout: ${(error as Error).message}`);
    }
  };

  const handlePerfil = async () => {
    setResult('Testando Meu Perfil (GET /api/cidadao/meu-perfil)...');
    setMarcacoesList([]);

    try {
      const response = await testGetPerfil();
      setResult(response);
    } catch (error) {
      setResult(`Erro ao buscar perfil: ${(error as Error).message}`);
    }
  };

  const handleMarcacoes = async () => {
    setResult('Testando Marcações (GET /api/cidadao/marcacoes)...');
    
    try {
      const response = await testGetMarcacoes();
      setMarcacoesList(response);
      setResult(null); 
    } catch (error) {
      setResult(`Erro ao buscar marcações: ${(error as Error).message}`);
    }
  };
  
  const handleGoToRenew = () => {
    router.push('/auth/atualizar-senha');
  };
  
  const handleGoToUpdate = () => {
    router.push('/auth/atualizar-perfil');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: 'auto' }}>
      <h1>Página de Teste de API (Rotas Protegidas)</h1>
      <p>Use os botões abaixo para testar as rotas que dependem de sessão e CSRF.</p>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', margin: '20px 0' }}>
        <button onClick={handleLogout} style={{...buttonStyle, backgroundColor: '#dc3545'}}>
          Testar Logout (POST)
        </button>
        <button onClick={handlePerfil} style={buttonStyle}>
          Testar Meu Perfil (GET)
        </button>
        <button onClick={handleMarcacoes} style={{...buttonStyle, backgroundColor: '#28a745'}}>
          Testar Marcações (GET)
        </button>
        
        {}
        <button onClick={handleGoToRenew} style={{...buttonStyle, backgroundColor: '#ffc107', color: '#212529'}}>
          Ir para "Renovar Senha"
        </button>
        <button onClick={handleGoToUpdate} style={{...buttonStyle, backgroundColor: '#17a2b8'}}>
          Ir para "Atualizar Perfil"
        </button>
        {}
      </div>

      <h3>Resultado (Testes GET):</h3>

      {result && (
        <pre style={preStyle}>
          {typeof result === 'object' ? JSON.stringify(result, null, 2) : result}
        </pre>
      )}

      {marcacoesList.length > 0 && (
        <div id="lista-de-cards">
          {marcacoesList.map(marcacao => (
            <div key={marcacao.agendamento_id} style={cardStyle}>
              <h4 style={{marginTop: 0, borderBottom: '1px solid #eee', paddingBottom: '8px'}}>
                {marcacao.nome_card}
              </h4>
              <p><strong>Status:</strong> {marcacao.status_marcacao}</p>
              <p><strong>Data Agendamento:</strong> {marcacao.data_agendamento ? new Date(marcacao.data_agendamento).toLocaleString('pt-BR') : 'N/A'}</p>
              <details>
                <summary>Ver JSON completo do card</summary>
                <pre style={{...preStyle, fontSize: '12px'}}>
                  {JSON.stringify(marcacao, null, 2)}
                </pre>
              </details>
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
}