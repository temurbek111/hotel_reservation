from rest_framework import serializers
from .models import Listing, Booking

class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    listing_details = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Booking
        fields = ['id', 'listing', 'check_in', 'check_out', 'guests_count', 'total_price', 'guest_name', 'created_at', 'listing_details']
        read_only_fields = ['id', 'created_at']

    def get_listing_details(self, obj):
        return {
            "id": obj.listing.id,
            "title": obj.listing.title,
            "location": obj.listing.location,
            "image": obj.listing.images[0] if obj.listing.images else None,
            "type": obj.listing.type,
            "price": obj.listing.price
        }
