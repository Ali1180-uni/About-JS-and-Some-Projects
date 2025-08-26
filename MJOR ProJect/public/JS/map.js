    const lat = 31.4273;
    const lng = 73.1166;

    const map = L.map('map').setView([lat, lng], 13);

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add marker
    L.marker([lat, lng]).addTo(map)
        .bindPopup('<b>My Location</b><br>31.4273, 73.1166')
        .openPopup();