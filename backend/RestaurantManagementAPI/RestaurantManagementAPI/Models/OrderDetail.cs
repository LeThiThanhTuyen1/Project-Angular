namespace RestaurantManagementAPI.Models
{
    public class OrderDetail
    {
        public int OrderDetailID { get; set; }
        public int OrderID { get; set; }
        public int DishID { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }

        public Dish Dish { get; set; } // Thông tin món ăn
    }
}
