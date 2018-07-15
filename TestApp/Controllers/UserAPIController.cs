using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using TestApp.DBContext;
using FullStackApp.DBContext;

namespace TestApp.Controllers
{
    public class UserAPIController : BaseAPIController
    {
        // GET: api/UserAPI
        public HttpResponseMessage GetUsers()
        {
            return ToJson(db.Users.AsEnumerable());
        }

        // GET: api/UserAPI/5
        //[ResponseType(typeof(User))]
        //public IHttpActionResult GetUser(int id)
        //{
        //    User user = db.Users.Find(id);
        //    if (user == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(user);
        //}

        // PUT: api/UserAPI/5
        public HttpResponseMessage PutUser(int id, User user)
        {
            db.Entry(user).State = EntityState.Modified;
            return ToJson(db.SaveChanges());
        }

        // POST: api/UserAPI
        [HttpPost]
        public HttpResponseMessage PostUser(User user)
        {
            db.Users.Add(user);
            return ToJson(db.SaveChanges());
        }

        // DELETE: api/UserAPI/5
        [ResponseType(typeof(User))]
        public HttpResponseMessage DeleteUser(int id)
        {
            User user = db.Users.Find(id);
            db.Users.Remove(user);
            return ToJson(db.SaveChanges());
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(int id)
        {
            return db.Users.Count(e => e.Id == id) > 0;
        }
    }
}