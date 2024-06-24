namespace RestaurantManagementAPI.Models
{
    public class Order
    {
        public int OrderID { get; set; }
        public int AccountID { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
    }
}
