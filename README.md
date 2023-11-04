# Projeto Finance APP - Backend 💻

Este é um projeto de um Dashboard Financeiro que fornece uma visão abrangente e interativa das finanças de sua empresa. Ele permite que você acompanhe e analise seus dados financeiros de forma eficaz, ajudando na tomada de decisões informadas e na gestão financeira eficiente.

## Tecnologias utilizadas 🚀

- **Express:** Express é um framework Node.js amplamente utilizado para desenvolvimento de aplicativos web e APIs com facilidade e eficiência
- **Postgres:** Um sistema de gerenciamento de banco de dados relacional.

## Funcionalidades 📦

- **Arquitetura:** Clean Architecture
- **Autenticação:** Autenticação de usuário seguindo o padrão de segurança com a biblioteca _bcrypt_.

## Protótipo no Figma 🎨

Você pode visualizar o protótipo do nosso projeto no Figma. Ele oferece uma prévia visual de como a interface do usuário é projetada e como as diferentes funcionalidades são organizadas. Confira o protótipo [aqui](<https://www.figma.com/file/lR2pb1lMAPOQqCtLT6WELv/Dashboard-Financeira-(Copy)?type=design&t=kZdTfb2UqmIMfSzw-6>)

## Docker

Iniciar o container

```docker
docker run -d \
  --name finance-app-postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_USER=root \
  -e POSTGRES_DB=financeapp \
  -v ~/.postgres/finance-app:/var/lib/postgresql/data \
  -p 5431:5432 \
  postgres
```

## Contribuições e Colaborações 🤝

Este projeto está totalmente aberto a contribuições. Se você deseja colaborar, fique à vontade para criar pull requests, corrigir bugs, adicionar novos recursos ou aprimorar a documentação. Sua contribuição é valiosa e ajuda a melhorar ainda mais este projeto!

### Como contribuir

1. Faça um _fork_ desse projeto.
2. Crie uma branch para a sua contribuição

```bash
  git checkout -b minha-contribuicao
```

3. Faça suas alterações e adicione commits descritivos (seguindo o Conventional Commits, preferencialmente).
4. Crie um pull request para a branch `main` deste repositório.
