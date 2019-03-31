import { Directive, ElementRef, OnInit, Output, EventEmitter, NgZone } from '@angular/core';

declare var google: any;
var geocoder;

@Directive({
  selector: '[google-place]'
})
export class GooglePlacesDirective implements OnInit {
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  private element: HTMLInputElement;

  constructor(elRef: ElementRef, private zone: NgZone) {
    //elRef will get a reference to the element where
    //the directive is placed
    this.element = elRef.nativeElement;
  }

  getFormattedAddress(place) {
    //@params: place - Google Autocomplete place object
    //@returns: location_obj - An address object in human readable format
    let location_obj = {};
    location_obj['city'] = place.address_components[0]['long_name'];
    if (place.address_components[2] == undefined) {
      location_obj['country'] = place.address_components[1]['long_name'];
    } else {
      location_obj['country'] = place.address_components[2]['long_name'];
    }

    return location_obj;
  }

  ngOnInit() {
    const autocomplete = new google.maps.places.Autocomplete(this.element);
    //Event listener to monitor place changes in the input
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      //Emit the new address object for the updated place
      this.onSelect.emit(this.getFormattedAddress(autocomplete.getPlace()));
    });
  }
}
