from django.core.management.base import BaseCommand
from api.models import Listing

class Command(BaseCommand):
    help = 'Seeds initial listings into the database'

    def handle(self, *args, **options):
        listings_data = [
            {
                "id": "lst-001",
                "title": "A-Frame Cabin with Hot Tub in the Woods",
                "type": "Entire cabin",
                "category": "cabins",
                "rating": 4.96,
                "reviews": 142,
                "price": 245.00,
                "location": "Aspen, Colorado",
                "description": "Escape to this beautiful, architect-designed A-frame cabin nestled deep in the Aspen forest. Features a private outdoor hot tub, wrap-around deck, wood-burning fireplace, and stunning floor-to-ceiling windows showing panoramic mountain views. Perfect for a cozy winter retreat or a quiet summer hike.",
                "images": [
                    "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1475855581690-80accde3ae2b?auto=format&fit=crop&w=800&q=80"
                ],
                "amenities": ["Wi-Fi", "Hot tub", "Fireplace", "Kitchen", "Free parking", "Pet friendly", "Air conditioning"],
                "host": {
                    "name": "Sarah Miller",
                    "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
                    "joined": "June 2018",
                    "isSuperhost": True
                },
                "maxGuests": 4,
                "bedrooms": 2,
                "beds": 3,
                "bathrooms": 1.5
            },
            {
                "id": "lst-002",
                "title": "Ultra-Modern Oceanfront Mansion",
                "type": "Entire home",
                "category": "mansions",
                "rating": 4.89,
                "reviews": 64,
                "price": 890.00,
                "location": "Malibu, California",
                "description": "Experience absolute luxury in this stunning clifftop estate overlooking the Pacific Ocean. Features an infinity pool, private beach access, chef's kitchen, state-of-the-art cinema room, and a massive outdoor lounge. Sleek glass walls slide open fully to merge indoor and outdoor living into one breathtaking experience.",
                "images": [
                    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80"
                ],
                "amenities": ["Wi-Fi", "Pool", "Ocean view", "Kitchen", "Gym", "Air conditioning", "EV charger", "Hot tub"],
                "host": {
                    "name": "Alexander Reed",
                    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
                    "joined": "March 2021",
                    "isSuperhost": True
                },
                "maxGuests": 8,
                "bedrooms": 4,
                "beds": 5,
                "bathrooms": 4.5
            },
            {
                "id": "lst-003",
                "title": "Secluded Jungle Canopy Treehouse",
                "type": "Entire treehouse",
                "category": "treehouses",
                "rating": 4.98,
                "reviews": 322,
                "price": 180.00,
                "location": "Pahoa, Hawaii",
                "description": "Perched 15 feet off the ground in the canopy of a beautiful Hawaiian jungle, this eco-friendly treehouse offers an unparalleled connection with nature. Features a suspension bridge, natural spring water shower, and a 360-degree viewing lanai. Wake up to birdsong and fall asleep to the gentle sounds of frogs and rain.",
                "images": [
                    "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=800&q=80"
                ],
                "amenities": ["Wi-Fi", "Mountain view", "Free parking", "Eco shower", "Hammock", "Kitchenette"],
                "host": {
                    "name": "Kai Aloha",
                    "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
                    "joined": "September 2015",
                    "isSuperhost": True
                },
                "maxGuests": 2,
                "bedrooms": 1,
                "beds": 1,
                "bathrooms": 1.0
            },
            {
                "id": "lst-004",
                "title": "Chic Beachfront Villa with Private Pool",
                "type": "Entire villa",
                "category": "beachfront",
                "rating": 4.91,
                "reviews": 95,
                "price": 380.00,
                "location": "Santorini, Greece",
                "description": "Wake up to endless vistas of the Aegean Sea from this traditional whitewashed Greek villa. Fully modernized with a sparkling plunge pool, stone-paved sun patio, and built-in outdoor dining setup. Stroll down the private steps directly onto the black sand beach and enjoy the iconic Santorini sunsets right from your bed.",
                "images": [
                    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80"
                ],
                "amenities": ["Wi-Fi", "Pool", "Ocean view", "Kitchen", "Air conditioning", "Patio", "Breakfast included"],
                "host": {
                    "name": "Elena Pappas",
                    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
                    "joined": "January 2019",
                    "isSuperhost": False
                },
                "maxGuests": 6,
                "bedrooms": 3,
                "beds": 4,
                "bathrooms": 3.0
            },
            {
                "id": "lst-005",
                "title": "Luxury Glass Penthouse over Central Park",
                "type": "Entire rental unit",
                "category": "trending",
                "rating": 4.88,
                "reviews": 110,
                "price": 495.00,
                "location": "New York, New York",
                "description": "Live high above Manhattan in this architectural masterpiece. Featuring 12-foot floor-to-ceiling glass windows offering unobstructed views of Central Park and the city skyline. Tastefully curated with high-end designer furniture, custom lighting, automated blinds, and a marble bath oasis. Just steps away from the city's finest restaurants.",
                "images": [
                    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"
                ],
                "amenities": ["Wi-Fi", "City skyline view", "Kitchen", "Gym", "Elevator", "Air conditioning", "Dedicated workspace"],
                "host": {
                    "name": "Marcus Sterling",
                    "avatar": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80",
                    "joined": "October 2017",
                    "isSuperhost": True
                },
                "maxGuests": 2,
                "bedrooms": 1,
                "beds": 1,
                "bathrooms": 1.5
            },
            {
                "id": "lst-006",
                "title": "Iconic Geodesic Dome with Skylight",
                "type": "Entire dome",
                "category": "trending",
                "rating": 4.97,
                "reviews": 215,
                "price": 210.00,
                "location": "Joshua Tree, California",
                "description": "Star-gaze directly from your king-sized bed in this unique geodesic dome house located in the Mojave desert. Features a minimalist bohemian interior, outdoor hammock circle, firepit, and vintage record player. Solar-powered and eco-friendly, offering an unmatched desert getaway experience under the milky way.",
                "images": [
                    "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80"
                ],
                "amenities": ["Wi-Fi", "Firepit", "Free parking", "Air conditioning", "Stargazing skylight", "Espresso machine"],
                "host": {
                    "name": "Dax & Luna",
                    "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
                    "joined": "November 2020",
                    "isSuperhost": True
                },
                "maxGuests": 3,
                "bedrooms": 1,
                "beds": 2,
                "bathrooms": 1.0
            },
            {
                "id": "lst-007",
                "title": "18th-Century Restored Italian Castle Suite",
                "type": "Private room in castle",
                "category": "luxe",
                "rating": 4.95,
                "reviews": 47,
                "price": 620.00,
                "location": "Tuscany, Italy",
                "description": "Immerse yourself in history inside this meticulously restored Tuscan castle. Sleep under hand-painted frescoes, dine in the original stone cellars, and explore vineyards surrounding the estate. Includes a private tour of the wine cellars and a complimentary multi-course Italian dinner prepared by our private chef on your arrival night.",
                "images": [
                    "https://images.unsplash.com/photo-1546412414-e1885261b951?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
                ],
                "amenities": ["Wi-Fi", "Pool", "Vineyard views", "Breakfast included", "Chef dinner", "Free parking", "Wine cellar"],
                "host": {
                    "name": "Countess Beatrice",
                    "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
                    "joined": "April 2012",
                    "isSuperhost": False
                },
                "maxGuests": 2,
                "bedrooms": 1,
                "beds": 1,
                "bathrooms": 1.0
            },
            {
                "id": "lst-008",
                "title": "Glass Treehouse with suspended net deck",
                "type": "Entire treehouse",
                "category": "treehouses",
                "rating": 4.93,
                "reviews": 89,
                "price": 230.00,
                "location": "Portland, Oregon",
                "description": "Live among the Douglas firs in this stunning modern glass treehouse. Float above the forest floor on the heavy-duty suspended cargo net lounge, enjoy custom dimmable warm ambient lighting, and stream your favorite music through the high-end Sonos sound system. An ideal forest immersion retreat.",
                "images": [
                    "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"
                ],
                "amenities": ["Wi-Fi", "Sonos sound", "Hammock net", "Kitchenette", "Dedicated workspace", "Free parking"],
                "host": {
                    "name": "Oliver Thorne",
                    "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
                    "joined": "July 2022",
                    "isSuperhost": True
                },
                "maxGuests": 2,
                "bedrooms": 1,
                "beds": 1,
                "bathrooms": 1.0
            }
        ]

        created_count = 0
        for data in listings_data:
            obj, created = Listing.objects.get_or_create(
                id=data["id"],
                defaults=data
            )
            if created:
                created_count += 1

        self.stdout.write(self.style.SUCCESS(f"Successfully seeded database with {created_count} listings."))
