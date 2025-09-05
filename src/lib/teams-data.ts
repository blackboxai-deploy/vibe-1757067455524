import { TeamSuggestion } from '@/types/prediction';

export const POPULAR_TEAMS: TeamSuggestion[] = [
  // Premier League (England)
  { name: 'Manchester City', league: 'Premier League', country: 'England' },
  { name: 'Arsenal', league: 'Premier League', country: 'England' },
  { name: 'Liverpool', league: 'Premier League', country: 'England' },
  { name: 'Chelsea', league: 'Premier League', country: 'England' },
  { name: 'Manchester United', league: 'Premier League', country: 'England' },
  { name: 'Tottenham Hotspur', league: 'Premier League', country: 'England' },
  { name: 'Newcastle United', league: 'Premier League', country: 'England' },
  { name: 'Brighton', league: 'Premier League', country: 'England' },
  { name: 'Aston Villa', league: 'Premier League', country: 'England' },
  { name: 'West Ham United', league: 'Premier League', country: 'England' },

  // La Liga (Spain)
  { name: 'Real Madrid', league: 'La Liga', country: 'Spain' },
  { name: 'Barcelona', league: 'La Liga', country: 'Spain' },
  { name: 'Atletico Madrid', league: 'La Liga', country: 'Spain' },
  { name: 'Sevilla', league: 'La Liga', country: 'Spain' },
  { name: 'Real Sociedad', league: 'La Liga', country: 'Spain' },
  { name: 'Villarreal', league: 'La Liga', country: 'Spain' },
  { name: 'Real Betis', league: 'La Liga', country: 'Spain' },
  { name: 'Valencia', league: 'La Liga', country: 'Spain' },

  // Serie A (Italy)
  { name: 'Inter Milan', league: 'Serie A', country: 'Italy' },
  { name: 'Juventus', league: 'Serie A', country: 'Italy' },
  { name: 'AC Milan', league: 'Serie A', country: 'Italy' },
  { name: 'Napoli', league: 'Serie A', country: 'Italy' },
  { name: 'AS Roma', league: 'Serie A', country: 'Italy' },
  { name: 'Lazio', league: 'Serie A', country: 'Italy' },
  { name: 'Atalanta', league: 'Serie A', country: 'Italy' },

  // Bundesliga (Germany)
  { name: 'Bayern Munich', league: 'Bundesliga', country: 'Germany' },
  { name: 'Borussia Dortmund', league: 'Bundesliga', country: 'Germany' },
  { name: 'RB Leipzig', league: 'Bundesliga', country: 'Germany' },
  { name: 'Bayer Leverkusen', league: 'Bundesliga', country: 'Germany' },
  { name: 'Eintracht Frankfurt', league: 'Bundesliga', country: 'Germany' },
  { name: 'Borussia Mönchengladbach', league: 'Bundesliga', country: 'Germany' },

  // Ligue 1 (France)
  { name: 'Paris Saint-Germain', league: 'Ligue 1', country: 'France' },
  { name: 'AS Monaco', league: 'Ligue 1', country: 'France' },
  { name: 'Olympique Marseille', league: 'Ligue 1', country: 'France' },
  { name: 'Lyon', league: 'Ligue 1', country: 'France' },
  { name: 'Lille', league: 'Ligue 1', country: 'France' },

  // Other Major Leagues
  { name: 'Ajax', league: 'Eredivisie', country: 'Netherlands' },
  { name: 'PSV Eindhoven', league: 'Eredivisie', country: 'Netherlands' },
  { name: 'Benfica', league: 'Primeira Liga', country: 'Portugal' },
  { name: 'Porto', league: 'Primeira Liga', country: 'Portugal' },
  { name: 'Sporting CP', league: 'Primeira Liga', country: 'Portugal' },

  // MLS (USA)
  { name: 'Los Angeles FC', league: 'MLS', country: 'USA' },
  { name: 'Inter Miami', league: 'MLS', country: 'USA' },
  { name: 'New York City FC', league: 'MLS', country: 'USA' },
  { name: 'Atlanta United', league: 'MLS', country: 'USA' },
  { name: 'Seattle Sounders', league: 'MLS', country: 'USA' },

  // International Teams
  { name: 'Brazil', league: 'International', country: 'Brazil' },
  { name: 'Argentina', league: 'International', country: 'Argentina' },
  { name: 'France', league: 'International', country: 'France' },
  { name: 'England', league: 'International', country: 'England' },
  { name: 'Spain', league: 'International', country: 'Spain' },
  { name: 'Germany', league: 'International', country: 'Germany' },
  { name: 'Italy', league: 'International', country: 'Italy' },
  { name: 'Netherlands', league: 'International', country: 'Netherlands' },
  { name: 'Portugal', league: 'International', country: 'Portugal' },
];

export function searchTeams(query: string): TeamSuggestion[] {
  if (!query.trim()) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return POPULAR_TEAMS.filter(team =>
    team.name.toLowerCase().includes(normalizedQuery) ||
    team.league?.toLowerCase().includes(normalizedQuery) ||
    team.country?.toLowerCase().includes(normalizedQuery)
  ).slice(0, 8); // Limit to 8 suggestions
}

export function getRandomTeamPair(): { home: TeamSuggestion; away: TeamSuggestion } {
  const shuffled = [...POPULAR_TEAMS].sort(() => Math.random() - 0.5);
  return {
    home: shuffled[0],
    away: shuffled[1]
  };
}