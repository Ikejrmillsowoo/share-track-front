const API_URL = `http://localhost:8080`;
/**
 * Adds an item to the cart.
 * @param {Object} item - The item object containing details like id, type, etc.
 */
export async function addToCart(item) {
    const user = localStorage.getItem('currentUser');
    if (!user) {
        alert('Please log in to add items to the cart.');
        return;
    }
    const userObj = JSON.parse(user);
    console.log(`Adding ${item.type} to the cart for user: ${JSON.parse(user).firstName}`);
    
    try {
        const response = await fetch(`${API_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userObj.token}` // Assuming the user object contains a token
            },
            body: JSON.stringify({
                userId: userObj.id, // Assuming the user object contains an id
                itemId: item.id,    // Assuming the item object contains an id
                quantity: 1         // You can customize the quantity as needed
            })
        });

        if (response.ok) {
            const result = await response.json();
            console.log("Item added to cart successfully:", result);
            alert(`${item.type} has been added to your cart.`);
        } else {
            const errorText = await response.text();
            console.error("Failed to add item to cart:", errorText);
            alert(`Failed to add ${item.type} to your cart. Please try again.`);
        }
    } catch (error) {
        console.error("Error adding item to cart:", error);
        alert(`An error occurred while adding ${item.type} to your cart.`);
    }

}