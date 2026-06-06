from django.db import models

class Listing(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    title = models.CharField(max_length=255)
    type = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    rating = models.FloatField(default=0.0)
    reviews = models.IntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    location = models.CharField(max_length=255)
    description = models.TextField()
    images = models.JSONField(default=list)  # List of image URLs
    amenities = models.JSONField(default=list)  # List of strings
    host = models.JSONField(default=dict)  # Schema: {name, avatar, joined, isSuperhost}
    maxGuests = models.IntegerField(default=2)
    bedrooms = models.IntegerField(default=1)
    beds = models.IntegerField(default=1)
    bathrooms = models.FloatField(default=1.0)

    def __str__(self):
        return f"{self.title} ({self.location})"

class Booking(models.Model):
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name='bookings')
    check_in = models.DateField()
    check_out = models.DateField()
    guests_count = models.IntegerField(default=1)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    guest_name = models.CharField(max_length=100, default="Guest")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Booking for {self.listing.title} by {self.guest_name} ({self.check_in} to {self.check_out})"
