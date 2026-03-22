import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, MapPin, Quote, ExternalLink, CheckCircle } from 'lucide-react';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

interface TestimonialData {
  name: string;
  username?: string;
  location?: string;
  platform: 'instagram' | 'direct' | 'email';
  text: string;
  badge: string;
  avatar?: string;
  postId?: string;
  delay?: number;
}

/* ── Fallback: iniciais coloridas ── */
const FALLBACK_COLORS = [
  'from-amber-500 to-orange-600',
  'from-emerald-500 to-teal-600',
  'from-sky-500 to-blue-600',
  'from-violet-500 to-purple-600',
  'from-rose-500 to-pink-600',
  'from-cyan-500 to-teal-500',
  'from-fuchsia-500 to-purple-500',
  'from-teal-400 to-emerald-600',
];

function InitialsAvatar({ name, idx }: { name: string; idx: number }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const color = FALLBACK_COLORS[idx % FALLBACK_COLORS.length];
  return (
    <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${color} flex items-center justify-center shrink-0 shadow-lg`}>
      <span className="text-white font-bold text-sm tracking-tight">{initials}</span>
    </div>
  );
}

interface Props {
  testimonial: TestimonialData;
  index: number;
  accentColor?: 'amber' | 'emerald';
}

export default function RealTestimonial({ testimonial: t, index, accentColor = 'amber' }: Props) {
  const isAmber = accentColor === 'amber';
  const borderHover = isAmber ? 'hover:border-amber-500/25' : 'hover:border-emerald-500/25';
  const bgHover = isAmber ? 'hover:bg-amber-500/[0.06]' : 'hover:border-emerald-500/[0.06]';
  const badgeBg = isAmber ? 'bg-amber-500/10 border-amber-500/15' : 'bg-emerald-500/10 border-emerald-500/15';
  const badgeText = isAmber ? 'text-amber-400' : 'text-emerald-400';
  const quoteColor = isAmber ? 'text-amber-500/20' : 'text-emerald-500/20';
  const verifiedColor = isAmber ? 'text-amber-500/60' : 'text-emerald-500/60';

  const instagramUrl = t.postId
    ? `https://www.instagram.com/p/${t.postId}/`
    : t.username
    ? `https://www.instagram.com/${t.username}/`
    : undefined;

  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, ease: APPLE_EASE, delay: (t.delay ?? index * 0.06) }}
      className={`relative rounded-2xl border border-stone-800/50 bg-stone-900/20 ${bgHover} ${borderHover} transition-all duration-500 flex flex-col overflow-hidden group`}
    >
      {/* Glow sutil no hover */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none ${isAmber ? 'bg-amber-500/[0.02]' : 'bg-emerald-500/[0.02]'}`} />

      <div className="relative p-5 flex flex-col flex-1">
        {/* Header: Identidade */}
        <div className="flex items-center gap-3 mb-4">
          {t.avatar ? (
            <img
              src={t.avatar}
              alt={`Depoimento de ${t.name}`}
              title={`Depoimento verificado de ${t.name}`}
              className="w-11 h-11 rounded-full object-cover shrink-0 shadow-lg ring-2 ring-stone-800"
              loading="lazy"
            />
          ) : (
            <InitialsAvatar name={t.name} idx={index} />
          )}

          <div className="min-w-0 flex-1">
            <figcaption className="text-stone-200 font-bold text-sm truncate flex items-center gap-1.5">
              {t.name}
              {t.platform === 'instagram' && (
                <CheckCircle size={12} className={verifiedColor} />
              )}
            </figcaption>
            <div className="flex items-center gap-2">
              {t.username && (
                <span className="text-stone-600 text-[10px]">@{t.username}</span>
              )}
              {t.location && (
                <span className="flex items-center gap-0.5 text-stone-600 text-[10px]">
                  <MapPin size={8} />
                  {t.location}
                </span>
              )}
            </div>
          </div>

          {t.platform === 'instagram' && (
            <Instagram size={16} className="text-stone-600 shrink-0" />
          )}
        </div>

        {/* Badge */}
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${badgeBg} mb-3 self-start`}>
          <span className={`${badgeText} text-[10px] font-bold uppercase tracking-wider`}>{t.badge}</span>
        </div>

        {/* Quote */}
        <Quote size={14} className={`${quoteColor} mb-2 shrink-0`} />
        <blockquote className="text-stone-300 text-sm leading-relaxed flex-1">
          "{t.text}"
        </blockquote>

        {/* Verification link */}
        {instagramUrl && (
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-4 pt-3 border-t border-stone-800/40 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider ${isAmber ? 'text-amber-500/40 hover:text-amber-400' : 'text-emerald-500/40 hover:text-emerald-400'} transition-colors`}
            title={`Verificar comentário original de ${t.username || t.name}`}
          >
            <ExternalLink size={10} />
            Verificar no Instagram
          </a>
        )}
      </div>
    </motion.figure>
  );
}
