import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'codigo-autonomia';

export type SimboloId = 'folha' | 'chama' | 'semente' | 'escudo' | 'raiz';

export interface SimboloInfo {
  id: SimboloId;
  nome: string;
  descricao: string;
}

export const SIMBOLOS: SimboloInfo[] = [
  { id: 'folha', nome: 'Folha', descricao: 'Resiliência natural' },
  { id: 'chama', nome: 'Chama', descricao: 'Clareza monetária' },
  { id: 'semente', nome: 'Semente', descricao: 'Soberania técnica' },
  { id: 'escudo', nome: 'Escudo', descricao: 'Cosmovisão livre' },
  { id: 'raiz', nome: 'Raiz', descricao: 'Fundamento inabalável' },
];

function getFound(): SimboloId[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useCodigoAutonomia() {
  const [found, setFound] = useState<SimboloId[]>(getFound);
  const [justFound, setJustFound] = useState<SimboloId | null>(null);
  const [showUnlock, setShowUnlock] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
  }, [found]);

  const discover = useCallback((id: SimboloId) => {
    setFound(prev => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      setJustFound(id);
      if (next.length === SIMBOLOS.length) {
        setTimeout(() => setShowUnlock(true), 1800);
      }
      return next;
    });
  }, []);

  const isFound = useCallback((id: SimboloId) => found.includes(id), [found]);

  const dismissJustFound = useCallback(() => setJustFound(null), []);
  const dismissUnlock = useCallback(() => setShowUnlock(false), []);

  return {
    found,
    total: SIMBOLOS.length,
    discover,
    isFound,
    justFound,
    dismissJustFound,
    showUnlock,
    dismissUnlock,
  };
}
