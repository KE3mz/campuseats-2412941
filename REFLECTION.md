# Week 1 reflection

Answer each question in 1–3 sentences, in your own words.

1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?
    Building a UI imperatively tells the host how to change the UI, while declarative tells the host what the final UI should look like based on the refernce we provide

2. Why must a component name start with a capital letter?
    React sees that a capital letter signifies a custom component rather than another normal line of code

3. What does a fragment <>...</> do, and why not just use a <div>?
    Fragments group elements together withoud adding extra nodes which prevents unnecessary wrapper elements from breaking CSS layouts

4. Name one benefit of splitting the UI into small components.
    It allows for code reusability


# Week 6 Reflection

1. Explain, step by step, what happens from the moment you click Place order until the new order appears on your Orders page. Name the functions in your own code that run, and say why you never call setOrders yourself

    When I click PlaceOrder, the CheckoutForm validates my inputs and calls handlePlaceOrder in CartPage.jsx. The handler then awaits placeOrders in services/orders.js, which groups the cart items by vendorId and uses writeBatch(db) to write a new document per vendor into the to-level orders collection with its status and creation time. Once it resolves, cartPage calls clearCart() and navigates to /orders. OrdersPage runs useMyOrders() which opens a onSnapshot listener via suscribeToMyOrders function filtered with studentsUid = uid. Because onSnapshot is currently subscribed to the query, Firestore pushes the newly created order document straight into the snapshot callback, which invokes onData(orders). I don't need call setOrders manually after placing, updating, or cancelling an order because Firestore acts as the single source of truth and updates the React state automatically whenever the database changes.


2. Why is orders a top-level collection, and why does each order copy vendorName and each item’s name and price instead of storing only IDs?

    Making orders a top-level collection instead of nesting it under users or vendors makes querying straightforward in both directions: a student can fetch all of their orders across every shop with a single where query (studentUid=uid), and a vendor view can query its incoming orders with their own where query (vendorId=id) without needing collection-group queries. Inside each order document, vendorName and each item's name and price are copied at checkout rather than stored only as IDs for two reasons. First, displaying OrdersPage would  require more Firestore reads to look up vendor and menu documents for every order. Second, copying those values preserves a the corresponding order receipt. For example, if Kerabu Shack later renames a dish, updates a price, or removes an item from its menu, past orders still display the exact item names and prices paid when the order was placed.


3. Your personal feature: which Firestore path and fields hold its data, and which line of your code reads it? Paste that line

    My personal feature stores each item's category inside the menu subcollection under each vendor document at the Firestore path vendors/{vendorId}/menu/{itemId}, specifically in the string field category (alongside name, description, price, and available). When a user selects a specific category on Kerabu Shack's menu page, VendorPage passes activeCategory into useVendor(id, activeCategory), which calls subscribeToMenu in src/services/vendors.js to run a filtered Firestore onSnapshot query with where('category', '==', category) (dropping the where clause when "All" is selected):

    const q =
        typeof category === 'string' && category !== 'All'
            ? query(menuRef, where('category', '==', category))
            : menuRef