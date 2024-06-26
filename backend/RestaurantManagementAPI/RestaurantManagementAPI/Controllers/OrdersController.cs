using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantManagementAPI.Data;
using RestaurantManagementAPI.Models;

namespace RestaurantManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {   
        private readonly RestaurantContext _context;

        public OrdersController(RestaurantContext context)
        {
            _context = context;
        }

        [HttpPost("add")]
        public IActionResult AddToOrder([FromBody] Order order)
        {
            var existingOrder = _context.Orders.FirstOrDefault(o => o.AccountID == order.AccountID && o.Status == "Pending");

            if (existingOrder == null)
            {
                // Nếu chưa có đơn hàng "Pending", tạo đơn hàng mới
                existingOrder = new Order
                {
                    AccountID = order.AccountID,
                    OrderDate = DateTime.Now,
                    TotalAmount = 0,
                    Status = "Pending",
                    OrderDetails = new List<OrderDetail>()
                };
                _context.Orders.Add(existingOrder);
            }

            // Thêm chi tiết đơn hàng
            foreach (var orderDetail in order.OrderDetails)
            {
                var dish = _context.Dishes.Find(orderDetail.DishID);
                if (dish != null)
                {
                    existingOrder.OrderDetails.Add(new OrderDetail
                    {
                        DishID = orderDetail.DishID,
                        Quantity = orderDetail.Quantity,
                        Price = dish.Price
                    });
                    existingOrder.TotalAmount += dish.Price * orderDetail.Quantity;
                }
            }

            _context.SaveChanges();

            return Ok(existingOrder);
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders.ToListAsync();
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // PUT: api/Orders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.OrderID)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Orders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrder", new { id = order.OrderID }, order);
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.OrderID == id);
        }
    }
}
