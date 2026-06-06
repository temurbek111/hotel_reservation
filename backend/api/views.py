import random
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Listing, Booking
from .serializers import ListingSerializer, BookingSerializer

class ListingViewSet(viewsets.ModelViewSet):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer

    def get_queryset(self):
        queryset = Listing.objects.all()
        category = self.request.query_params.get('category', None)
        location = self.request.query_params.get('location', None)
        guests = self.request.query_params.get('guests', None)

        if category:
            queryset = queryset.filter(category=category)
        if location:
            queryset = queryset.filter(location__icontains=location)
        if guests:
            try:
                guests_int = int(guests)
                queryset = queryset.filter(maxGuests__gte=guests_int)
            except ValueError:
                pass

        return queryset

    def create(self, request, *args, **kwargs):
        # Generate custom string ID if not provided, to keep it consistent with mock data (e.g., lst-009)
        data = request.data.copy()
        if 'id' not in data or not data['id']:
            random_id = f"lst-{random.randint(100, 999)}"
            while Listing.objects.filter(id=random_id).exists():
                random_id = f"lst-{random.randint(100, 999)}"
            data['id'] = random_id

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all().order_by('-created_at')
    serializer_class = BookingSerializer
