
import { Feature, Overlay, View } from 'ol';
import { Map } from 'ol';
import * as Interaction from 'ol/interaction.js';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import KML from 'ol/format/KML.js';
import OSM from 'ol/source/OSM';

import MapboxVector from 'ol/layer/MapboxVector.js';
import {Fill, Icon, Stroke, Style, Text} from 'ol/style.js';

import { ScaleLine, defaults as defaultControls } from 'ol/control';

import { Component,OnInit } from '@angular/core';
import XYZ from 'ol/source/XYZ';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { RouteService } from './route.service';
import { RouteInfo } from './route-info.model';
import { Geometry, LineString, MultiLineString, Point } from 'ol/geom';
import { click } from 'ol/events/condition';
import { style } from '@angular/animations';
import { RotaServiceService } from '../app/rota-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  url: string = '/assets/';
  selectedRoute: string = '';

  title = 'route-portal-ui';
  map!: Map;

  searchText!: string;
  diffText!: string;
  ageText!:string;
  kml3: string ="";
  kml2: string ="";
  kml1: string ="";
  onResized(event: any) {

    this.map.updateSize();
  }

  private hiddenSource = new VectorSource();
  private hiddenLayer = new VectorLayer({
    source: this.hiddenSource,
    visible: false,
  });


  private visibleSource = new VectorSource();
  private visibleLayer = new VectorLayer({
    source: this.visibleSource,
    visible: true,
  });


  constructor(private http: HttpClient,public routeService: RouteService,private rotaService:RotaServiceService) {

  }

  ngOnInit() {

    this.http.get(this.url+"dinlenme_istasyonlari.kml", { responseType: 'text' }).subscribe(res => {
      this.kml2 = res;

      this.http.get(this.url+"turizmsondoc.kml",{ responseType: 'text' }).subscribe(res => {
        this.kml3 = res;

        this.http.get(this.url+"Tum_rota_egim_yukselti_bilgilerin_hepsi.kml",{ responseType: 'text' }).subscribe(res => {
          this.kml1 = res;

          this.initilizeMap();
        });

      });

    });





    this.rotaService.selectedCategory$.subscribe((category ) => {
      if (category  === 'Bisiklet') {
        this.cycleFilter();
      }if (category  === 'Yürüyüş'){
        this.hikingFilter()
      }if (category  === 'Tarihi'){
        this.culturelFilter()
      }if (category  === 'Park'){
        this.parkFilter()
      }if (category  === 'Yeme'){
        this.yemeFilter()
      }if (category  === 'Çeşme'){
        this.cesmeFilter()
      }if (category  === 'Kamp'){
        this.kampFilter()
      }if (category  === 'tamirat'){
        this.tamiratFilter()
      }if (category  === 'kurutma'){
        this.kurutmaFilter()
      }
    });


  }

  ngOnDestroy(): void {
    // unsubscribe for start auto df swich button
    // this.subscription.unsubscribe();

  }

  ngAfterViewInit(): void {

  }

  initilizeMap(): void {
    this.map = new Map({
      controls: defaultControls().extend([new ScaleLine()]),
      target: 'map',
      view: new View({
        center: fromLonLat([34.007725, 38.357192]),
        zoom: 9.8,
      }),
    });


    const key = '0aVXi9DwzXbLNdKtAqbH';
    const attributions =
      '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
      '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';
    const raster = new TileLayer({
      source: new XYZ({
        attributions: attributions,
        url: 'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=' + key,
        maxZoom: 20,
      }),
    });

   /* this.routeService.getRoutes().subscribe((response: RouteInfo[]) => {
      response.forEach((item) => {
        var features = new KML().readFeatures(item.kml, {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857',
        });


        this.visibleSource.addFeatures(features);
        this.hiddenSource.addFeatures(features);
      });
    });
*/




    var features1 = new KML().readFeatures(this.kml1, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857',
    });

    var features2 = new KML().readFeatures(this.kml2, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857',
    });

    var features3 = new KML().readFeatures(this.kml3, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857',
    });

    features1.forEach((feature) => {
        feature.setStyle(new Style({
          stroke: new Stroke({
            color: "#FF5733",
            width: 5,
          }),
        }));
      });




      const test = new Style({
      image: new Icon({
        src: 'https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png', // Kırmızı iğne resmi
        scale: 0.3, // İğne boyutunu özelleştirin
      }),
    });



    features2.forEach((feature) => {
        feature.setStyle(test);
    });

    features3.forEach((feature) => {
        feature.setStyle(test);
    });


  this.hiddenSource.addFeatures(features1);
  this.hiddenSource.addFeatures(features2);
  this.hiddenSource.addFeatures(features3);


  this.visibleSource.addFeatures(features1);
  this.visibleSource.addFeatures(features2);
  this.visibleSource.addFeatures(features3);


    this.map.addLayer(new TileLayer({//WGS84,UTM Zone 37,38,39
      source: new OSM(),
      maxZoom: 15,
    }))

    // this.map.addLayer(raster);
    this.map.addLayer(this.hiddenLayer);
    this.map.addLayer(
      new MapboxVector({
        styleUrl: 'mapbox://styles/mapbox/bright-v9',
        accessToken:
        'pk.eyJ1IjoiY3VjdTg4IiwiYSI6ImNsbHY0d3g3ODFhbzkza283aWVvdXZpNzIifQ.ecTi8bWygMNSWB34qZngmA',
      }),
      );
      this.map.addLayer(this.visibleLayer);
    //  this.map.addLayer(vector2);
    this.map.addInteraction(new Interaction.DragRotate({
      duration: 500,
      condition: function (mapBrowserEvent) {
        var originalEvent = mapBrowserEvent.originalEvent;
        return (originalEvent.ctrlKey);
      }
    }));



    //*Pin üzerine tıklama *//


    const selectClick = new Interaction.Select({
      condition: click,
      layers: [this.visibleLayer], // Tıklama olayını hangi katman için olacağı
    });

    // Tıklama olayını haritaya eklenmesi
    this.map.addInteraction(selectClick);

    const selectedStyle = new Style({
      image: new Icon({
        src: 'https://maps.google.com/mapfiles/kml/pushpin/red-pushpin.png', // Kırmızı iğne resmi
        scale: 0.5, // İğne boyutunu özelleştirin
      }),
    });


    // Tıklama olayını işleyen fonksiyon
    selectClick.on('select', (event) => {
      const popupContentElement = document.getElementById('popup');
      if (event.selected.length > 0) {
        const selectedFeature = event.selected[0];
        const nameFirst = selectedFeature.get('geometry') instanceof LineString ? selectedFeature.get('Rota') : selectedFeature.get('Name');
        const geo = selectedFeature.get('geometry')
        const difficulty=selectedFeature.get('R_Der');
        const age=selectedFeature.get('Yas')
        const routeCycle=selectedFeature.get('Rota_Bsklt')
        const routeWalk=selectedFeature.get('R_Yurys')

        const slope=selectedFeature.get('egim')
        const elevation=selectedFeature.get('yukselti')
        const length=selectedFeature.get('km')

        const explanation=selectedFeature.get('ackl')

        // burada bize verilen kml'de bütün bilgilerin yer aldığı popup ekranı gelir

        const imgUrl=selectedFeature.get('description')

        //* çizgilerin birleştirilmesi

        // console.log(selectedFeature.get('coordinates').getCoordinates())
        // debugger;

        // if (selectedFeature.getGeometry() instanceof LineString) {
        //   // Tüm yolun koordinatlarını alın
        //   const coordinates = selectedFeature.get('coordinates').getCoordinates();

        //   // Bu koordinatlarla yeni bir LineString özelliği oluşturun
        //   const fullRouteFeature = new Feature({
        //     geometry: new LineString(coordinates),
        //   });

        //   // Haritaya ekleyin
        //   this.map.addLayer(fullRouteFeature);
        // }


        //*Pin olursa kırmızı büyük, yol olursa maviye döner*/
        if(selectedFeature.get('geometry') instanceof Point){
          selectedFeature.setStyle(selectedStyle);
        }


        const popup = new Overlay({
          offset: [0, 10], // Popup penceresinin pinin üzerindeki pozisyonunu ayarlayın
          autoPan: true, // Harita sınırlarının dışına taşarsa, popup penceresini otomatik olarak taşı
          autoPanAnimation: {
            duration: 250, // Auto pan animasyon süresi
          },
        });


        popupContentElement!.innerHTML = `
          <div style="background-color:rgba(255, 255, 255, 0.9);border-radius: 5px; padding:5px; margin:5px;border: 1px solid grey;box-shadow: rgba(0, 0, 0, 0.85) 0px 5px 10px;">
            <p>İsim: <span>${nameFirst}</span></p>
            ${difficulty ? `<p>Zorluk Seviyesi: ${difficulty}</p>` : ''}
            <div style="max-height: 20rem; overflow-y: auto;">
              ${imgUrl ? imgUrl : ''}
            </div>
            ${routeWalk && routeCycle ? `<p>Rota Tipi: ${routeWalk}, ${routeCycle}</p>` : (routeWalk ? `<p>Rota Tipi: ${routeWalk}</p>` : (routeCycle ? `<p>Rota Tipi: ${routeCycle}</p>` : ''))}
            ${slope ? `<p>Eğim: ${slope}</p>` : ''}
            ${elevation ? `<p>Yükseklik: ${elevation} m.</p>` : ''}
            ${explanation ? `<p>Hizmetler: ${explanation}</p>` : ''}
          </div>
        `;

        this.map.addOverlay(popup);



        // Seçilen pin'in adını aldık
        console.log('Tıklanan Pin İsmi:', nameFirst);
        console.log('Tıklanan Pinin geometrisi:', geo);

      }else{
        popupContentElement!.innerHTML = `

        `;
      }

    });

    //*Pin üzerine tıklama *//
  }



  selectChanged(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log('Seçilen değer:', selectedValue);
  }

  hikingFilter(){
    const hikingStyle = new Style({
      stroke: new Stroke({
        color: 'blue', // Yol rengi
      }),
    });

    console.log('yürüyüş')
    const hikingRoute = () => {
      const features = this.hiddenSource.getFeatures().filter((item) => {
        return (
          (item.get("geometry") instanceof LineString )&&
         (item.get('R_Yurys'))
        );
      });

      features.forEach((feature) => {
        feature.setStyle(hikingStyle);
      });

      return features;
    }

    this.visibleSource.clear();

    this.visibleSource.addFeatures(hikingRoute())
  }

  cycleFilter(){
    const cycleStyle = new Style({
      stroke: new Stroke({
        color: 'blue', // Yol rengi
      }),
    });

    console.log('bisiklet')
    const cycleRoute = () => {
      const features = this.hiddenSource.getFeatures().filter((item) => {
        return (
          (item.get("geometry") instanceof LineString )&&
         (item.get('Rota_Bsklt'))
        );
      });

      features.forEach((feature) => {
        feature.setStyle(cycleStyle);
      });

      return features;
    }

    this.visibleSource.clear();

    this.visibleSource.addFeatures(cycleRoute())
  }

  culturelFilter(){

    console.log('culturel')
    const culturelRoute = () => {
      const features = this.hiddenSource.getFeatures().filter((item) => {
        return (
          (item.get("geometry") instanceof Point )&&
         (item.get('tip'))
        );
      });

      return features;
    }

    this.visibleSource.clear();

    this.visibleSource.addFeatures(culturelRoute())
  }

  parkFilter(){

    console.log('park')
    const parkRoute = () => {
      const features = this.hiddenSource.getFeatures().filter((item) => {
        return (
          (item.get("geometry") instanceof Point )&&
          (item.get('Name') && item.get('Name').includes('TİP 1')|| item.get('Name').includes('TİP 2') || item.get('Name').includes('TİP 3')|| item.get('Name').includes('TİP 4'))
        );
      });

      return features;
    }

    this.visibleSource.clear();

    this.visibleSource.addFeatures(parkRoute())
  }

  kurutmaFilter(){

    console.log('park')
    const kurutmaRoute = () => {
      const features = this.hiddenSource.getFeatures().filter((item) => {
        return (
          (item.get("geometry") instanceof Point )&&
          (item.get('Name') && item.get('Name').includes('TİP 3')|| item.get('Name').includes('TİP 4'))
        );
      });

      return features;
    }

    this.visibleSource.clear();

    this.visibleSource.addFeatures(kurutmaRoute())
  }

  cesmeFilter(){

    console.log('cesme')
    const cesmeRoute = () => {
      const features = this.hiddenSource.getFeatures().filter((item) => {
        return (
          (item.get("geometry") instanceof Point )&&
          (item.get('Name') && item.get('Name').toLowerCase().includes('çeşme') || item.get('Name').includes('TİP 3') || item.get('Name').includes('TİP 4'))
        );
      });

      return features;
    }

    this.visibleSource.clear();

    this.visibleSource.addFeatures(cesmeRoute())
  }

  yemeFilter(){

    console.log('yeme')
    const yemeRoute = () => {
      const features = this.hiddenSource.getFeatures().filter((item) => {
        return (
          (item.get("geometry") instanceof Point )&&
          (item.get('ackl') && item.get('ackl').toLowerCase().includes('yemek'))
        );
      });

      console.log(features)
      return features;
    }

    this.visibleSource.clear();

    this.visibleSource.addFeatures(yemeRoute())
  }

  kampFilter(){

    console.log('kamp')
    const kampRoute = () => {
      const features = this.hiddenSource.getFeatures().filter((item) => {
        return (
          (item.get("geometry") instanceof Point )&&
          (item.get('Name') && item.get('Name').toLowerCase().includes('kamp'))
        );
      });

      return features;
    }

    this.visibleSource.clear();

    this.visibleSource.addFeatures(kampRoute())
  }

  tamiratFilter(){

    console.log('otobüs')
    const tamiratRoute = () => {
      const features = this.hiddenSource.getFeatures().filter((item) => {
        return (
          (item.get("geometry") instanceof Point )&&
          (item.get('ackl') && item.get('ackl').includes('Dinlenme - Emanet - Duş - WC - Güvenlik - Bakım Alanları - Dolap - Mutfak - Yük Transfer Noktası'))
        );
      });

      return features;
    }

    this.visibleSource.clear();

    this.visibleSource.addFeatures(tamiratRoute())
  }

  onCategoryClicked(category: string) {
    if (category === 'Bisiklet') {
      this.cycleFilter();
    }
  }


  submitFilter() {

    const routeStyle = new Style({
      stroke: new Stroke({
        color: 'blue', // Yol rengi
        // width: 10, // Yolun kalınlığı (50 metrelik yarıçapı temsil edebilir)
      }),
    });

    const routeFilter = (name: string,diff:string,age:string) => {
      const features = this.hiddenSource.getFeatures().filter((item) => {
        return (
          (item.get("geometry") instanceof LineString )&&
          (name ? (item.get('Rota')?.toLowerCase().indexOf(name.toLowerCase()) > -1) : true )&&
         (diff ? (diff== item.get("R_Der")) : true)&&
         (age ? (age >= item.get("Yas").split("-")[0] && age <= item.get("Yas").split("-")[1]  ) : true)
        );
      });

        // Yolları daha kalın bir şekilde haritaya ekleyin
        features.forEach((feature) => {
          feature.setStyle(routeStyle);
        });

        return features;
    }


    const pinFilter = (featureList:Feature<Geometry>[]) => {

      return this.hiddenSource.getFeatures()
       .filter((item)=> {
        if (item.get("geometry") instanceof Point){
          let pinName = item.get("Rota");
          const filteredRoutes = routeFilter(this.searchText, this.diffText,this.ageText);
          const matchingRoute = filteredRoutes.find((route) => {
            // Rotanın ismini al
            const routeName = route.get("Rota");

            // Eğer pin adı, rota adının bir parçası ise, bu pinin eklenmesi gerekiyor
            return routeName.includes(pinName);
          });

          // Eşleşen bir rota bulunduysa, bu pinin eklenmesi gerekiyor
          if (matchingRoute) {
            return true;
          }
        }
        return false;
        });

    }

    this.visibleSource.clear();

    // this.visibleSource.addFeatures(selectDifficulty(this.selectChanged))

    var filtered=routeFilter(this.searchText,this.diffText,this.ageText)

    this.visibleSource.addFeatures(routeFilter(this.searchText,this.diffText,this.ageText));

    this.visibleSource.addFeatures(pinFilter(filtered));

    }
  }


