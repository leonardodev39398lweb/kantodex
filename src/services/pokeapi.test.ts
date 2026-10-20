import { afterEach, describe, expect, it, vi } from 'vitest';
import { getPokemon } from './pokeapi';

describe('getPokemon', () => {
  afterEach(() => vi.restoreAllMocks());

  it('converts API data and caches repeated requests', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) => {
      const url = String(input);
      const body = url.includes('/pokemon/1')
        ? { id: 1, name: 'bulbasaur', species: { url: 'species/1' }, sprites: { other: { 'official-artwork': { front_default: 'image.png' } }, front_default: 'sprite.png' }, types: [{ type: { name: 'grass' } }], height: 7, weight: 69, base_experience: 64, stats: [{ stat: { name: 'hp' }, base_stat: 45 }], abilities: [{ ability: { name: 'overgrow' } }] }
        : { names: [{ language: { name: 'pt' }, name: 'Bulbasaur' }] };
      return new Response(JSON.stringify(body), { status: 200, headers: { 'Content-Type': 'application/json' } });
    });

    const [first, second] = await Promise.all([getPokemon(1), getPokemon(1)]);
    expect(first).toEqual(second);
    expect(first.displayName).toBe('Bulbasaur');
    expect(first.types).toEqual(['grass']);
    expect(first.stats.hp).toBe(45);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
