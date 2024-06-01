namespace RestaurantManagementAPI.Models
{
    public class OrderDetail
    {
        public int OrderDetailID { get; set; }
        public int OrderID { get; set; }
        public Order Order { get; set; }
        public int DishID { get; set; }
        public Dish Dish { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
    }
}
