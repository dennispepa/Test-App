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
    public class ForumAPIController : BaseAPIController
    {
        // GET: api/ForumAPI
        public HttpResponseMessage GetForums()
        {
            return ToJson(db.Forums.AsEnumerable());
        }

        // GET: api/ForumAPI/5
        [ResponseType(typeof(Forum))]
        public IHttpActionResult GetForum(int id)
        {
            Forum forum = db.Forums.Find(id);
            if (forum == null)
            {
                return NotFound();
            }

            return Ok(forum);
        }

        // PUT: api/ForumAPI/5
        [ResponseType(typeof(void))]
        public HttpResponseMessage PutForum(int id, Forum forum)
        {
            db.Entry(forum).State = EntityState.Modified;
            return ToJson(db.SaveChanges());
        }

        // POST: api/ForumAPI
        [ResponseType(typeof(Forum))]
        public HttpResponseMessage PostForum(Forum forum)
        {
            db.Forums.Add(forum);
            return ToJson(db.SaveChanges());
        }

        // DELETE: api/ForumAPI/5
        [ResponseType(typeof(Forum))]
        public HttpResponseMessage DeleteForum(int id)
        {
            Forum forum = db.Forums.Find(id);
            db.Forums.Remove(forum);
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

        private bool ForumExists(int id)
        {
            return db.Forums.Count(e => e.Id == id) > 0;
        }
    }
}