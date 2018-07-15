using TestApp.DBContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace TestApp.Controllers
{
    public class AuthAPIController : BaseAPIController
    {
        [HttpPost]
        [ResponseType(typeof(User))]
        public HttpResponseMessage AuthenticateUser(User user)
        {
            int result = db.Users
                .Count(u =>
                    u.UserName == user.UserName &&
                    u.Password == user.Password);
            return ToJson(result);
        }
    }
}
