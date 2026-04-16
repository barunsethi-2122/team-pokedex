import type { TeamMember } from '../types/team';

const modules = import.meta.glob<TeamMember>('./team/*.json', {
  eager: true,
  import: 'default',
});

export const team: TeamMember[] = Object.values(modules).sort((a, b) =>
  a.name.localeCompare(b.name),
);

export function findBySlug(slug: string | null): TeamMember | undefined {
  if (!slug) return undefined;
  return team.find((m) => m.slug === slug);
}
