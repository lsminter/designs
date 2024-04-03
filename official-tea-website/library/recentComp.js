export const recentCompetition = await fetch(`https://api.wiseoldman.net/v2/groups/651/competitions`)
  .then(response => response.json())
  .then(data => data[0])

export const allCompetitions = await fetch(`https://api.wiseoldman.net/v2/groups/651/competitions`)
  .then(response => response.json())
  .then(data => data)