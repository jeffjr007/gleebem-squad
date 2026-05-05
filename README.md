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

**Para testar direto na Web (no Computador):**
```bash
npx expo start --web
```
> ⚠️ **Atenção:** Na web, você conseguirá ver a navegação do App, mas o escaneamento da **Shen.ai não funcionará** pois ele depende de código nativo C++ da câmera do dispositivo móvel.

**Para testar o Motor de IA Real (Shen.ai SDK) no seu Celular:**
Como o SDK da Shen.ai usa recursos de Machine Learning e processamento nativo que não existem no Expo Go ou no Navegador, você obrigatoriamente precisa realizar um **Build Nativo** do aplicativo e instalar via cabo USB.

**Requisitos Iniciais (Apenas na 1ª Vez - Windows/Android):**
1. **Java JDK 17:** Instale o Java e configure a variável de sistema `JAVA_HOME`.
2. **Android Studio:** Instale para ter o Android SDK, e certifique-se de configurar a variável `ANDROID_HOME` (ex: `C:\Users\SEU_USUARIO\AppData\Local\Android\Sdk`).
3. **Depuração USB no Celular:** 
   - Vá em Configurações > Sobre o Telefone e toque 7 vezes em "Número da Versão" (Build Number).
   - Volte, entre em Opções do Desenvolvedor e ative **Depuração USB**.
   - Conecte o celular no computador e "Permita" o acesso quando o pop-up surgir na tela do celular.

**Compilando e Rodando:**
Com o celular conectado e reconhecido, rode o comando:
```bash
npx expo run:android
```
Ele vai compilar todo o código nativo (pode demorar alguns minutos na primeira vez) e o app da Gleebem vai abrir magicamente na tela do seu celular, pronto para o scan real!

## 🗄 Banco de Dados (Firebase Firestore)
O app salva automaticamente os dados no Firestore (ex: `/users/{uid}/wellness_tests`). 

### Regras do Firestore
Atualmente estamos utilizando o banco em ambiente local de teste. Para funcionar na sua máquina sem o sistema de Login (Auth) pronto, substitua as regras do seu Firebase por esta:

**Para testes (Atual):**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**Para produção (Após integrar Login):**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```
