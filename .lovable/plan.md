# Plano de ajustes — /sobre-mim

## Objetivo
Transformar a página de "portfólio de designer" em cartão de visita de autoridade do arquiteto de soberania, alinhada ao padrão das páginas pesadas do site (Jurisdições, Confisco 1990, Jade Core).

## Escopo
Ajustes visuais, narrativos e de conversão na página `/sobre-mim`. Nenhuma alteração de backend ou schema.

## Fases

### Fase 1 — Hero de autoridade (Posicionamento + Percepção)
- Reescrever headline do hero para vender o arquiteto de sistemas de soberania, não skills genéricos de designer.
- Tornar a foto real (preto-e-branco, low-key) o protagonista visual do hero, com overlay gradiente escuro.
- Substituir o fundo estático por vídeo loop macro de hardware (Bitcoin/infraestrutura) ou imagem cinematográfica real.
- Adicionar grain sutil + brasas/partículas no hero para entrar no clima do site.
- Garantir: a pessoa que chega de "Confisco 1990" ou "Jade Core" entenda em 5 segundos por que você é a autoridade daquele conteúdo.

### Fase 2 — Ponte narrativa (Posicionamento)
- Inserir após o hero um bloco curto (2-3 parágrafos) que conecte a biografia técnica aos temas do site: jurisdição, autocustódia, infraestrutura, escape fiat.
- Usar termos do universo do site ("gaiola", "blindagem", "jurisdição", "soberania") sem forçar.
- Manter o tom de "operador que documenta o que viveu", não CV de freelancer.

### Fase 3 — Prova viva (Prova + PNL)
- Criar seção "Prova de Trabalho" com 3 projetos/cases reais e seus números (ex: crescimento de canal, views, ferramentas construídas, proteção estruturada).
- Substituir os contadores genéricos por métricas que comprovem autoridade no nicho.
- Adicionar foto real ou screenshot de cada projeto. Se não houver, gerar imagens cinematográficas.

### Fase 4 — Arsenal técnico (Produto + Percepção)
- Manter o catálogo de serviços, mas reposicionar como "Arsenal de Autonomia" — cada skill vira uma ferramenta de construção de sistemas soberanos.
- Substituir ícones genéricos por imagens macro/reais onde possível.
- Ajustar a paleta dos gráficos de azul para âmbar/laranja Bitcoin para alinhar com o resto do site.

### Fase 5 — Domínio Técnico (Percepção + Efeitos)
- Manter o HUD interativo, mas aplicar efeitos de scanline e glow âmbar.
- Garantir que os nós de tecnologia sejam acionáveis por hover e teclado (acessibilidade).
- Animar a ativação dos nós com sequência de "boot" ao entrar no viewport.

### Fase 6 — CTA final duplo (PNL/CTA)
- Substituir o CTA único "Protocolo de Ação" por CTA duplo: "Trabalhar comigo" + "Explorar conteúdo".
- Aplicar gatilhos de escassez e autoridade no copy (sem exagerar).
- Garantir que os CTAs sejam visíveis no mobile e acessíveis por teclado.

### Fase 7 — Assets visuais
- Gerar imagens cinematográficas/vídeo para:
  - Hero (macro hardware / Bitcoin / infraestrutura)
  - Bloco Prova de Trabalho (3 projetos)
  - Arsenal (se necessário)
- Verificar se a foto real do usuário já está otimizada; se não, otimizar.

### Fase 8 — Revisão e build
- Revisar todos os textos para remover travessões longos e termos proibidos.
- Verificar contraste, acessibilidade e responsividade.
- Rodar build e verificar se não há erros de Tailwind/classes customizadas.

## Entregáveis
- `src/pages/SobreMim.tsx` reescrito e expandido.
- Novas imagens/vídeo em `src/assets/` (ou asset pointers).
- Atualização de links internos se necessário (nenhuma mudança de rota).

## O que NÃO será feito
- Alterar rotas ou navegação.
- Criar backend/Supabase/schema.
- Adicionar novas páginas.
- Copiar texto do usuário; tudo será reescrito para autoridade + CTA + SEO + PNL.

## Critério de conclusão
A página deve parecer, ao vivo, do mesmo time de produção de `Jade Core`, `Cartões Cripto Sem Reporte` e `Confisco 1990`: escura, real, prova, movimento, autoridade.