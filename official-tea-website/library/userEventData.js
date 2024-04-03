
export const userEventData = (player, startDate, endDate) => {
  fetch(`https://api.wiseoldman.net/v2/players/${player.player.username}/gained?startDate=${startDate}&endDate=${endDate}`)
    .then(response => response.json())
    .then(data => data)
}