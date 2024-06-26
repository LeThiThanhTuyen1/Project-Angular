using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RestaurantManagementAPI.Models;

namespace RestaurantManagementAPI.Data
{
    public class RestaurantManagementAPIContext : DbContext
    {
        public RestaurantManagementAPIContext (DbContextOptions<RestaurantManagementAPIContext> options)
            : base(options)
        {
        }

        public DbSet<RestaurantManagementAPI.Models.Cart> Cart { get; set; } = default!;
    }
}
