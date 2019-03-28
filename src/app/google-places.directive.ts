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
    location_obj['location'] = place.formatted_address;
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
