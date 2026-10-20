export type PokemonType = string;
export interface Pokemon { id: number; name: string; displayName: string; image: string; types: PokemonType[]; height: number; weight: number; experience: number; stats: Record<string, number>; abilities: string[] }
export const TYPE_PT: Record<string,string> = { normal:'Normal', fire:'Fogo', water:'Água', electric:'Elétrico', grass:'Planta', ice:'Gelo', fighting:'Lutador', poison:'Veneno', ground:'Terra', flying:'Voador', psychic:'Psíquico', bug:'Inseto', rock:'Pedra', ghost:'Fantasma', dragon:'Dragão', steel:'Aço', dark:'Sombrio', fairy:'Fada' };
export const STAT_PT: Record<string,string> = { hp:'HP', attack:'Ataque', defense:'Defesa', 'special-attack':'Atq. especial', 'special-defense':'Def. especial', speed:'Velocidade' };
