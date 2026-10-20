import type { Pokemon } from '../types';
const API = 'https://pokeapi.co/api/v2';
const cache = new Map<number, Pokemon>();
const pending = new Map<number, Promise<Pokemon>>();
const ptNames = new Map<string,string>();
async function json(url: string) { const res = await fetch(url); if (!res.ok) throw new Error(`PokéAPI respondeu ${res.status}`); return res.json(); }
export async function getPokemon(id: number): Promise<Pokemon> {
  if (cache.has(id)) return cache.get(id)!;
  if (pending.has(id)) return pending.get(id)!;
  const task = (async () => {
    const p = await json(`${API}/pokemon/${id}`);
    let displayName = ptNames.get(p.name) ?? p.name;
    try { const species = await json(p.species.url); const localized = species.names?.find((n: any) => n.language.name === 'pt'); if (localized) { displayName = localized.name; ptNames.set(p.name, displayName); } } catch { /* English name remains available */ }
    const stats: Record<string,number> = Object.fromEntries(p.stats.map((s: any) => [s.stat.name, s.base_stat]));
    const value: Pokemon = { id, name: p.name, displayName, image: p.sprites.other?.['official-artwork']?.front_default ?? p.sprites.front_default ?? '', types: p.types.map((t: any) => t.type.name), height: p.height, weight: p.weight, experience: p.base_experience ?? 0, stats, abilities: p.abilities.map((a: any) => a.ability.name.replaceAll('-', ' ')) };
    cache.set(id, value); return value;
  })().finally(() => pending.delete(id));
  pending.set(id, task); return task;
}
export async function getKantoPokemon(): Promise<Pokemon[]> {
  const output: Pokemon[] = [];
  for (let start = 1; start <= 151; start += 15) {
    const batch = Array.from({ length: Math.min(15, 152 - start) }, (_, i) => start + i);
    output.push(...await Promise.all(batch.map(getPokemon)));
  }
  return output.sort((a,b) => a.id-b.id);
}
