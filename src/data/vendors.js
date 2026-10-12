const vendors = [
 {
 id: 'kerabu-shack',
 name: 'Kerabu Shack',
 location: 'Mahallah Uthman, Block B',
 openHours: '9:00 am - 10:00 pm',
 isOpen: true,
 menu: [
 { id: 'ks-1', name: 'Nasi Kerabu Ayam', description: 'Blue rice, salad and coconut flakes with fried chicken', price: 6.5, category: 'Rice', available: true },
 { id: 'ks-2', name: 'Nasi Kerabu Lemak Bakar', description: 'Blue rice, salad and coconut flakes with grilled beef fat', price: 8, category: 'Rice', available: true },
 { id: 'ks-3', name: 'Teh Beng', description: 'Black tea mixed with condensed milk on ice', price: 2.5, category: 'Drinks', available: false },],
 },
 {
 id: 'kafe-aminah',
 name: 'Kafe Mahallah Aminah',
 location: 'Mahallah Aminah, Ground Floor',
 openHours: '8:00 am - 9:00 pm',
 isOpen: true,
 menu: [
 { id: 'ami-1', name: 'Nasi Ayam Penyet', description: 'Smashed fried chicken with sambal and rice', price: 9, category: 'Rice', available: true },
 { id: 'ami-2', name: 'Air Bandung', description: 'Rose syrup with milk', price:
3, category: 'Drinks', available: true },
 ],
 },
]
export default vendors
