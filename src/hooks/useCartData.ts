export async function fetchCart() {
    try {
        const response = await fetch('https://fakestoreapi.com/carts');
        
        if (!response.ok) {
            throw new Error('Lỗi khi tải dữ liệu từ API.');
        }
       
        const data = await response.json();
        
        return data[0].products;
    } catch (error) {
        console.error('Lỗi:', error);
        throw error; // Bạn có thể xử lý lỗi ở đây hoặc ném nó ra ngoài để xử lý sau.
    }
}
export async function fetchProId(id:any) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        
        if (!response.ok) {
            throw new Error('Lỗi khi tải dữ liệu từ API.');
        }
       
        const data = await response.json();
        
        return data;
    } catch (error) {
        console.error('Lỗi:', error);
        throw error; // Bạn có thể xử lý lỗi ở đây hoặc ném nó ra ngoài để xử lý sau.
    }
}