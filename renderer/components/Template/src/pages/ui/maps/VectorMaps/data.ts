export const worldMapOpts = {
  map: 'world',
  zoomOnScroll: false,
  zoomButtons: true,
  markersSelectable: true,
  markers: [
    { name: "Greenland", coords: [72, -42] },
    { name: "Canada", coords: [56.1304, -106.3468] },
    { name: "Brazil", coords: [-14.2350, -51.9253] },
    { name: "Egypt", coords: [26.8206, 30.8025] },
    { name: "Russia", coords: [61, 105] },
    { name: "China", coords: [35.8617, 104.1954] },
    { name: "United States", coords: [37.0902, -95.7129] },
    { name: "Norway", coords: [60.472024, 8.468946] },
    { name: "Ukraine", coords: [48.379433, 31.16558] },
  ],
  markerStyle: {
    initial: { fill: "#3073F1" },
    selected: { fill: "#3073f16e" }
  },
  labels: {
    markers: {
      render: (marker: any) => marker.name
    }
  }
}

export const canadaMapOpts = {
  map: 'canada',
  zoomOnScroll: false,
  regionStyle: {
    initial: {
      fill: '#3073F1'
    }
  }
}

export const russiaMapOpts = {
  map: 'russia',
  zoomOnScroll: false,
  regionStyle: {
    initial: {
      fill: '#5d7186'
    }
  }
}

export const italyMapOpts = {
  map: 'italy',
  zoomOnScroll: false,
  regionStyle: {
    initial: {
      fill: '#37a593'
    }
  }
}

export const iraqMapOpts = {
  map: 'iraq',
  zoomOnScroll: false,
  regionStyle: {
    initial: {
      fill: '#20c8e9'
    }
  }
}

export const spainMapOpts = {
  map: 'spain',
  zoomOnScroll: false,
  regionStyle: {
    initial: {
      fill: '#ffe381'
    }
  }
}