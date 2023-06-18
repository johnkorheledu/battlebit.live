export type PlayerCountData = {
  playerCount: number
  result: number
}

async function getPlayerCountData(): Promise<PlayerCountData> {
  const response = await fetch(
    'https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1?appId=671860',
  )

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data: { response: PlayerCountData } = await response.json()
  return data.response
}

export { getPlayerCountData }
