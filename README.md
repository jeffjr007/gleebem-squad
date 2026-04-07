# Gleebem Wellness App

Módulo funcional de escaneamento de saúde (Health Scan) construído em React Native (Expo) para integração com o Shen.ai SDK e armazenamento de resultados no Firebase Firestore.

## 🚀 Tecnologias Integradas
- **React Native 0.81** com **React 19**
- **Expo SDK 54** (Suporte a iOS, Android e Web)
- **React Navigation Stack** (Navegação customizada)
- **Firebase/Firestore SDK** (Banco de dados e LGPD)
- **Shen.ai SDK** Wrapper (Simulador atual)

## 📦 Como baixar e rodar na sua máquina

### 1. Clonar o projeto
Faça o clone no repositório oficial do Github:
```bash
git clone https://github.com/jeffjr007/gleebem-squad.git
cd gleebem-squad/gleebem-app
```

### 2. Instalar as dependências
Certifique-se de que o [Node.js](https://nodejs.org/) está instalado na sua máquina e rode:
```bash
npm install
```

### 3. Configurar Variáveis de Ambiente (.env)
A boa prática para chaves (como as do Firebase e APIs) é não publicá-las em arquivos `.ts` diretamente, e elas não vão para o GitHub.
Crie um arquivo chamado `.env` na raiz do projeto baseado no arquivo `.env.example` e insira suas chaves do Firebase:

```env
# Firebase Connection Keys
EXPO_PUBLIC_FIREBASE_API_KEY=sua_api_key_aqui
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=seu_projeto
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_projeto.firebasestorage.app
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=seu_app_id

# Shen.ai Key
EXPO_PUBLIC_SHENAI_API_KEY=sua_chave_shenai_de_producao
```
*O Expo vai importar essas variáveis automaticamente com o prefixo EXPO_PUBLIC_*

### 4. Rodar o App (Celular ou Web)
Você pode escolher rodar direto para a Web, ou no seu celular (via App Expo Go).

**Para testar direto na Web:**
```bash
npm run web
```
Acesse `http://localhost:8081` no seu Chrome / Safari e simule as dimensões de um celular.

**Para testar no seu celular (Expo Go):**
- Instale o app "Expo Go" na Google Play ou App Store.
- No terminal, rode:
```bash
npx expo start
```
- Aponte a câmera do celular para o QRCode que aparece de forma gigante no terminal.

## 🗄 Banco de Dados (Firebase)
Ao concluir o fluxo de 30 segundos da câmera, o app salva automaticamente as medições (Frequência Cardíaca, HRV, Nível de Estresse) como documentos no seu "Firestore Database" lá no painel oficial do Firebase!
