export type ServerData = {
  Name: string
  Map: string
  MapSize: string
  Gamemode: string
  Region: string
  Players: number
  QueuePlayers: number
  MaxPlayers: number
  Hz: number
  DayNight: string
  IsOfficial: boolean
  HasPassword: boolean
  AntiCheat: string
  Build: string
}

async function getServerData(): Promise<ServerData[]> {
  const response = await fetch('https://publicapi.battlebit.cloud/Servers/GetServerList')

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data: ServerData[] = await response.json()
  return data
}

export { getServerData }
