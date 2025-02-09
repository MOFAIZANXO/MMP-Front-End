let initialProperties = {
    rented: [
        {
            name: 'Bahria Departments',
            ownerName: 'Abdullah',
            ownerPhone: '03001234567',
            CNIC: '12345-6789012-3',
            status: 'Rented',
            rent: 60000,
            address: 'Islamabad, Main Bulliward Bahria Town Block A',
            roomDetail: {
                bedrooms: 3,
                bathrooms: 2,
                kitchens: 1,
            },
            included: ['water supply'],
            excluded: ['electricity bill', 'gas bill'],
            propertyNeighborhood: 'This cabin comes with Smart Home System...',
            images: [
                'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg',
                'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg',
            ],
        },
        {
            name: 'Rayan Resort',
            ownerName: 'Rayan',
            ownerPhone: '03009876543',
            CNIC: '32109-8765432-1',
            status: 'Rented',
            rent: 90000,
            address: 'Islamabad, Near Faisal Mosque',
            roomDetail: {
                bedrooms: 4,
                bathrooms: 3,
                kitchens: 1,
            },
            included: null,
            excluded: ['electricity bill', 'gas bill', 'water supply'],
            propertyNeighborhood: 'A serene environment with breathtaking lake views.',
            images: [
                'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg',
                'https://images.pexels.com/photos/209315/pexels-photo-209315.jpeg',
            ],
        },
        {
            name: 'Rayan Resort',
            ownerName: 'Rayan',
            ownerPhone: '03009876543',
            CNIC: '32109-8765432-1',
            status: 'Rented',
            rent: 90000,
            address: 'Islamabad, Near Faisal Mosque',
            roomDetail: {
                bedrooms: 4,
                bathrooms: 3,
                kitchens: 1,
            },
            included: null,
            excluded: ['electricity bill', 'gas bill', 'water supply'],
            propertyNeighborhood: 'A serene environment with breathtaking lake views.',
            images: [
                'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg',
                'https://images.pexels.com/photos/209315/pexels-photo-209315.jpeg',
            ],
        },
    ],
    pending: [
        {
            name: 'Kashmir Lodges',
            ownerName: 'Faizan',
            ownerPhone: '03001122334',
            CNIC: '45678-9012345-6',
            status: 'Pending',
            rent: 50000,
            address: 'Islamabad, Main Bulliward Bahria Town Block A',
            roomDetail: {
                bedrooms: 2,
                bathrooms: 2,
                kitchens: 1,
            },
            included: ['electricity bill'],
            excluded: ['gas bill', 'water supply'],
            propertyNeighborhood: 'Perfect for a relaxing getaway.',
            images: [
                'https://images.pexels.com/photos/1105754/pexels-photo-1105754.jpeg',
                'https://images.pexels.com/photos/209315/pexels-photo-209315.jpeg',
            ],
        },
        {
            name: 'Kashmir Lodges',
            ownerName: 'Faizan',
            ownerPhone: '03001122334',
            CNIC: '45678-9012345-6',
            status: 'Pending',
            rent: 50000,
            address: 'Islamabad, Main Bulliward Bahria Town Block A',
            roomDetail: {
                bedrooms: 2,
                bathrooms: 2,
                kitchens: 1,
            },
            included: ['electricity bill'],
            excluded: ['gas bill', 'water supply'],
            propertyNeighborhood: 'Perfect for a relaxing getaway.',
            images: [
                'https://images.pexels.com/photos/1105754/pexels-photo-1105754.jpeg',
                'https://images.pexels.com/photos/209315/pexels-photo-209315.jpeg',
            ],
        },
        {
            name: 'Kashmir Lodges',
            ownerName: 'Faizan',
            ownerPhone: '03001122334',
            CNIC: '45678-9012345-6',
            status: 'Pending',
            rent: 50000,
            address: 'Islamabad, Main Bulliward Bahria Town Block A',
            roomDetail: {
                bedrooms: 2,
                bathrooms: 2,
                kitchens: 1,
            },
            included: ['electricity bill'],
            excluded: ['gas bill', 'water supply'],
            propertyNeighborhood: 'Perfect for a relaxing getaway.',
            images: [
                'https://images.pexels.com/photos/1105754/pexels-photo-1105754.jpeg',
                'https://images.pexels.com/photos/209315/pexels-photo-209315.jpeg',
            ],
        },
    ],
};

if (localStorage.getItem('properties')) {
    initialProperties = JSON.parse(localStorage.getItem('properties'));
}

let properties = { ...initialProperties };

export const addProperty = (property) => {
    properties.pending.push(property);
    localStorage.setItem('properties', JSON.stringify(properties));
};

export const getProperties = () => {
    return properties;
};

export default properties;