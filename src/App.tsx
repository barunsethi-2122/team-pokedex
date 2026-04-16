import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CardGrid } from './components/CardGrid/CardGrid';
import { Modal } from './components/Modal/Modal';
import { CardDetail } from './components/CardDetail/CardDetail';
import { findBySlug, team } from './data/loadTeam';

function getSlugFromUrl(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get('member');
}

function setSlugInUrl(slug: string | null) {
  const url = new URL(window.location.href);
  if (slug) {
    url.searchParams.set('member', slug);
  } else {
    url.searchParams.delete('member');
  }
  window.history.replaceState({}, '', url.toString());
}

export default function App() {
  const [activeSlug, setActiveSlug] = useState<string | null>(() =>
    getSlugFromUrl(),
  );

  const activeMember = findBySlug(activeSlug);

  useEffect(() => {
    setSlugInUrl(activeMember ? activeMember.slug : null);
  }, [activeMember]);

  useEffect(() => {
    const onPop = () => setActiveSlug(getSlugFromUrl());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const handleOpen = useCallback((slug: string) => {
    setActiveSlug(slug);
  }, []);

  const handleClose = useCallback(() => {
    setActiveSlug(null);
  }, []);

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Team Pokédex</h1>
        <p>
          Meet the crew — tap any card to flip open their full profile. Hover to
          see the foil shimmer.
        </p>
      </header>

      <CardGrid members={team} onOpen={handleOpen} />

      <AnimatePresence>
        {activeMember && (
          <Modal key={activeMember.slug} onClose={handleClose}>
            <CardDetail member={activeMember} />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
