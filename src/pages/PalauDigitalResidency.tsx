import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";

const PalauDigitalResidency = () => {
  const progRef = useRef<HTMLDivElement>(null);
  const curDotRef = useRef<HTMLDivElement>(null);
  const curRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      if (progRef.current) progRef.current.style.width = pct + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onMove = (e: MouseEvent) => {
      if (curDotRef.current) {
        curDotRef.current.style.left = e.clientX + "px";
        curDotRef.current.style.top = e.clientY + "px";
      }
      if (curRingRef.current) {
        curRingRef.current.style.left = e.clientX + "px";
        curRingRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", onMove);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) en.target.classList.add("in");
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      io.disconnect();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>ID de Palau — Lord Junnior</title>
        <meta
          name="description"
          content="Entenda o que é o ID de Palau, onde ele pode ser usado, suas limitações e como ele se encaixa em uma estratégia internacional de soberania pessoal."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <style>{`
.palau-root *,.palau-root *::before,.palau-root *::after{box-sizing:border-box;margin:0;padding:0}
.palau-root{
  --ink:#0D0C0A;
  --cream:#F2EDE4;
  --cream2:#E8E0D4;
  --gold:#C9A84C;
  --gold2:#E8C96A;
  --stone:#9A9288;
  --white:#FAFAF8;
  font-family:'DM Sans',sans-serif;background:var(--cream);color:var(--ink);overflow-x:hidden;cursor:none;
}

#cur-dot{width:8px;height:8px;background:var(--cream);border-radius:50%;position:fixed;transform:translate(-50%,-50%);transition:transform .1s;pointer-events:none;z-index:9999;mix-blend-mode:difference}
#cur-ring{width:36px;height:36px;border:1px solid rgba(242,237,228,.4);border-radius:50%;position:fixed;transform:translate(-50%,-50%);transition:width .25s,height .25s;pointer-events:none;z-index:9999;mix-blend-mode:difference}

.palau-root nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;justify-content:space-between;align-items:center;padding:2rem 3.5rem;pointer-events:none}
.palau-root .nav-brand{pointer-events:all;font-family:'DM Sans',sans-serif;font-size:.65rem;font-weight:500;letter-spacing:.3em;text-transform:uppercase;color:var(--cream);text-decoration:none}
.palau-root .nav-year{font-family:'DM Sans',sans-serif;font-size:.6rem;letter-spacing:.2em;color:rgba(242,237,228,.4)}

#prog{position:fixed;top:0;left:0;height:1px;background:var(--gold);z-index:200;width:0;transition:width .08s linear}

.palau-root .hero{height:100vh;min-height:700px;position:relative;overflow:hidden;background:#0D0C0A;display:flex;align-items:flex-end}
.palau-root .hero-atm{position:absolute;inset:0;z-index:0;background:radial-gradient(ellipse 80% 60% at 65% 40%, rgba(201,168,76,.07) 0%, transparent 60%),radial-gradient(ellipse 50% 80% at 20% 80%, rgba(201,168,76,.04) 0%, transparent 50%),#141210}
.palau-root .hero-grain{position:absolute;inset:0;z-index:2;opacity:.35;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");pointer-events:none}
.palau-root .hero-photo{position:absolute;inset:0;z-index:1;background:linear-gradient(to bottom, rgba(13,12,10,.15) 0%, rgba(13,12,10,.0) 30%, rgba(13,12,10,.5) 70%, rgba(13,12,10,.92) 100%),linear-gradient(to right, rgba(13,12,10,.4) 0%, transparent 60%)}
.palau-root .hero-content{position:relative;z-index:3;padding:0 3.5rem 4.5rem;width:100%}
.palau-root .hero-tag{font-family:'DM Sans',sans-serif;font-size:.6rem;font-weight:500;letter-spacing:.35em;text-transform:uppercase;color:var(--gold);margin-bottom:1rem;opacity:0;animation:palauFadeUp .7s .3s forwards}
.palau-root .hero-huge{font-family:'Anton',sans-serif;font-size:clamp(5rem,17vw,17rem);line-height:.88;letter-spacing:-.02em;color:var(--cream);opacity:0;animation:palauFadeUp .9s .15s forwards}
.palau-root .hero-huge em{font-style:normal;-webkit-text-stroke:1px var(--gold);color:transparent}
.palau-root .hero-row{display:flex;align-items:flex-end;justify-content:space-between;gap:2rem;margin-top:1rem;opacity:0;animation:palauFadeUp .7s .5s forwards}
.palau-root .hero-sub{font-family:'Playfair Display',serif;font-size:clamp(.9rem,1.6vw,1.3rem);font-weight:400;font-style:italic;color:rgba(242,237,228,.55);max-width:460px;line-height:1.7}
.palau-root .hero-meta{text-align:right;flex-shrink:0}
.palau-root .hero-meta div{display:block;margin-bottom:.6rem}
.palau-root .hero-meta span{display:block;font-size:.55rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(242,237,228,.28);margin-bottom:.3rem}
.palau-root .hero-meta strong{display:block;font-size:.72rem;font-weight:500;color:rgba(242,237,228,.65);letter-spacing:.1em}
.palau-root .hero-scroll-hint{position:absolute;bottom:4.5rem;right:3.5rem;z-index:3;display:flex;flex-direction:column;align-items:center;gap:.5rem;opacity:0;animation:palauFadeUp .6s 1s forwards}
.palau-root .hero-scroll-hint span{font-size:.5rem;letter-spacing:.3em;text-transform:uppercase;color:rgba(242,237,228,.25);writing-mode:vertical-rl}
.palau-root .scroll-bar{width:1px;height:50px;background:linear-gradient(var(--gold),transparent);animation:palauScrollAnim 2s ease-in-out 1.5s infinite}

@keyframes palauScrollAnim{0%{transform:scaleY(0);transform-origin:top}49%{transform:scaleY(1);transform-origin:top}50%{transform:scaleY(1);transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom}}
@keyframes palauFadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}

.palau-root .s-clareza{background:var(--cream);padding:10rem 3.5rem 8rem;position:relative;overflow:hidden}
.palau-root .s-clareza::before{content:'01';font-family:'Anton',sans-serif;font-size:28vw;line-height:1;color:rgba(13,12,10,.04);position:absolute;top:-4rem;left:-2rem;pointer-events:none;user-select:none;z-index:0}
.palau-root .clareza-inner{position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;gap:6rem;max-width:1300px;margin:0 auto;align-items:start}
.palau-root .cl-label{font-family:'DM Sans',sans-serif;font-size:.58rem;font-weight:500;letter-spacing:.35em;text-transform:uppercase;color:var(--gold);margin-bottom:1.25rem}
.palau-root .cl-title{font-family:'Anton',sans-serif;font-size:clamp(3rem,6vw,6.5rem);line-height:.92;letter-spacing:-.01em;margin-bottom:2rem}
.palau-root .cl-title em{font-style:normal;-webkit-text-stroke:1.5px var(--stone);color:transparent;display:block}
.palau-root .cl-body{font-size:.95rem;font-weight:300;line-height:1.85;color:var(--stone);max-width:380px}
.palau-root .cl-lists{padding-top:2rem}
.palau-root .cl-block{margin-bottom:2.5rem}
.palau-root .cl-block-head{display:flex;align-items:center;gap:.75rem;margin-bottom:1rem;padding-bottom:.75rem;border-bottom:1px solid rgba(13,12,10,.08)}
.palau-root .cl-block-head svg{flex-shrink:0}
.palau-root .cl-block-head-text{font-family:'DM Sans',sans-serif;font-size:.6rem;font-weight:500;letter-spacing:.25em;text-transform:uppercase}
.palau-root .cl-block-head-text.neg{color:#B04040}
.palau-root .cl-block-head-text.pos{color:var(--gold)}
.palau-root .cl-list{list-style:none}
.palau-root .cl-list li{font-size:.88rem;font-weight:300;line-height:1.7;color:var(--ink);padding:.6rem 0 .6rem 1.5rem;border-bottom:1px solid rgba(13,12,10,.05);position:relative}
.palau-root .neg-list li::before{content:'';position:absolute;left:0;top:50%;width:.75rem;height:1px;background:#B04040}
.palau-root .pos-list li::before{content:'\\25C6';position:absolute;left:0;top:.7rem;font-size:.4rem;color:var(--gold)}

.palau-root .s-aplica{background:#0D0C0A;padding:8rem 0 0;overflow:hidden}
.palau-root .aplica-head{padding:0 3.5rem 5rem;display:flex;justify-content:space-between;align-items:flex-end;max-width:1300px;margin:0 auto}
.palau-root .al-label{font-size:.58rem;font-weight:500;letter-spacing:.35em;text-transform:uppercase;color:var(--gold);margin-bottom:1rem}
.palau-root .aplica-head-left h2{font-family:'Anton',sans-serif;font-size:clamp(3.5rem,7vw,8rem);line-height:.9;letter-spacing:-.02em;color:var(--cream)}
.palau-root .aplica-head-left h2 em{font-style:normal;-webkit-text-stroke:1.5px rgba(242,237,228,.25);color:transparent;display:block}
.palau-root .aplica-head-right{max-width:320px;text-align:right;font-size:.83rem;font-weight:300;line-height:1.8;color:rgba(242,237,228,.35);padding-bottom:.5rem}
.palau-root .aplica-grid{display:grid;grid-template-columns:2fr 1.2fr 1fr;grid-template-rows:420px 320px;gap:2px}
.palau-root .ag-card{position:relative;overflow:hidden;cursor:pointer}
.palau-root .ag-card::before{content:'';position:absolute;inset:0;z-index:1;background:linear-gradient(to top, rgba(13,12,10,.9) 0%, rgba(13,12,10,.2) 60%, transparent 100%);transition:opacity .4s ease}
.palau-root .ag-card:hover::before{opacity:.65}
.palau-root .ag-bg{position:absolute;inset:0;background-size:cover;background-position:center;transition:transform .6s ease}
.palau-root .ag-card:hover .ag-bg{transform:scale(1.05)}
.palau-root .ag-bg-1{background:linear-gradient(135deg,#1a2a1a 0%,#0d1a0d 40%,#0a1510 100%)}
.palau-root .ag-bg-2{background:linear-gradient(160deg,#0d1520 0%,#050d18 50%,#020810 100%)}
.palau-root .ag-bg-3{background:linear-gradient(140deg,#1a1008 0%,#0d0a04 60%,#050402 100%)}
.palau-root .ag-bg-4{background:linear-gradient(150deg,#0a1218 0%,#060c12 50%,#03060a 100%)}
.palau-root .ag-bg-5{background:linear-gradient(130deg,#140d0a 0%,#0d0806 50%,#080504 100%)}
.palau-root .ag-card:nth-child(1){grid-column:1;grid-row:1/3}
.palau-root .ag-card:nth-child(2){grid-column:2;grid-row:1}
.palau-root .ag-card:nth-child(3){grid-column:3;grid-row:1}
.palau-root .ag-card:nth-child(4){grid-column:2;grid-row:2}
.palau-root .ag-card:nth-child(5){grid-column:3;grid-row:2}
.palau-root .ag-content{position:absolute;bottom:0;left:0;right:0;z-index:2;padding:2rem 1.75rem}
.palau-root .ag-cat{font-size:.55rem;font-weight:500;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);margin-bottom:.5rem}
.palau-root .ag-title{font-family:'Anton',sans-serif;font-size:clamp(1.4rem,3vw,2.2rem);line-height:.95;letter-spacing:-.01em;color:var(--cream);margin-bottom:1rem}
.palau-root .ag-card:nth-child(1) .ag-title{font-size:clamp(2rem,4vw,3.5rem)}
.palau-root .ag-card:nth-child(1) .ag-content{padding:3rem}
.palau-root .ag-items{list-style:none}
.palau-root .ag-items li{font-size:.75rem;font-weight:300;color:rgba(242,237,228,.38);padding:.35rem 0;border-bottom:1px solid rgba(242,237,228,.06);display:flex;justify-content:space-between;align-items:center;transition:color .2s}
.palau-root .ag-card:hover .ag-items li{color:rgba(242,237,228,.65)}
.palau-root .ag-items li::after{content:'\\2192';font-size:.6rem;color:var(--gold);opacity:0;transform:translateX(-6px);transition:all .2s}
.palau-root .ag-card:hover .ag-items li::after{opacity:1;transform:translateX(0)}
.palau-root .ag-note{margin-top:.75rem;font-size:.65rem;font-style:italic;color:rgba(242,237,228,.2);line-height:1.5}
.palau-root .ag-cols{display:grid;grid-template-columns:1fr 1fr;gap:1rem}

.palau-root .s-quebra{background:var(--ink);padding:9rem 3.5rem;position:relative;overflow:hidden}
.palau-root .quebra-pct{position:absolute;font-family:'Anton',sans-serif;font-size:clamp(20rem,42vw,48rem);line-height:.8;color:rgba(242,237,228,.03);top:-4rem;left:-3rem;pointer-events:none;user-select:none;letter-spacing:-.04em}
.palau-root .quebra-inner{position:relative;z-index:1;max-width:1300px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:8rem;align-items:center}
.palau-root .qb-label{font-size:.58rem;font-weight:500;letter-spacing:.35em;text-transform:uppercase;color:#B04040;margin-bottom:1.25rem}
.palau-root .qb-title{font-family:'Anton',sans-serif;font-size:clamp(3rem,5.5vw,6rem);line-height:.9;letter-spacing:-.01em;color:var(--cream);margin-bottom:2rem}
.palau-root .qb-title em{font-style:italic;font-family:'Playfair Display',serif;font-size:clamp(2.5rem,4.5vw,5rem);color:rgba(242,237,228,.4);display:block;font-weight:400;letter-spacing:0}
.palau-root .qb-text{font-size:.93rem;font-weight:300;line-height:1.9;color:rgba(242,237,228,.4)}
.palau-root .qb-list{list-style:none;counter-reset:qb}
.palau-root .qb-list li{counter-increment:qb;display:flex;gap:1.5rem;padding:1.5rem 0;border-bottom:1px solid rgba(242,237,228,.06);transition:border-color .3s}
.palau-root .qb-list li:hover{border-color:rgba(201,168,76,.2)}
.palau-root .qb-list li::before{content:counter(qb,decimal-leading-zero);font-family:'Playfair Display',serif;font-size:1.2rem;font-style:italic;color:rgba(242,237,228,.15);flex-shrink:0;line-height:1.4}
.palau-root .qb-item strong{display:block;font-family:'DM Sans',sans-serif;font-size:.72rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:rgba(242,237,228,.65);margin-bottom:.4rem}
.palau-root .qb-item p{font-size:.82rem;font-weight:300;line-height:1.75;color:rgba(242,237,228,.3)}

.palau-root .s-limit{background:var(--cream2);padding:8rem 3.5rem}
.palau-root .limit-head{max-width:1300px;margin:0 auto 4rem;display:flex;justify-content:space-between;align-items:flex-end}
.palau-root .lt-title{font-family:'Anton',sans-serif;font-size:clamp(3rem,6vw,6.5rem);line-height:.9;letter-spacing:-.015em}
.palau-root .lt-title span{display:block;font-family:'Playfair Display',serif;font-size:clamp(1.2rem,2.5vw,2.5rem);font-weight:400;font-style:italic;color:var(--stone);letter-spacing:0;line-height:1.4}
.palau-root .lt-note{max-width:300px;text-align:right;font-size:.83rem;font-weight:300;line-height:1.8;color:var(--stone);border-left:2px solid rgba(201,168,76,.3);padding-left:1.25rem}
.palau-root .limit-grid{max-width:1300px;margin:0 auto;display:grid;grid-template-columns:1.6fr 1fr 1fr;grid-template-rows:auto auto;gap:1.5px}
.palau-root .lc{background:var(--cream);padding:2.5rem;position:relative;overflow:hidden;transition:background .3s}
.palau-root .lc:hover{background:#fff}
.palau-root .lc::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:transparent;transition:background .3s}
.palau-root .lc:hover::before{background:var(--gold)}
.palau-root .lc:nth-child(1){grid-column:1;grid-row:1/3}
.palau-root .lc:nth-child(4){grid-column:2/4;grid-row:2}
.palau-root .lc-badge{display:inline-block;font-family:'DM Sans',sans-serif;font-size:.55rem;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:#B04040;padding:.25rem .7rem;border:1px solid rgba(176,64,64,.2);margin-bottom:1.25rem}
.palau-root .lc-title{font-family:'Playfair Display',serif;font-size:clamp(1.2rem,2vw,1.7rem);font-weight:700;line-height:1.2;margin-bottom:1rem}
.palau-root .lc:nth-child(1) .lc-title{font-size:clamp(1.8rem,3vw,2.8rem)}
.palau-root .lc-text{font-size:.86rem;font-weight:300;line-height:1.8;color:var(--stone)}

.palau-root .s-valor{background:var(--ink);padding:8rem 3.5rem;position:relative;overflow:hidden}
.palau-root .valor-quote{max-width:1300px;margin:0 auto 6rem;position:relative}
.palau-root .valor-quote::before{content:'\\201C';font-family:'Playfair Display',serif;font-size:clamp(12rem,22vw,20rem);line-height:.7;color:rgba(201,168,76,.07);position:absolute;top:-3rem;left:-2rem;pointer-events:none}
.palau-root .valor-quote-text{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,3.5vw,3.5rem);font-weight:400;font-style:italic;line-height:1.3;color:var(--cream);position:relative;z-index:1;max-width:900px}
.palau-root .valor-quote-text em{font-style:normal;color:var(--gold)}
.palau-root .valor-source{margin-top:1.5rem;font-size:.65rem;letter-spacing:.25em;text-transform:uppercase;color:rgba(242,237,228,.25)}
.palau-root .valor-cols{max-width:1300px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid rgba(242,237,228,.06)}
.palau-root .vc{padding:2.5rem 2rem 2.5rem 0;border-right:1px solid rgba(242,237,228,.06);transition:padding-left .3s}
.palau-root .vc:last-child{border-right:none}
.palau-root .vc:hover{padding-left:.75rem}
.palau-root .vc-sym{font-size:1.2rem;color:var(--gold);margin-bottom:1.25rem;display:block;line-height:1}
.palau-root .vc-title{font-family:'DM Sans',sans-serif;font-size:.68rem;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:rgba(242,237,228,.55);margin-bottom:.75rem}
.palau-root .vc-text{font-size:.82rem;font-weight:300;line-height:1.75;color:rgba(242,237,228,.25);transition:color .3s}
.palau-root .vc:hover .vc-text{color:rgba(242,237,228,.5)}

.palau-root .s-exec{min-height:70vh;position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:flex-end;background:#08100d}
.palau-root .exec-bg{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(8,16,13,0) 0%,rgba(8,16,13,.4) 50%,rgba(8,16,13,.95) 100%),#0a1510}
.palau-root .exec-content{position:relative;z-index:1;padding:0 3.5rem 5rem}
.palau-root .ex-label{font-size:.58rem;font-weight:500;letter-spacing:.35em;text-transform:uppercase;color:var(--gold);margin-bottom:1rem}
.palau-root .ex-title{font-family:'Anton',sans-serif;font-size:clamp(3rem,6vw,7rem);line-height:.88;letter-spacing:-.015em;color:var(--cream);margin-bottom:4rem}
.palau-root .steps{display:grid;grid-template-columns:repeat(5,1fr);gap:0;border-top:1px solid rgba(242,237,228,.08);position:relative}
.palau-root .step{padding:2rem 1.5rem 0 0;position:relative;cursor:default}
.palau-root .step::after{content:'';position:absolute;top:-1px;left:0;width:0;height:2px;background:var(--gold);transition:width .4s ease}
.palau-root .step.active::after,.palau-root .step:hover::after{width:100%}
.palau-root .step-n{font-family:'Playfair Display',serif;font-size:2.5rem;font-weight:400;font-style:italic;color:rgba(242,237,228,.1);line-height:1;margin-bottom:1rem;transition:color .3s}
.palau-root .step.active .step-n,.palau-root .step:hover .step-n{color:var(--gold)}
.palau-root .step-title{font-family:'DM Sans',sans-serif;font-size:.65rem;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:rgba(242,237,228,.35);margin-bottom:.6rem;transition:color .3s}
.palau-root .step.active .step-title,.palau-root .step:hover .step-title{color:rgba(242,237,228,.8)}
.palau-root .step-desc{font-size:.75rem;font-weight:300;line-height:1.65;color:rgba(242,237,228,.18);transition:color .3s}
.palau-root .step.active .step-desc,.palau-root .step:hover .step-desc{color:rgba(242,237,228,.45)}

.palau-root .s-strat{background:var(--cream);padding:0;display:grid;grid-template-columns:1fr 1fr;min-height:80vh}
.palau-root .strat-visual{position:relative;overflow:hidden;background:#0D0C0A;display:flex;align-items:center;justify-content:center}
.palau-root .strat-vis-bg{position:absolute;inset:0;background:radial-gradient(ellipse 70% 70% at 50% 50%,rgba(201,168,76,.06),transparent 65%),#0D0C0A}
.palau-root .rings{position:relative;width:340px;height:340px;display:flex;align-items:center;justify-content:center}
.palau-root .ring{position:absolute;border-radius:50%;border:1px solid rgba(201,168,76,.12);animation:palauRingPulse 4s ease-in-out infinite}
.palau-root .ring:nth-child(1){width:340px;height:340px;animation-delay:0s}
.palau-root .ring:nth-child(2){width:270px;height:270px;animation-delay:.5s;border-color:rgba(201,168,76,.18)}
.palau-root .ring:nth-child(3){width:200px;height:200px;animation-delay:1s;border-color:rgba(201,168,76,.25)}
@keyframes palauRingPulse{0%,100%{opacity:.6;transform:scale(1)}50%{opacity:1;transform:scale(1.02)}}
.palau-root .ring-center{width:100px;height:100px;border-radius:50%;background:var(--gold);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:.25rem;z-index:1}
.palau-root .ring-center svg{width:44px;height:44px}
.palau-root .ring-center span{font-family:'DM Sans',sans-serif;font-size:.45rem;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--ink)}
.palau-root .strat-content{padding:6rem 4.5rem;display:flex;flex-direction:column;justify-content:center}
.palau-root .st-label{font-size:.58rem;font-weight:500;letter-spacing:.35em;text-transform:uppercase;color:var(--gold);margin-bottom:1.25rem}
.palau-root .st-title{font-family:'Anton',sans-serif;font-size:clamp(2.5rem,5vw,5.5rem);line-height:.9;letter-spacing:-.015em;margin-bottom:.75rem}
.palau-root .st-sub{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:400;font-style:italic;color:var(--stone);margin-bottom:3rem;line-height:1.6}
.palau-root .st-specs{list-style:none;margin-bottom:3rem}
.palau-root .st-specs li{display:flex;justify-content:space-between;align-items:center;padding:1rem 0;border-bottom:1px solid rgba(13,12,10,.07);font-size:.85rem}
.palau-root .sp-key{font-size:.6rem;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:var(--stone)}
.palau-root .sp-val{font-weight:400;color:var(--ink)}
.palau-root .sp-val.g{color:var(--gold);font-weight:500}

.palau-root .s-faq{background:var(--ink);padding:8rem 3.5rem}
.palau-root .faq-inner{max-width:900px;margin:0 auto}
.palau-root .faq-label{font-size:.58rem;font-weight:500;letter-spacing:.35em;text-transform:uppercase;color:var(--gold);margin-bottom:1rem;text-align:center}
.palau-root .faq-title{font-family:'Anton',sans-serif;font-size:clamp(2.5rem,5vw,6rem);line-height:.9;letter-spacing:-.015em;color:var(--cream);text-align:center;margin-bottom:5rem}
.palau-root .faq-title em{font-family:'Playfair Display',serif;font-style:italic;font-size:clamp(1.8rem,3.5vw,4rem);color:rgba(242,237,228,.35);display:block;font-weight:400;letter-spacing:0;line-height:1.3}
.palau-root details{border-top:1px solid rgba(242,237,228,.07)}
.palau-root details:last-of-type{border-bottom:1px solid rgba(242,237,228,.07)}
.palau-root details summary{display:flex;justify-content:space-between;align-items:center;padding:1.6rem 0;cursor:pointer;gap:2rem;list-style:none}
.palau-root details summary::-webkit-details-marker{display:none}
.palau-root .faq-q{font-family:'Playfair Display',serif;font-size:1.05rem;font-weight:400;color:rgba(242,237,228,.65);line-height:1.5;transition:color .2s}
.palau-root details[open] .faq-q{color:var(--gold)}
.palau-root .faq-ico{width:26px;height:26px;flex-shrink:0;border-radius:50%;border:1px solid rgba(242,237,228,.15);display:flex;align-items:center;justify-content:center;transition:all .25s}
.palau-root details[open] .faq-ico{background:var(--gold);border-color:var(--gold);transform:rotate(45deg)}
.palau-root .faq-ico svg{width:9px;height:9px;fill:none;stroke:rgba(242,237,228,.5);stroke-width:1.5;transition:stroke .25s}
.palau-root details[open] .faq-ico svg{stroke:var(--ink)}
.palau-root .faq-a{padding:0 0 1.75rem;font-size:.88rem;font-weight:300;line-height:1.9;color:rgba(242,237,228,.35);max-width:700px}

.palau-root .s-cta{background:var(--ink);padding:10rem 3.5rem 8rem;position:relative;overflow:hidden;text-align:center;border-top:1px solid rgba(242,237,228,.04)}
.palau-root .cta-noise{position:absolute;inset:0;opacity:.2;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");pointer-events:none}
.palau-root .cta-glow{position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(201,168,76,.06) 0%,transparent 70%);top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none}
.palau-root .cta-inner{position:relative;z-index:1}
.palau-root .cta-eyebrow{font-size:.58rem;font-weight:500;letter-spacing:.35em;text-transform:uppercase;color:var(--gold);margin-bottom:1.5rem}
.palau-root .cta-big{font-family:'Anton',sans-serif;font-size:clamp(4rem,10vw,12rem);line-height:.85;letter-spacing:-.02em;color:var(--cream);margin-bottom:.5rem}
.palau-root .cta-big span{display:block;-webkit-text-stroke:1px rgba(201,168,76,.4);color:transparent}
.palau-root .cta-sub{font-family:'Playfair Display',serif;font-size:clamp(.9rem,1.5vw,1.3rem);font-weight:400;font-style:italic;color:rgba(242,237,228,.3);max-width:500px;margin:1.5rem auto 3.5rem;line-height:1.7}
.palau-root .cta-btns{display:flex;gap:1.25rem;justify-content:center;flex-wrap:wrap}
.palau-root .btn-a{display:inline-flex;align-items:center;gap:.85rem;padding:1.1rem 2.75rem;background:var(--gold);color:var(--ink);font-family:'DM Sans',sans-serif;font-size:.65rem;font-weight:500;letter-spacing:.2em;text-transform:uppercase;text-decoration:none;border-radius:100px;position:relative;overflow:hidden;transition:transform .25s,box-shadow .25s}
.palau-root .btn-a::before{content:'';position:absolute;width:200%;height:200%;background:radial-gradient(circle,rgba(255,255,255,.2) 0%,transparent 60%);top:50%;left:50%;transform:translate(-50%,-50%) scale(0);transition:transform .5s ease;border-radius:inherit}
.palau-root .btn-a:hover::before{transform:translate(-50%,-50%) scale(1)}
.palau-root .btn-a:hover{transform:translateY(-3px);box-shadow:0 16px 40px rgba(201,168,76,.25)}
.palau-root .btn-b{display:inline-flex;align-items:center;gap:.85rem;padding:1.1rem 2.75rem;background:transparent;color:rgba(242,237,228,.5);border:1px solid rgba(242,237,228,.12);font-family:'DM Sans',sans-serif;font-size:.65rem;font-weight:400;letter-spacing:.2em;text-transform:uppercase;text-decoration:none;border-radius:100px;transition:border-color .25s,color .25s,transform .25s}
.palau-root .btn-b:hover{border-color:rgba(242,237,228,.35);color:rgba(242,237,228,.85);transform:translateY(-3px)}

.palau-root footer{background:var(--ink);padding:2.5rem 3.5rem;border-top:1px solid rgba(242,237,228,.05);display:flex;justify-content:space-between;align-items:center}
.palau-root .ft-brand{font-family:'DM Sans',sans-serif;font-size:.6rem;font-weight:500;letter-spacing:.25em;text-transform:uppercase;color:rgba(242,237,228,.25)}
.palau-root .ft-cr{font-size:.55rem;letter-spacing:.15em;color:rgba(242,237,228,.15)}

.palau-root .rv{opacity:0;transform:translateY(32px);transition:opacity .85s ease,transform .85s ease}
.palau-root .rv.in{opacity:1;transform:none}
.palau-root .rv.d1{transition-delay:.1s}.palau-root .rv.d2{transition-delay:.2s}.palau-root .rv.d3{transition-delay:.3s}

@media(max-width:1024px){
  .palau-root .clareza-inner,.palau-root .quebra-inner,.palau-root .s-strat{grid-template-columns:1fr}
  .palau-root .aplica-grid{grid-template-columns:1fr 1fr;grid-template-rows:auto}
  .palau-root .ag-card:nth-child(1){grid-column:1/3;grid-row:1}
  .palau-root .ag-card:nth-child(n+2){grid-column:auto;grid-row:auto}
  .palau-root .steps,.palau-root .valor-cols{grid-template-columns:1fr 1fr}
  .palau-root .limit-grid{grid-template-columns:1fr 1fr}
  .palau-root .lc:nth-child(1){grid-column:1/3;grid-row:1}
  .palau-root .lc:nth-child(4){grid-column:1/3}
  .palau-root nav{padding:1.5rem 2rem}
  .palau-root .hero-row{flex-direction:column;gap:1rem}
  .palau-root .hero-meta{text-align:left}
}
      `}</style>

      <div className="palau-root">
        <div ref={curDotRef} id="cur-dot" />
        <div ref={curRingRef} id="cur-ring" />
        <div ref={progRef} id="prog" />

        <nav>
          <a href="/" className="nav-brand">Lord Junnior</a>
          <span className="nav-year">2025</span>
        </nav>

        <section className="hero">
          <div className="hero-atm" />
          <div className="hero-photo" />
          <div className="hero-grain" />
          <div className="hero-content">
            <div className="hero-tag">Soberania Internacional · ID de Palau</div>
            <h1 className="hero-huge">ID de<br /><em>Palau</em></h1>
            <div className="hero-row">
              <p className="hero-sub">
                Uma identidade emitida por um governo soberano, fora da sua jurisdição principal. A ferramenta que poucos entendem — e menos ainda usam corretamente.
              </p>
              <div className="hero-meta">
                <div><span>Emitido por</span><strong>República de Palau</strong></div>
                <div><span>Processo</span><strong>100% Online</strong></div>
                <div><span>Camada</span><strong>Complementar</strong></div>
              </div>
            </div>
          </div>
          <div className="hero-scroll-hint">
            <span>scroll</span>
            <div className="scroll-bar" />
          </div>
        </section>

        <section className="s-clareza">
          <div className="clareza-inner">
            <div className="rv">
              <div className="cl-label">01 · Clareza</div>
              <h2 className="cl-title">O que<br /><em>não é</em><br />o que é</h2>
              <p className="cl-body">
                A maioria erra porque não entende o documento antes de obtê-lo. Clareza primeiro — estrutura depois. Esse é o único caminho para extrair valor real.
              </p>
            </div>
            <div className="cl-lists rv d1">
              <div className="cl-block">
                <div className="cl-block-head">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 3L11 11M11 3L3 11" stroke="#B04040" strokeWidth="1.5"/></svg>
                  <span className="cl-block-head-text neg">Não é</span>
                </div>
                <ul className="cl-list neg-list">
                  <li>Cidadania completa de Palau</li>
                  <li>Residência tradicional ou fiscal</li>
                  <li>Passaporte para viagens internacionais</li>
                  <li>Acesso universal a bancos e serviços</li>
                  <li>Solução isolada para estruturas financeiras</li>
                </ul>
              </div>
              <div className="cl-block">
                <div className="cl-block-head">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7L6 11L12 3" stroke="#C9A84C" strokeWidth="1.5"/></svg>
                  <span className="cl-block-head-text pos">É</span>
                </div>
                <ul className="cl-list pos-list">
                  <li>Identidade emitida por governo soberano reconhecido</li>
                  <li>Utilidade prática em verificação e onboarding internacional</li>
                  <li>Peça complementar de uma estrutura maior de soberania</li>
                  <li>Camada adicional com baixo custo de entrada</li>
                  <li>Ferramenta real dentro da estratégia correta</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="s-aplica">
          <div className="aplica-head">
            <div className="aplica-head-left rv">
              <div className="al-label">02 · Onde Funciona</div>
              <h2>Aplicação<br /><em>Prática</em></h2>
            </div>
            <div className="aplica-head-right rv d1">
              Nem toda utilidade é universal. O valor está em casos específicos — entender esses casos é o que diferencia o uso inteligente do ingênuo.
            </div>
          </div>
          <div className="aplica-grid">
            <div className="ag-card">
              <div className="ag-bg ag-bg-1" />
              <div className="ag-content">
                <div className="ag-cat">Mercado Cripto</div>
                <div className="ag-title">Exchanges<br />Internacionais</div>
                <div className="ag-cols">
                  <ul className="ag-items"><li><span>Coinbase</span></li><li><span>Bitget</span></li><li><span>Gate.io</span></li></ul>
                  <ul className="ag-items"><li><span>KuCoin</span></li><li><span>CEX.IO</span></li><li><span>MEXC</span></li></ul>
                </div>
                <div className="ag-note">Sujeito a mudanças de compliance. Verificar política atual.</div>
              </div>
            </div>
            <div className="ag-card">
              <div className="ag-bg ag-bg-2" />
              <div className="ag-content">
                <div className="ag-cat">Serviços</div>
                <div className="ag-title">Neobanks &amp; Fintechs</div>
                <ul className="ag-items">
                  <li><span>Kingdom Bank</span></li><li><span>Vexel</span></li><li><span>Ultimopay</span></li><li><span>Blackcatcard</span></li>
                </ul>
              </div>
            </div>
            <div className="ag-card">
              <div className="ag-bg ag-bg-3" />
              <div className="ag-content">
                <div className="ag-cat">Operacional</div>
                <div className="ag-title">Camada Internacional</div>
                <ul className="ag-items"><li><span>Onboarding</span></li><li><span>Redundância documental</span></li></ul>
              </div>
            </div>
            <div className="ag-card">
              <div className="ag-bg ag-bg-4" />
              <div className="ag-content">
                <div className="ag-cat">Estratégico</div>
                <div className="ag-title">Patrimônio Global</div>
                <ul className="ag-items"><li><span>Estruturas patrimoniais</span></li><li><span>Mobilidade</span></li></ul>
              </div>
            </div>
            <div className="ag-card">
              <div className="ag-bg ag-bg-5" />
              <div className="ag-content">
                <div className="ag-cat">Privacidade</div>
                <div className="ag-title">Jurisdição Paralela</div>
                <ul className="ag-items"><li><span>Menor exposição</span></li><li><span>Soberania pessoal</span></li></ul>
              </div>
            </div>
          </div>
        </section>

        <section className="s-quebra">
          <div className="quebra-pct">99%</div>
          <div className="quebra-inner">
            <div className="rv">
              <div className="qb-label">03 · Quebra de Crença</div>
              <h2 className="qb-title">O erro<br /><em>que</em><br />quase todos cometem</h2>
              <p className="qb-text">
                Comprar o ID e imaginar que ele sozinho resolve tudo. É o erro de quem comprou uma peça e achou que tinha o tabuleiro completo.
              </p>
            </div>
            <ul className="qb-list rv d1">
              <li><div className="qb-item"><strong>Comprovante de endereço</strong><p>Muitas plataformas exigem comprovante de residência válido, independente do documento de identidade.</p></div></li>
              <li><div className="qb-item"><strong>Número de telefone local</strong><p>Em alguns casos, as plataformas exigem verificação por número local da jurisdição declarada.</p></div></li>
              <li><div className="qb-item"><strong>Documentação complementar</strong><p>O ID de Palau raramente opera sozinho — ele precisa de documentos de suporte para ativação completa.</p></div></li>
              <li><div className="qb-item"><strong>Alinhamento identidade × residência</strong><p>O report fiscal depende da residência informada e da política da instituição, não apenas do documento.</p></div></li>
              <li><div className="qb-item"><strong>Estratégia estruturada</strong><p>Sem uma arquitetura de soberania clara, o documento é uma ferramenta sem contexto — inútil na prática.</p></div></li>
            </ul>
          </div>
        </section>

        <section className="s-limit">
          <div className="limit-head">
            <h2 className="lt-title rv">Onde não<br /><span>resolve o problema.</span></h2>
            <p className="lt-note rv d1">Clareza antes de qualquer decisão. Um documento útil não é um documento total.</p>
          </div>
          <div className="limit-grid">
            <div className="lc">
              <div className="lc-badge">Não aceito</div>
              <h3 className="lc-title">Bancos Tradicionais &amp; Instituições Clássicas</h3>
              <p className="lc-text">A maioria dos bancos tradicionais não aceita apenas um ID local. Passaporte e comprovante de residência robusto continuam sendo os documentos padrão. Esta é a limitação mais importante do documento.</p>
            </div>
            <div className="lc">
              <div className="lc-badge">Insuficiente</div>
              <h3 className="lc-title">Comprovação de Residência</h3>
              <p className="lc-text">O ID de Palau não substitui comprovante de endereço. Muitas instituições exigem evidência de residência física — contas, contratos, extratos locais.</p>
            </div>
            <div className="lc">
              <div className="lc-badge">Não aplicável</div>
              <h3 className="lc-title">Substituição de Passaporte</h3>
              <p className="lc-text">Este não é um passaporte. Não permite viagens internacionais nem substitui o documento principal nacional para propósitos legais.</p>
            </div>
            <div className="lc">
              <div className="lc-badge">Limitado</div>
              <h3 className="lc-title">Planejamento Fiscal &amp; Solução Total</h3>
              <p className="lc-text">Report fiscal depende da residência declarada, não apenas do documento. Sem uma estrutura completa, o ID de Palau é uma ferramenta sem contexto.</p>
            </div>
          </div>
        </section>

        <section className="s-valor">
          <div className="valor-quote rv">
            <p className="valor-quote-text">
              Sozinho, ele é limitado. <em>Dentro de uma arquitetura maior, ele muda de patamar.</em>
            </p>
            <div className="valor-source">05 · Por que ainda importa</div>
          </div>
          <div className="valor-cols">
            <div className="vc rv"><span className="vc-sym">◈</span><div className="vc-title">Privacidade Operacional</div><p className="vc-text">Menor exposição direta da jurisdição de origem em contextos operacionais e de verificação internacional.</p></div>
            <div className="vc rv d1"><span className="vc-sym">◉</span><div className="vc-title">Acesso Internacional</div><p className="vc-text">Possível utilidade em plataformas globais, sujeito a critérios de compliance de cada serviço.</p></div>
            <div className="vc rv d2"><span className="vc-sym">◇</span><div className="vc-title">Baixo Custo de Entrada</div><p className="vc-text">Opção acessível em comparação com passaportes adicionais ou residências formais em outros países.</p></div>
            <div className="vc rv d3"><span className="vc-sym">◎</span><div className="vc-title">Processo Online</div><p className="vc-text">Solicitação digital com emissão e envio físico para qualquer lugar do mundo.</p></div>
          </div>
        </section>

        <section className="s-exec">
          <div className="exec-bg" />
          <div className="exec-content">
            <div className="ex-label rv">06 · Como Obter</div>
            <h2 className="ex-title rv d1">Como obter<br />o ID de Palau</h2>
            <div className="steps">
              <div className="step active"><div className="step-n">01</div><div className="step-title">Solicitação</div><p className="step-desc">Inicie pela plataforma responsável pela emissão</p></div>
              <div className="step"><div className="step-n">02</div><div className="step-title">Verificação</div><p className="step-desc">Processo de validação de identidade exigido pelo governo</p></div>
              <div className="step"><div className="step-n">03</div><div className="step-title">Emissão</div><p className="step-desc">Aprovação e emissão oficial pelo Estado soberano</p></div>
              <div className="step"><div className="step-n">04</div><div className="step-title">Entrega</div><p className="step-desc">Cartão físico enviado para onde você estiver no mundo</p></div>
              <div className="step"><div className="step-n">05</div><div className="step-title">Configuração</div><p className="step-desc">Avalie documentação complementar para sua estrutura específica</p></div>
            </div>
          </div>
        </section>

        <section className="s-strat">
          <div className="strat-visual">
            <div className="strat-vis-bg" />
            <div className="rings">
              <div className="ring" />
              <div className="ring" />
              <div className="ring" />
              <div className="ring-center">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 2L4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z" stroke="#0D0C0A" strokeWidth="1.5"/></svg>
                <span>Palau</span>
              </div>
            </div>
          </div>
          <div className="strat-content">
            <div className="st-label rv">07 · Visão Estratégica</div>
            <h2 className="st-title rv d1">Uma camada<br />que cresce</h2>
            <p className="st-sub rv d2">O potencial do ID aumenta quando inserido em uma estratégia mais ampla de soberania pessoal.</p>
            <ul className="st-specs rv d3">
              <li><span className="sp-key">Tipo</span><span className="sp-val">Identidade soberana internacional</span></li>
              <li><span className="sp-key">Emissão</span><span className="sp-val">República de Palau</span></li>
              <li><span className="sp-key">Formato</span><span className="sp-val">Cartão físico + digital</span></li>
              <li><span className="sp-key">Processo</span><span className="sp-val">100% online</span></li>
              <li><span className="sp-key">Potencial isolado</span><span className="sp-val">Limitado</span></li>
              <li><span className="sp-key">Potencial em estrutura</span><span className="sp-val g">Alto</span></li>
            </ul>
          </div>
        </section>

        <section className="s-faq">
          <div className="faq-inner">
            <div className="faq-label">08 · Perguntas Frequentes</div>
            <h2 className="faq-title">As dúvidas<br /><em>mais importantes</em></h2>
            {[
              ["O ID de Palau é cidadania?", "Não. É uma identidade digital emitida pelo governo, não uma cidadania. Cidadania envolve direitos legais extensos, passaporte e proteção consular — nada disso está incluído."],
              ["O ID de Palau é residência?", "Não. Não configura residência legal, não muda sua situação fiscal e não substitui visto ou permissão de residência em qualquer jurisdição."],
              ["Posso usar o ID de Palau em exchanges?", "Em algumas sim — Coinbase, Bitget, Gate.io, KuCoin, CEX.IO e MEXC são exemplos. Mas as políticas de compliance mudam. Sempre verifique a política atual antes de depender disso."],
              ["Posso abrir conta em qualquer banco?", "Não. Bancos tradicionais exigem passaporte e comprovante de residência robusto. O ID de Palau pode funcionar em neobanks e fintechs específicas, não em instituições bancárias convencionais."],
              ["Preciso de comprovante de endereço?", "Na maioria dos casos, sim. O ID de Palau raramente opera como documento único — ele faz parte de um conjunto de documentação."],
              ["O ID de Palau substitui passaporte?", "Não. Não pode ser usado para viagens internacionais. Seu passaporte nacional continua sendo o documento principal para viagem e propósitos legais."],
              ["Resolve minha vida financeira internacional?", "Não. É uma ferramenta dentro de uma estrutura maior. Sozinho tem utilidade limitada. Dentro de uma arquitetura de soberania pessoal bem construída, ele contribui significativamente."],
              ["O ID de Palau é legal?", "Sim. É emitido por um governo soberano reconhecido internacionalmente. O que varia é a aceitação de cada plataforma — uma decisão privada de compliance, não de legalidade do documento."],
              ["Vale a pena fazer o ID de Palau?", "Depende do seu objetivo. Se você entende onde ele funciona, tem documentação complementar e insere ele em uma estratégia maior — pode valer muito. Se você espera que resolva tudo sozinho — não vale. A decisão inteligente começa com clareza."],
            ].map(([q, a], i) => (
              <details key={i}>
                <summary>
                  <span className="faq-q">{q}</span>
                  <span className="faq-ico">
                    <svg viewBox="0 0 9 9"><path d="M4.5 0v9M0 4.5h9"/></svg>
                  </span>
                </summary>
                <p className="faq-a">{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="s-cta">
          <div className="cta-noise" />
          <div className="cta-glow" />
          <div className="cta-inner">
            <div className="cta-eyebrow">09 · Decisão Consciente</div>
            <h2 className="cta-big">Clareza<br /><span>primeiro.</span></h2>
            <p className="cta-sub">O valor do ID de Palau não está no hype. Está no uso correto. Quando você entende o que ele é, a decisão fica inteligente.</p>
            <div className="cta-btns">
              <a href="/teoria-das-bandeiras" className="btn-a">Ver a estratégia completa →</a>
              <a href="#" className="btn-b">Como obter o ID</a>
            </div>
          </div>
        </section>

        <footer>
          <span className="ft-brand">Lord Junnior · Soberania Internacional</span>
          <span className="ft-cr">© 2026 · lordjunnior.com.br</span>
        </footer>
      </div>
    </>
  );
};

export default PalauDigitalResidency;
