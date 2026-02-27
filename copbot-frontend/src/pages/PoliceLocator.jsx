import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Phone, Navigation, AlertCircle, Loader2, Shield } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's default icon paths (Vite build issue)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom teal icon for user location
const userIcon = new L.DivIcon({
    html: `<div style="
        width: 20px; height: 20px; 
        background: #0D9488; 
        border: 3px solid white; 
        border-radius: 50%; 
        box-shadow: 0 0 10px rgba(13,148,136,0.5), 0 0 30px rgba(13,148,136,0.2);
    "></div>`,
    className: '',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
});

// Custom red icon for police stations
const stationIcon = new L.DivIcon({
    html: `<div style="
        width: 32px; height: 32px; 
        background: #DC2626; 
        border: 3px solid white; 
        border-radius: 50% 50% 50% 0; 
        transform: rotate(-45deg);
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        display: flex; align-items: center; justify-content: center;
    "><div style="
        width: 10px; height: 10px;
        background: white;
        border-radius: 50%;
        transform: rotate(45deg);
    "></div></div>`,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

// Component to fly to a location on the map
function FlyToLocation({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.flyTo(center, zoom || 14, { duration: 1.2 });
        }
    }, [center, zoom, map]);
    return null;
}

// Haversine distance calculation
function getDistance(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Default center (Chennai)
const DEFAULT_CENTER = [13.0827, 80.2707];

export default function PoliceLocator() {
    const [searchQuery, setSearchQuery] = useState('');
    const [userLocation, setUserLocation] = useState(null);
    const [stations, setStations] = useState([]);
    const [mapLoading, setMapLoading] = useState(true);
    const [locationError, setLocationError] = useState('');
    const [selectedStation, setSelectedStation] = useState(null);
    const [flyTarget, setFlyTarget] = useState(null);

    // Get user's real-time location on mount
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const loc = [position.coords.latitude, position.coords.longitude];
                    setUserLocation(loc);
                    setMapLoading(false);
                    fetchNearbyStations(loc[0], loc[1]);
                },
                (error) => {
                    console.warn('Geolocation failed:', error.message);
                    setLocationError('Location access denied. Showing default area.');
                    setUserLocation(DEFAULT_CENTER);
                    setMapLoading(false);
                    fetchNearbyStations(DEFAULT_CENTER[0], DEFAULT_CENTER[1]);
                },
                { enableHighAccuracy: true, timeout: 10000 }
            );
        } else {
            setLocationError('Geolocation not supported.');
            setUserLocation(DEFAULT_CENTER);
            setMapLoading(false);
            fetchNearbyStations(DEFAULT_CENTER[0], DEFAULT_CENTER[1]);
        }
    }, []);

    // Fetch nearby police stations using Overpass API (free, no key needed)
    const fetchNearbyStations = async (lat, lng) => {
        const radius = 5000; // 5km
        const query = `
            [out:json][timeout:10];
            (
                node["amenity"="police"](around:${radius},${lat},${lng});
                way["amenity"="police"](around:${radius},${lat},${lng});
            );
            out center body;
        `;

        try {
            const response = await fetch('https://overpass-api.de/api/interpreter', {
                method: 'POST',
                body: `data=${encodeURIComponent(query)}`
            });
            const data = await response.json();

            const results = data.elements
                .map(el => ({
                    id: el.id,
                    name: el.tags?.name || 'Police Station',
                    address: el.tags?.['addr:street'] || el.tags?.['addr:full'] || 'Address not available',
                    phone: el.tags?.phone || el.tags?.['contact:phone'] || null,
                    lat: el.lat || el.center?.lat,
                    lng: el.lon || el.center?.lon,
                    type: el.tags?.['police:type'] || el.tags?.description || 'Police',
                }))
                .filter(s => s.lat && s.lng)
                .sort((a, b) =>
                    getDistance(lat, lng, a.lat, a.lng) - getDistance(lat, lng, b.lat, b.lng)
                );

            setStations(results);
        } catch (err) {
            console.error('Overpass API failed:', err);
            setStations([]);
        }
    };

    // Filter stations by search query
    const filteredStations = stations.filter(s =>
        s.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.address?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Loading skeleton for the left pane
    const ListSkeleton = () => (
        <div className="space-y-3 animate-pulse">
            {[1, 2, 3].map(i => (
                <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5">
                    <div className="h-5 bg-slate-200 rounded w-3/4 mb-3" />
                    <div className="h-4 bg-slate-100 rounded w-1/2 mb-2" />
                    <div className="h-4 bg-slate-100 rounded w-1/3 mb-3" />
                    <div className="h-10 bg-slate-100 rounded-xl w-full" />
                </div>
            ))}
        </div>
    );

    return (
        <div className="flex-1 w-full flex flex-col h-[calc(100vh-100px)] gap-6">

            {/* Header Area */}
            <div className="shrink-0 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Police Locator</h1>
                    <p className="text-slate-500 font-medium">Find and navigate to your nearest jurisdiction</p>
                </div>
            </div>

            {/* Split Pane Container */}
            <div className="flex flex-col lg:flex-row gap-6 flex-1 overflow-hidden">

                {/* Left Pane - List Directory (30%) */}
                <div className="w-full lg:w-1/3 flex flex-col gap-4 h-full">

                    {/* Search Bar */}
                    <div className="relative shrink-0 w-full bg-white rounded-2xl shadow-sm border border-slate-200">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <Search className="w-5 h-5 text-teal-600" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by PIN code or Area..."
                            className="w-full bg-transparent py-4 pl-12 pr-4 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium rounded-2xl"
                        />
                    </div>

                    {/* Active Location Info */}
                    <div className="shrink-0 bg-teal-50 border border-teal-100 rounded-2xl p-4 flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                        <div>
                            {mapLoading ? (
                                <>
                                    <p className="text-sm font-bold text-teal-900 flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin" /> Acquiring Location...
                                    </p>
                                    <p className="text-xs font-medium text-teal-700">Using GPS sensor</p>
                                </>
                            ) : locationError ? (
                                <>
                                    <p className="text-sm font-bold text-amber-800">{locationError}</p>
                                    <p className="text-xs font-medium text-teal-700">Showing default region</p>
                                </>
                            ) : (
                                <>
                                    <p className="text-sm font-bold text-teal-900">Location Detected</p>
                                    <p className="text-xs font-medium text-teal-700">
                                        {userLocation?.[0].toFixed(4)}°N, {userLocation?.[1].toFixed(4)}°E • {stations.length} stations found
                                    </p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Station List */}
                    <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide pb-4">
                        {mapLoading ? (
                            <ListSkeleton />
                        ) : filteredStations.length === 0 ? (
                            <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center">
                                <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                                <p className="text-slate-600 font-bold">No stations found</p>
                                <p className="text-slate-400 text-sm font-medium mt-1">Try expanding your search area</p>
                            </div>
                        ) : (
                            filteredStations.map((station) => {
                                const distance = userLocation
                                    ? getDistance(userLocation[0], userLocation[1], station.lat, station.lng).toFixed(1)
                                    : '—';
                                const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lng}`;

                                return (
                                    <div
                                        key={station.id}
                                        className={`bg-white border shadow-sm rounded-2xl p-5 hover:border-teal-300 hover:shadow-md transition-all group cursor-pointer ${selectedStation === station.id ? 'border-teal-400 ring-2 ring-teal-100' : 'border-slate-200'}`}
                                        onClick={() => {
                                            setSelectedStation(station.id);
                                            setFlyTarget([station.lat, station.lng]);
                                        }}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-slate-800 text-lg group-hover:text-teal-700 transition-colors">{station.name}</h3>
                                            <span className="bg-slate-100 text-slate-500 text-[10px] uppercase font-bold px-2 py-1 rounded-md tracking-wider shrink-0 ml-2">
                                                {station.type}
                                            </span>
                                        </div>

                                        <p className="text-teal-600 font-bold text-sm mb-3 flex items-center gap-1.5">
                                            <MapPin className="w-4 h-4" /> {distance} km away
                                        </p>

                                        <div className="flex items-center gap-2 mb-4 text-slate-600 font-medium text-sm">
                                            <Phone className="w-4 h-4" /> {station.phone || station.address}
                                        </div>

                                        <a
                                            href={directionsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="w-full py-2.5 rounded-xl border-2 border-slate-100 text-slate-600 font-bold hover:bg-teal-50 hover:border-teal-100 hover:text-teal-700 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Navigation className="w-4 h-4" /> Get Directions
                                        </a>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Right Pane - Map Container (70%) */}
                <div className="w-full lg:w-2/3 bg-white border border-slate-200 shadow-sm rounded-3xl overflow-hidden relative flex flex-col min-h-[400px]">
                    {mapLoading ? (
                        /* Loading Spinner Overlay */
                        <div className="absolute inset-0 bg-slate-50 z-10 flex flex-col items-center justify-center gap-4">
                            <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin" />
                            <p className="text-slate-600 font-bold text-sm">Initializing Live Map...</p>
                        </div>
                    ) : (
                        /* Leaflet Map */
                        <MapContainer
                            center={userLocation || DEFAULT_CENTER}
                            zoom={13}
                            style={{ width: '100%', height: '100%', minHeight: '400px' }}
                            zoomControl={true}
                            className="z-0"
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            {/* Fly to selected station */}
                            {flyTarget && <FlyToLocation center={flyTarget} zoom={16} />}

                            {/* User Location Marker (Teal) */}
                            {userLocation && (
                                <Marker position={userLocation} icon={userIcon}>
                                    <Popup>
                                        <div className="text-center">
                                            <p className="font-bold text-slate-800">Your Location</p>
                                            <p className="text-xs text-slate-500">{userLocation[0].toFixed(4)}°N, {userLocation[1].toFixed(4)}°E</p>
                                        </div>
                                    </Popup>
                                </Marker>
                            )}

                            {/* Police Station Markers (Red) */}
                            {stations.map((station) => (
                                <Marker key={station.id} position={[station.lat, station.lng]} icon={stationIcon}>
                                    <Popup>
                                        <div className="min-w-[180px]">
                                            <p className="font-bold text-slate-800 text-sm mb-1">{station.name}</p>
                                            <p className="text-xs text-slate-500 mb-2">{station.address}</p>
                                            {station.phone && <p className="text-xs text-teal-600 font-medium">{station.phone}</p>}
                                            <a
                                                href={`https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lng}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-blue-600 underline font-medium mt-1 block"
                                            >
                                                Get Directions →
                                            </a>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    )}
                </div>

            </div>
        </div>
    );
}
