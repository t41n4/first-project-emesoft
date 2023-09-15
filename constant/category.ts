export async function fetchCategories() {
    try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        if (!response.ok) {
            throw new Error('Lỗi khi tải dữ liệu từ API.');
        }
        
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error('Lỗi:', error);
        throw error; // Bạn có thể xử lý lỗi ở đây hoặc ném nó ra ngoài để xử lý sau.
    }
}