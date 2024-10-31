import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedUserId, setExpandedUserId] = useState(null); // Estado para controlar a exibição dos detalhes

  useEffect(() => {
    // Função para buscar dados da API
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');

        // Lista de novos nomes
        const newNames = [
          'Caio Ferreira Costa',
          'Daniel Gomes Pereira',
          'Isabela Nunes Morais',
          'Joana Lopes Cardoso',
          'Juliana Santos Souza',
          'Henrique Nunes Morais',
          'Igor Lopes Cardoso',
          'João Santos Souza',
          'Fernanda Oliveira Alves',
          'Gabriela Rodrigues Sousa',
        ];

        // Atualizar os dados com os novos nomes
        const usersData = newNames.map((name, index) => ({
          id: index + 1, // Atribuir um ID único para cada item
          name: name,
          email: 'email@example.com', // Email fictício
          phone: '000-000-0000', // Telefone fictício
        }));

        setData(usersData); // Definir a nova lista de usuários
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleDetails = (userId) => {
    // Alterna a visibilidade dos detalhes do usuário
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuários</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity onPress={() => toggleDetails(item.id)}>
              <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>
            {expandedUserId === item.id && (
              <View>
                <Text>{item.email}</Text>
                <Text>{item.phone}</Text>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
