export const recentAchievements =
    await fetch(`https://api.wiseoldman.net/v2/groups/651/achievements`)
      .then(response => response.json())
      .then(data => data)