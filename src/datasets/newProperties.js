const properties = [
  {
    propertyImages: ["https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=200"],
    propertyTitle: "Bahria Departments",
    propertyLocation: "Lahore, Main Boulevard Bahria Town, Block A",
    propertyOwner: "Muhammad Faizan",
    profilePicture: "https://wallpapers.com/images/high/pink-bunny-cool-profile-picture-dc05663sotzgycnm.webp",
    propertyRating: 4.1,
    roomDetail: {
      bathroom: 4,
      bedroom: 3,
      unit: "84m²",
    },
    propertyRent: 60000,
    rentIncludeExclude: {
      included: null,
      excluded: ["electricity bill", "gas bill"],
    },
    propertyNeighborhood:
      "This cabin comes with Smart Home System and beautiful viking style. You can see sunrise in the morning with City View from full Glass Window.\n\nThis unit is surrounded by business district of West Surabaya that offers you the city life as well as wide range of culinary.\n\nThis apartment equipped with Washing Machine, Electric Stove, Microwave, Refrigerator, Cutlery.",
    reviews: [
      {
        profilePicture: "https://wallpapers.com/images/high/pink-bunny-cool-profile-picture-dc05663sotzgycnm.webp",
        username: "Dianne Russell",
        userReview:
          "Exceptional Quality! The service provided was top-notch. Everything was handled with care and precision. I couldn't be happier with the results. Will definitely use this service again",
        stars: 4,
      },
      {
        profilePicture: "https://i.pinimg.com/736x/2b/e0/1d/2be01dad0db3765405a80ed28044770f.jpg",
        username: "Pushpa Kumar Arora",
        userReview:
          "Highly Impressive! This was an outstanding experience from start to finish. The level of professional and dedication is unmatched. Truly a pleasure to work with!",
        stars: 4,
      },
    ],
  },
  
  {
    propertyImages: ["https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"],
    propertyTitle: "Lakefront Villa",
    propertyLocation: "Islamabad, Lakeview Park",
    propertyOwner: "Ayesha Khan",
    profilePicture: "https://w0.peakpx.com/wallpaper/209/892/HD-wallpaper-bear-pink.jpg", 
    propertyRating: 4.8,
    roomDetail: {
      bathroom: 5,
      bedroom: 4,
      unit: "150m²",
    },
    propertyRent: 120000,
    rentIncludeExclude: {
      included: ["water supply", "maintenance"],
      excluded: ["electricity bill"],
    },
    propertyNeighborhood:
      "Situated near Lakeview Park, this villa offers a serene environment with breathtaking lake views. The neighborhood is peaceful, perfect for families, and is close to recreational spots and restaurants.",
    reviews: [
      {
        profilePicture: "https://w0.peakpx.com/wallpaper/209/892/HD-wallpaper-bear-pink.jpg",
        username: "Ali Haider",
        userReview:
          "Absolutely loved the location and amenities. Perfect for a family retreat. Highly recommended!",
        stars: 5,
      },
      {
        profilePicture: "https://i.pinimg.com/736x/1f/e6/68/1fe66803ad7399efcadcdb99475ff3e1.jpg",
        username: "Zara Shah",
        userReview:
          "The villa was clean and spacious. The view of the lake in the morning is unmatched. Will book again!",
        stars: 4,
      },
    ],
  },

  {
    propertyImages: ["https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"],
    propertyTitle: "Modern Studio Apartment",
    propertyLocation: "Karachi, Clifton Block 5",
    propertyOwner: "Ahmed Raza",
    profilePicture: "https://i.pinimg.com/736x/34/c5/ea/34c5ea722663efcc0167dcc81f071ed6.jpg", 
    propertyRating: 4.5,
    roomDetail: {
      bathroom: 1,
      bedroom: 1,
      unit: "45m²",
    },
    propertyRent: 40000,
    rentIncludeExclude: {
      included: ["internet", "water supply"],
      excluded: ["electricity bill", "gas bill"],
    },
    propertyNeighborhood:
      "Located in the heart of Clifton, this modern studio apartment is ideal for professionals and students. Close to shopping malls, restaurants, and public transport.",
    reviews: [
      {
        profilePicture: "https://i.pinimg.com/736x/34/c5/ea/34c5ea722663efcc0167dcc81f071ed6.jpg",
        username: "Sarah Khan",
        userReview:
          "Great apartment for its price. The location is very convenient and the amenities provided were sufficient.",
        stars: 4,
      },
      {
        profilePicture: "https://i.pinimg.com/736x/de/b4/65/deb465626667abb93ebd751256d7799d.jpg",
        username: "Rehan Ali",
        userReview:
          "The studio was well-maintained and the internet speed was excellent. Perfect for remote work.",
        stars: 5,
      },
    ],
  },

  {
    propertyImages: ["https://images.pexels.com/photos/209315/pexels-photo-209315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"],
    propertyTitle: "Luxury Penthouse",
    propertyLocation: "Lahore, Gulberg Heights",
    propertyOwner: "Zain Malik",
    profilePicture: "https://i.pinimg.com/736x/95/76/4d/95764daa9f6db7e75e02094fd4893971.jpg",
    propertyRating: 4.9,
    roomDetail: {
      bathroom: 3,
      bedroom: 3,
      unit: "200m²",
    },
    propertyRent: 180000,
    rentIncludeExclude: {
      included: ["maintenance", "water supply", "parking"],
      excluded: ["electricity bill"],
    },
    propertyNeighborhood:
      "A premium penthouse in the heart of Lahore with breathtaking city views, state-of-the-art facilities, and proximity to business hubs and shopping districts.",
    reviews: [
      {
        profilePicture: "https://i.pinimg.com/736x/95/76/4d/95764daa9f6db7e75e02094fd4893971.jpg",
        username: "Maria Ahmed",
        userReview:
          "Absolutely stunning penthouse! The amenities and views were worth every penny. Highly recommend for luxury seekers.",
        stars: 5,
      },
      {
        profilePicture: "https://i.pinimg.com/736x/7b/76/05/7b7605b5509dc04e9df30ba5a3430b00.jpg",
        username: "Hamza Tariq",
        userReview:
          "The best property I have ever rented. Spacious, modern, and located in a prime area.",
        stars: 5,
      },
    ],
  },

  {
    propertyImages: ["https://images.pexels.com/photos/1105754/pexels-photo-1105754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/1105754/pexels-photo-1105754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/1105754/pexels-photo-1105754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2","https://images.pexels.com/photos/1105754/pexels-photo-1105754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/1105754/pexels-photo-1105754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/1105754/pexels-photo-1105754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/1105754/pexels-photo-1105754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"],
    propertyTitle: "Cozy Cottage",
    propertyLocation: "Murree, Kashmir Point",
    propertyOwner: "Rashid Mehmood",
    profilePicture: "https://i.pinimg.com/736x/b5/45/da/b545daddb8ce008aa0979072d77c9cdd.jpg",
    propertyRating: 4.2,
    roomDetail: {
      bathroom: 2,
      bedroom: 2,
      unit: "120m²",
    },
    propertyRent: 50000,
    rentIncludeExclude: {
      included: ["firewood", "water supply"],
      excluded: ["electricity bill", "internet"],
    },
    propertyNeighborhood:
      "This cozy cottage in Murree is perfect for a relaxing getaway. Surrounded by lush greenery and fresh mountain air, it offers the perfect escape from the city.",
    reviews: [
      {
        profilePicture: "https://i.pinimg.com/736x/b5/45/da/b545daddb8ce008aa0979072d77c9cdd.jpg",
        username: "Imran Khan",
        userReview:
          "Loved the peaceful ambiance and the proximity to nature. Ideal for a weekend retreat.",
        stars: 4,
      },
      {
        profilePicture: "https://i.pinimg.com/736x/59/89/c1/5989c1229d544bfc87263fbbdd61a2fd.jpg",
        username: "Sara Malik",
        userReview:
          "The cottage was well-kept and the fireplace added a warm touch. Perfect for a family trip.",
        stars: 4,
      },
    ],
  },
];

export default properties;