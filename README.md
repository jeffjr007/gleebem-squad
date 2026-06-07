# Gleebem Wellness App (Squad Gleebem)

> **Jovem Tech 2026.1 — Entregável 2: MVP**

---

## 1. Descrição do Problema e Solução

**O Problema:**
Monitorar saúde de forma contínua exige wearables caros ou consultas presenciais, tornando o acompanhamento preventivo inacessível para a maioria das pessoas no dia a dia.

**A Solução:**
App mobile que mede freq. cardíaca, HRV, estresse e respiração em 30s pela câmera do celular. Sem contato, sem equipamento. Resultado imediato com recomendações personalizadas de saúde.

---

## 2. UX & Design

### Personas

**Lucas, 28 anos — Usuário de Saúde Preventiva**
Jovem adulto, trabalhador CLT, sem condições crônicas diagnosticadas. Sente sintomas de estresse e cansaço frequente mas não tem tempo ou dinheiro para consultas regulares. Quer monitorar seu bem-estar de forma prática, sem sair de casa. Usa smartphone intensamente e valoriza resultados rápidos.

**Dra. Ana, 42 anos — Profissional de Saúde Parceira**
Médica clínica geral parceira da plataforma Gleebem. Precisa de dados contínuos dos pacientes entre consultas para decisões mais precisas. Acessa o histórico de medições via painel de telemedicina integrado.

---

### Jornada do Usuário

```
Home → Intro → Consentimento (LGPD) → Preparação → Scan (30s) → Carregando → Resultado → Recomendações
```

| Tela | O que acontece |
|---|---|
| **Home** | Hub principal com acesso ao scan, histórico e telemedicina |
| **Intro** | Explicação dos 4 indicadores medidos e do processo de 30s |
| **Consentimento** | Disclosure LGPD: o que é coletado e como é processado |
| **Preparação** | Checklist animado: iluminação, conexão, rosto e estabilidade |
| **Scan** | Câmera ativa por 30s com processamento nativo rPPG em tempo real |
| **Carregando** | Animação enquanto os dados são salvos no Firebase |
| **Resultado** | Wellness Score 0–100 + cards de métricas + gauge de estresse |
| **Recomendações** | Dicas personalizadas e exercício de respiração guiada |

---

## 3. Especificação Técnica

### Stack

| Categoria | Tecnologia | Versão |
|---|---|---|
| Linguagem | TypeScript | 5.9.2 |
| Framework | React Native | 0.81.5 |
| Build | Expo SDK | 54.0.35 |
| Navegação | React Navigation Stack | 7.x |
| Banco de Dados | Firebase Firestore | 12.11.0 |
| SDK de Saúde | Shen.ai SDK (rPPG) | 3.0.12 |
| Gráficos | React Native SVG | 15.12.1 |
| Testes | Jest + React Native Testing Library | 29.x / 13.x |
| NDK Android | NDK Side by Side | 29.0.14206865 |

---

### Banco de Dados

Firebase Cloud Firestore (NoSQL). Cada scan gera um documento na coleção:

```
/users/{userId}/wellness_tests/{docId}
```

**Campos do documento:**
```json
{
  "userId": "string",
  "status": "completed",
  "createdAt": "Timestamp",
  "provider": "shenai",
  "rawMetrics": {
    "heartRate":       { "value": 66,  "status": "normal" },
    "hrv":             { "sdnn": 44,   "status": "normal" },
    "stressLevel":     { "score": 32,  "status": "normal" },
    "respiratoryRate": { "value": 19,  "status": "normal" },
    "wellnessScore":   { "value": 54,  "status": "attention" }
  }
}
```

---

### Lógica de Funcionamento

```
Câmera (30s)
    ↓
Shen.ai SDK — algoritmo rPPG (C++ nativo)
    ↓ detecta variações de cor na pele → calcula sinais vitais
getMeasurementResults() → { heartRateBpm, hrvSdnnMs, stressIndex, breathingRateBpm }
    ↓
getHealthRisks() → wellnessScore (0–100)
    ↓
Math.round() → normalização dos valores
    ↓
Firebase Firestore → persistência
    ↓
ResultScreen → exibição ao usuário
```

---

## 4. Passo a Passo para Execução (MVP)

> ⚠️ **IMPORTANTE:** Este guia cobre a execução completa do zero em um novo ambiente Windows/Android.

### Pré-requisitos

- **Node.js** 18+ com npm 10+
- **Java JDK 17** com `JAVA_HOME` configurado
- **Android Studio** com `ANDROID_HOME` configurado
- **Android NDK 29.0.14206865** (instalar via Android Studio → SDK Manager → SDK Tools → NDK Side by Side)
- Celular Android com **Depuração USB** ativada (Configurações → Sobre → toque 7x em "Número da Versão")
- Conta no **Firebase** com projeto Firestore criado
- Conta no **portal Shen.ai** (developer.shen.ai) para obter API Key e o `.aar`

