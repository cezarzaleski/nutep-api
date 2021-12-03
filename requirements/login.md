# Login

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **POST** na rota **/api/auth/login**
2. ✅ Valida dados obrigatórios **email** e **password**
3. ✅ **Busca** o usuário com o email e senha fornecidos
4. ✅ Gera um **token** de acesso a partir do email do usuário
5. ✅ Retorna **200** com o token de acesso e o nome do usuário

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **400** se email ou password não forem fornecidos pelo client
3. ✅ Retorna erro **401** se não encontrar um usuário com os dados fornecidos
4. ✅ Retorna erro **500** se der erro ao tentar gerar o token de acesso
