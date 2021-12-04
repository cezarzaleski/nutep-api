# Create patient

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **POST** na rota **/api/patient**
2. ✅ Valida dados obrigatórios **fullName**, **birthday**, **sex**, **hospitalizationStatus**
3. ✅ **Cria** um novo paciente
4. ✅ Retorna **200** com o paciente criado

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **400** se fullName ou birthday ou sex ou hospitalizationStatus não forem fornecidos pelo client
4. ✅ Retorna erro **500** se der erro ao tentar criar o paciente
