using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using TestApp.DBContext;

namespace FullStackApp.DBContext
{
    public class UserContext : DbContext
    {
        public UserContext() :
            base("DefaultConnection")
        { }

        public DbSet<User> Users { get; set; }

        public DbSet<Forum> Forums { get; set; }
    }
}