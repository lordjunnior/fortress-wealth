## Objetivo

## Novos blocos (inseridos entre seções já existentes)

1. **"Privacidade virou artigo de luxo"** (gatilho de abertura, logo após hero)
   - Analogia: chequin de hotel no app do Gov.br como vetor de vigilância de movimento.
   - PNL: dor presente + escassez ("toda noite que você dorme num hotel, o Estado sabe").
   - Imagem real: smartphone com QR code de chequin sobre balcão de hotel, baixa luz.

2. **"Não-adoxar: descentralizar o que o sistema agrupa"**
   - Analogia: um único cofre vs. vários cofres pequenos. Vazamentos do Serasa, Caixa, Receita.
   - Bloco com 3 cards: documento único = alvo único / múltiplos documentos = superfície reduzida / cada cadastro novo = nova trincheira.
   - Imagem: arquivo metálico com gavetas separadas.

3. **"O que Palau É e o que NÃO é"** (matriz didática reforçada com base no vídeo)
   - 2 colunas verde/vermelho:
     - É: documento estatal real, KYC em exchanges, segundo documento para cadastros, NFT do ID, cartão físico.
     - NÃO é: residência fiscal, plano B de fuga, substituto de Paraguai/Panamá, escudo se você usa o mesmo nome, válido em banco tradicional, garantia eterna (UE pode pressionar no futuro).
   - PNL: anti-bala-de-prata (constraint de honestidade técnica).

4. **"Como funciona na prática"** (passo a passo cinematográfico)
   - 5 passos numerados com micro-ilustrações: abrir RNS ID, preencher cadastro, escolher prazo (1/5/10 anos), pagar em cripto (preferencial, sem rastro), receber NFT + aguardar cartão físico (taxa USD 50 se extraviado).
   - CTA inline: "Comece pelo plano de 1 ano para testar antes de comprometer".

5. **"Para quem serve / Para quem NÃO serve"** (segmentação que aumenta CTR e CTA)
   - 3 personas que se beneficiam: trader cripto, nômade digital com receio de adoxamento, comprador de privacidade documental.
   - 3 personas que devem buscar outra coisa: quem quer mudar residência fiscal, quem quer abrir banco tradicional, quem busca plano B de fuga.

6. **"Palau é uma camada, não a fortaleza"** (fechamento estratégico antes do CTA final)
   - Analogia: cebola de privacidade. Palau é uma das camadas externas. Paraguai/Panamá/Uruguai são o núcleo se você quer residência fiscal real.
   - Link interno para `/saida/jurisdicoes-amigaveis` (aproveita autoridade já construída).
   - PNL: fecha o loop com humildade técnica + próximo passo claro.

## Imagens a gerar (6 novas, padrão tactical/editorial)

- `palau-vigilancia-checkin.jpg` — QR code chequin hotel
- `palau-cofre-multiplo.jpg` — gavetas de arquivo metálico
- `palau-nao-bala-prata.jpg` — escudo rachado, luz dura
- `palau-passo-a-passo.jpg` — laptop com formulário RNS, cartão físico ao lado
- `palau-personas.jpg` — 3 silhuetas em diferentes contextos
- `palau-cebola-camadas.jpg` — diagrama orgânico de camadas concêntricas

## Quarteto do Poder reforçado

- **SEO**: atualizar meta description e adicionar FAQs novas: "Palau ID protege contra Gov.br?", "Palau ID vale mais que cédula paraguaia?", "Palau ID é reconhecido pela União Europeia?", "Posso fazer chequin de hotel com Palau ID?". JSON-LD `FAQPage` ampliado.
- **CTR**: novos H2 com gatilhos ("Privacidade virou artigo de luxo", "Palau não é bala de prata", "Para quem NÃO serve").
- **CTA**: CTA contextual após cada bloco novo, link RNS oficial e link interno para `/saida/jurisdicoes-amigaveis`.
- **PNL**: dor (vigilância gov.br) → contraste (cofre único vs vários) → realismo (não é bala de prata) → solução modular (camada, não fortaleza) → próximo passo.

## Constraints respeitadas

- Sem travessão (—). Sem "lambedor". Sem emojis. Sem "Quarteto do Poder" / "Trio da Blindagem" no UI.
- Padrão claro editorial mantido (sand+teal+copper já vigente na página).
- Bebas Neue + Inter Tight, imagens reais, blocos cinematográficos.
- Mantém `BackToHome` já presente; adiciono também link "Voltar ao hub" para padrão BackNav.

## Arquivos a editar/criar

- `src/pages/PalauDigitalResidency.tsx` (inserir 6 seções novas + FAQs)
- `src/lib/palauData.ts` (novos arrays: PRIVACIDADE_LUXO, NAO_ADOXAR, E_NAO_E, PASSO_A_PASSO, PARA_QUEM, CAMADAS_CEBOLA, FAQ_PALAU expandido)
- 6 novas imagens em `src/assets/`
- Atualização opcional do componente `BackToHome` para `BackNav`
