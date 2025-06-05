import { SavedWiFiNetwork, ScannedWiFiNetworkItem } from "@bluedotrobots/common-ts"

export interface CategorizedNetworks {
    knownNetworks: ScannedWiFiNetworkItem[]
    otherNetworks: ScannedWiFiNetworkItem[]
    previouslyConnected: SavedWiFiNetwork[]
}

export const categorizeNetworks = (
	scannedNetworks: ScannedWiFiNetworkItem[],
	savedNetworks: SavedWiFiNetwork[]
): CategorizedNetworks => {
	const savedSSIDs = new Set(savedNetworks.map(network => network.ssid))
	const scannedSSIDs = new Set(scannedNetworks.map(network => network.ssid))

	const knownNetworks = scannedNetworks.filter(network => savedSSIDs.has(network.ssid))
	const otherNetworks = scannedNetworks.filter(network => !savedSSIDs.has(network.ssid))
	const previouslyConnected = savedNetworks.filter(network => !scannedSSIDs.has(network.ssid))

	return {
		knownNetworks,
		otherNetworks,
		previouslyConnected
	}
}