---

### Instalação

**1. Clonar o repositório:**
```bash
git clone https://github.com/jeffjr007/gleebem-squad.git
cd gleebem-squad
```

**2. Instalar dependências Node:**
```bash
npm install
```

**3. Obter o Shen.ai SDK (.aar):**

O arquivo binário não está no repositório. Baixe a versão **exata 3.0.12** no portal [developer.shen.ai](https://developer.shen.ai) e coloque em:
```
react-native-shenai-sdk/android/libs/shenai_sdk.aar
```
```bash
# Criar o diretório caso não exista (PowerShell):
New-Item -ItemType Directory -Force "react-native-shenai-sdk\android\libs"
# Copiar o arquivo baixado para o diretório acima
```

---

### Configuração

Crie o arquivo `.env` na raiz do projeto com base no `.env.example`:

```env
# Firebase — obtenha no Console do Firebase (Configurações do Projeto)
EXPO_PUBLIC_FIREBASE_API_KEY=sua_api_key_aqui
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=seu_projeto
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_projeto.firebasestorage.app
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=seu_app_id

# Shen.ai — obtenha em developer.shen.ai
EXPO_PUBLIC_SHENAI_API_KEY=sua_chave_shenai
```

**Regras do Firestore (para testes — cole no Console Firebase):**
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

---

### Execução

**Build e instalação no celular via USB:**
```bash
npx expo run:android
```
O Gradle compila o código nativo (~10–20 min na 1ª vez), instala o APK e abre o app automaticamente.

Após o app abrir, se aparecer "Unable to load script", rode:
```bash
adb reverse tcp:8081 tcp:8081
```

**Apenas navegação (sem SDK real):**
```bash
npx expo start --web
```

---

### Solução de Problemas Conhecidos

| Erro | Causa | Solução |
|---|---|---|
| `adb: No such file or directory` | Shell script no lugar do `adb.exe` | Renomear `adb.exe.bak` → `adb.exe` e remover o script |
| `Unable to load script` | Metro não alcança o celular | `adb reverse tcp:8081 tcp:8081` |
| `Unable to load script` (com WSL) | Portproxy do WSL intercepta porta 8081 | `netsh interface portproxy delete v4tov4 listenaddress=127.0.0.1 listenport=8081` (Admin) |
| `undefined symbol: operator new` | NDK 29 não instalado ou `.aar` versão errada | Instalar NDK 29.0.14206865 + usar `.aar` da versão 3.0.12 |
| `Unable to delete directory` (build) | Processos Java/Node bloqueando arquivos | Fechar Metro, encerrar processos Java e repetir |

---

## 5. Links de Acesso

**Repositório GitHub:**
[github.com/jeffjr007/gleebem-squad](https://github.com/jeffjr007/gleebem-squad)

**APK Android (Download Direto):**
[Acessar pasta no Google Drive](https://drive.google.com/drive/folders/18StK9mEANxOUIPMQZitsvptoSX1dYyiU)

**Apresentação (Pitch):**
[LINK_APRESENTACAO]

---

## 6. A Equipe

**Vitor Fernandes**
Responsável por UX/Design Research, construção e aprovação do protótipo, extração e implementação do Design System Gleebem. Na parte técnica: análise e resolução de bugs de integração nativa, alinhamento e gestão de dependências (Expo SDK 54), implementação de testes automatizados (Jest + RNTL), normalização dos dados do SDK na camada de display, e liderança na validação e aprovação do SDK Shen.ai com o PO.

**Jeferson Junior**
Responsável pelo desenvolvimento core do produto: conversão do protótipo HTML para React Native, construção de todas as telas e fluxo único de navegação, integração completa do Shen.ai SDK com a bridge nativa Android (Java/Kotlin + C++), implementação do serviço Firebase e do fluxo de dados câmera → SDK → Firestore → tela.

---

### Aprendizados

- Integração de SDKs nativos C++ em projetos React Native/Expo requer atenção rigorosa ao alinhamento de versões de NDK e compatibilidade de ABI
- O algoritmo rPPG do Shen.ai é sensível às condições de iluminação e posicionamento — feedback em tempo real para o usuário é essencial para qualidade da medição
- Builds nativos Android em ambiente Windows apresentam desafios únicos: conflitos de portproxy WSL, ADB corrompido e locks de arquivo entre builds consecutivos
- A separação clara entre camada de serviço (normalização e persistência) e camada de apresentação facilita testes e manutenção
