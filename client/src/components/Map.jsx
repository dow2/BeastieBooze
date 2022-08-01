import React, { useState, useMemo, useCallback, useRef } from 'react';
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
  InfoWindow,
} from '@react-google-maps/api';
// import Places from './places.jsx';
// import Distance from './distance.jsx';

// const LatLngLiteral = new google.maps.LatLngLiteral;
// const DirectionsResult = google.maps.DirectionsResult;
// const MapOptions = google.maps.MapOptions;
// const service = new google.maps.places.PlacesService(map);


const Map = () => {
  const mapRef = useRef();
  const center = useMemo(() => ({ lat: 29.951065, lng: -90.071533 }), []);
  const options = useMemo(() => ({
    disableDefaultUI: true,
    clickableIcons: false
  }), []);
  const onLoad = useCallback(map => (mapRef.current = map), []);
  const [liquorStore, setLiquorStore] = useState(null);
  // const bars = useMemo(() => generateBars(center), [center]);

  const data = [
    {
      storeName: 'Prytania Wine & Spirits ',
      address: '1300 Arabella St, New Orleans, LA 70115',
      link: 'https://www.google.com/maps/dir//1300+Arabella+St,+New+Orleans,+LA+70115/@29.9262241,-90.1871596,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x8620a4fddef3902b:0x2cf6d03a6cb8cf34!2m2!1d-90.1169472!2d29.9260939',
      coordinates: {
        lat: 29.9260651,
        lng: -90.1169544
      },
    },
    {
      storeName: 'Vieux Carre Wine & Spirits',
      address: '422 Chartres St, New Orleans, LA 70130',
      link: 'https://www.google.com/maps/dir//422+Chartres+St,+New+Orleans,+LA+70130/@29.9554445,-90.1355283,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x8620a60df568a545:0x98bfa58c58e7e8fc!2m2!1d-90.0653159!2d29.9553144',
      coordinates: {
        lat: 29.9553593,
        lng: -90.0653627
      },
    },
    {
      storeName: 'Spirit Wine',
      address: '3500 Magazine St, New Orleans, LA 70115',
      link: 'https://www.google.com/maps/dir//3500+Magazine+St,+New+Orleans,+LA+70115/@29.9222255,-90.0951827,16z/data=!4m8!4m7!1m0!1m5!1m1!1s0x8620a4342bc67f15:0xdfce19a073dddf4a!2m2!1d-90.0907946!2d29.9222163',
      coordinates: {
        lat: 29.9221002,
        lng: -90.0907571
      },
    },
    {
      storeName: 'Elios Wine Warehouse',
      address: '6205 S Miro St, New Orleans, LA 70125',
      link: 'https://www.google.com/maps/dir//6205+S+Miro+St,+New+Orleans,+LA+70125/@29.9467161,-90.1829043,12z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x8620a50a6d638095:0x1e42d19e067cf9dc!2m2!1d-90.1126919!2d29.946586',
      coordinates: {
        lat: 29.946678,
        lng: -90.1126738
      },
    },
    {
      storeName: 'Bradys Wine Warehouse',
      address: '1029 Oretha Castle Haley Blvd C, New Orleans, LA 70113',
      link: 'https://www.google.com/maps/dir//1029+Oretha+Castle+Haley+Blvd+C,+New+Orleans,+LA+70113/@29.9450251,-90.1470984,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x8620a5d8d5b1fe73:0x98f103a3a70675f1!2m2!1d-90.076886!2d29.944895',
      coordinates: {
        lat: 29.9449298,
        lng: -90.0768357
      },
    },
    {
      storeName: 'Everything Shoppe',
      address: '444 Canal St, New Orleans, LA 70130',
      link: 'https://www.google.com/maps/dir//444+Canal+St,+New+Orleans,+LA+70130/@29.9514714,-90.071388,16z/data=!4m8!4m7!1m0!1m5!1m1!1s0x8620a60d257fcbbd:0x8052184282961089!2m2!1d-90.0669999!2d29.9514622',
      coordinates: {
        lat: 29.9515542,
        lng: -90.0671805
      },
    },
    {
      storeName: 'Grande Krewe Fine Wine and Spirits',
      address: '2305 Decatur St, New Orleans, LA 70117',
      link: 'https://www.google.com/maps/dir//2305+Decatur+St,+New+Orleans,+LA+70117/@29.9630437,-90.0591942,16z/data=!4m8!4m7!1m0!1m5!1m1!1s0x8620a622c82c7ad1:0xd3a927925e355c34!2m2!1d-90.0548061!2d29.9630345',
      coordinates: {
        lat: 29.9628764,
        lng: -90.0548387
      },
    },
    {
      storeName: 'WINOshop',
      address: '201 St Charles Ave, New Orleans, LA 70170',
      link: 'https://www.google.com/maps/dir//Place+St.+Charles,+201+St+Charles+Ave,+New+Orleans,+LA+70170/@29.9521668,-90.140546,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x8620a60b5c706b41:0xc8d8d768244c93e4!2m2!1d-90.0703336!2d29.9520367',
      coordinates: {
        lat: 29.9521265,
        lng: -90.0708795
      },
    },
    {
      storeName: 'Martin Wine Cellar New Orleans',
      address: '3827 Baronne St, New Orleans, LA 70115',
      link: 'https://www.google.com/maps/dir//3827+Baronne+St,+New+Orleans,+LA+70115/@29.9290946,-90.1010421,16z/data=!4m8!4m7!1m0!1m5!1m1!1s0x8620a5b4c191d081:0x1c934e70e24b8ef7!2m2!1d-90.096654!2d29.9290854',
      coordinates: {
        lat: 29.9291771,
        lng: -90.0965237
      },
    },
    {
      storeName: 'Second Vine Wine',
      address: '4212 Magazine St, New Orleans, LA 70115',
      link: 'https://www.google.com/maps/dir//4212+Magazine+St,+New+Orleans,+LA+70115/@29.920875,-90.1039822,16z/data=!4m8!4m7!1m0!1m5!1m1!1s0x8620a44ebe1cd02d:0x6faae563b18dd9e!2m2!1d-90.0995941!2d29.9208658',
      coordinates: {
        lat: 29.9207179,
        lng: -90.0994619
      },
    },
    {
      storeName: 'Esplanade Food Store',
      address: '1400 Esplanade Ave, New Orleans, LA 70116',
      link: 'https://www.google.com/maps/dir//1400+Esplanade+Ave,+New+Orleans,+LA+70116/@36.1168488,-115.1533057,12z',
      coordinates: {
        lat: 29.9680353,
        lng: -90.0671956
      },
    },
  ];

  return (
    <div style={{
      display: 'flex',
      height: '100vh'
    }}>
      <div className='map'>
        <GoogleMap
          zoom={12.3}
          center={center}
          mapContainerClassName='map-container'
          options={options}
          onLoad={onLoad}
        >
          {data.map((store, index) => (
            <Marker
              postition={store.coordinates}
              onMouseOver={() => setLiquorStore(store)}
              key={index}
            />
          ))}
          {liquorStore && (
            <InfoWindow
              onCloseClick={() => {
                setLiquorStore(null);
              }}
              position={liquorStore.coordinates}
            >
              <div>
                <h2>{liquorStore.storeName}</h2>
                <p>{liquorStore.address}</p>
                <a href={liquorStore.link}>Directions</a>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </div>
  )
}

export default Map;