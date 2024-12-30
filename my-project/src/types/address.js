class Address {
    constructor(id, type, label, street, area, details, lat, lng, isFavorite) {
        this.id = id;
        this.type = type; // 'home', 'office', or 'other'
        this.label = label || undefined;
        this.street = street;
        this.area = area;
        this.details = details;
        this.lat = lat;
        this.lng = lng;
        this.isFavorite = isFavorite;
    }
}

// Location Constructor Function
class Location {
    constructor(lat, lng) {
        this.lat = lat;
        this.lng = lng;
    }
}

// Export the Address Constructor
export { Address, Location };